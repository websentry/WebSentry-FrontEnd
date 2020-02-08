import axios from 'axios';

// --- helper ---
async function requestApi(method, params, formData, requireToken) {
    try {
        let options = {
            url: process.env.REACT_APP_BACKEND_URL + method,
            method: 'post',
            params: params,
            headers: {},
        };

        if (formData) {
            options['data'] = formData;
        }

        if (requireToken) {
            let token = sessionStorage.getItem('ws-token');
            if (!token) {
                token = localStorage.getItem('ws-token');
            }

            if (!token) {
                return {
                    code: api.code.authError,
                    msg: "Not logged in.",
                    detail: ""
                };
            }
            options.headers['WS-User-Token'] = token;
        }

        let res = await axios.request(options);

        if (res.data.code === api.code.authError) {
            // auth fail, logout
            sessionStorage.removeItem('ws-token');
            localStorage.removeItem('ws-token');
        }
        return res.data;
    } catch (error) {
        return {
            code: api.code.frontendRequestFailed,
            msg: "Failed to send request.",
            detail: error
        };
    }
}

// --- api ---
let api = {};

api.code = {
    ok: 0,
	authError: -1,
	wrongParam: -2,
	exceededLimits: -4,
	notExist: -5,
	alreadyExist: -6,

    areaTooLarge: -1001,

    // frontend
    frontendRequestFailed: 100,
}


api.getUserInfo = async () => {
    let response = await requestApi('user/info', {}, null, true);
    return response;
}

api.login = async (email, password, remember = true) => {
    localStorage.removeItem('ws-token');
    sessionStorage.removeItem('ws-token');

    const params = {email: email};
    var formData = new FormData();
    formData.set("password", password);

    let response = await requestApi('login', params, formData, false);
    if (response.code === api.code.ok) {
        if (remember) {
            localStorage.setItem('ws-token', response.data.token);
        } else {
            sessionStorage.setItem('ws-token', response.data.token);
        }
    }
    return response;
}

api.verification = async (email) => {
    const params = { email: email };

    let response = await requestApi('get_verification', params, null, false);
    return response;
}

api.register = async (email, password, verification) => {
    const params = {
        email: email,
        verification: verification
    };
    var formData = new FormData();
    formData.set("password", password);
    
    let response = await requestApi('create_user', params, formData, false);
    return response
}

api.getAllSentries = async () => {
    return await requestApi('sentry/list', {}, null, true);
}

api.requestFullScreenshot = async (url) => {
    const params = {url: url};
    return await requestApi('sentry/request_full_screenshot', params, null, true);
}

api.waitFullScreenshot = async (taskId) => {
    const params = {taskId: taskId};
    let response = null;
    do {
        console.log("requesting...");
        response = await requestApi('sentry/wait_full_screenshot', params, null, true);
    } while (response.code === api.code.ok && response.data.complete === false);

    return response;
}

api.getFullScreenshotLink = (taskId, imageToken) => {
    return process.env.REACT_APP_BACKEND_URL +
           'common/get_full_screenshot_image?taskId=' + taskId +
           '&imageToken=' + imageToken;
}

api.createSentry = async (name, url, x, y, width, height, notification) => {
    const params = {
        name: name,
        url: url,
        x: x,
        y: y,
        width: width,
        height: height,
        notification: notification
    };
    return await requestApi('sentry/create', params, null, true);
}

api.getAllNotifications = async () => {
    return await requestApi('notification/list', {}, null, true);
}

api.addServerChan = async (name, sckey) => {
    const params = {
        name: name,
        sckey: sckey
    };
    return await requestApi('notification/add_serverchan', params, null, true);
}

api.logout = async () => {
    localStorage.removeItem('ws-token');
    sessionStorage.removeItem('ws-token');
}

export default api;
