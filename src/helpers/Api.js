import axios from 'axios';

const VERSION = 'v1';
const BASEURL = process.env.REACT_APP_BACKEND_URL + VERSION + '/';
// --- helper ---
async function requestApi(method, params, formData, requireToken) {
    try {
        let options = {
            url: BASEURL + method,
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
                    msg: 'Not logged in.',
                    detail: ''
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
            msg: 'Failed to send request.',
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

// --- user ---
api.getUserInfo = async () => {
    return await requestApi('user/info', {}, null, true);
}

api.updateSetting = async (lang, tz) => {
    let params = {}
    if (lang) {
        params['lang'] = lang
    }
    if (tz) {
        params['tz'] = tz
    }
    return await requestApi('user/update', params, null, true);
}

api.login = async (email, password, remember = true) => {
    localStorage.removeItem('ws-token');
    sessionStorage.removeItem('ws-token');

    const params = {email: email};
    var formData = new FormData();
    formData.set('password', password);

    let res = await requestApi('login', params, formData, false);
    if (res.code === api.code.ok) {
        if (remember) {
            localStorage.setItem('ws-token', res.data.token);
        } else {
            sessionStorage.setItem('ws-token', res.data.token);
        }
    }
    return res;
}

api.verification = async (email) => {
    const params = {
        email: email
    };
    return await requestApi('get_verification', params, null, false);
}

api.register = async (email, password, verification) => {
    const params = {
        email: email,
        verification: verification
    };
    var formData = new FormData();
    formData.set('password', password);

    return await requestApi('create_user', params, formData, false);
}

api.logout = async () => {
    localStorage.removeItem('ws-token');
    sessionStorage.removeItem('ws-token');
}

// --- sentry ---
api.getAllSentries = async () => {
    return await requestApi('sentry/list', {}, null, true);
}

api.getSentryInfo = async (id) => {
    const params = {
        id: id
    };
    return await requestApi('sentry/info', params, null, true);
}

api.requestFullScreenshot = async (url) => {
    const params = {url: url};
    return await requestApi('sentry/request_full_screenshot', params, null, true);
}

api.waitFullScreenshot = async (taskId) => {
    const params = {
        taskId: taskId
    };
    let res = null;
    do {
        console.log('requesting...');
        res = await requestApi('sentry/wait_full_screenshot', params, null, true);
    } while (res.code === api.code.ok && res.data.complete === false);

    return res;
}

api.getFullScreenshotLink = (taskId, imageToken) => {
    return BASEURL +
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

api.removeSentry = async (id) => {
    const params = {
        id: id
    };
    return await requestApi('sentry/remove', params, null, true);
}

api.getHistoryImage = (filename) => {
    return BASEURL + 'common/get_history_image?filename=' + filename
}

// --- notification ---
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

export default api;
