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
            const token = localStorage.getItem('ws-token');
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

api.login = async (email, password) => {
    localStorage.removeItem('ws-token');

    const params = {email: email};
    var formData = new FormData(); 
    formData.set("password", password);
    
    let response = await requestApi('login', params, formData, false);
    if (response.code === api.code.ok) {
        localStorage.setItem('ws-token', response.data.token);
    }
    return response;
}

api.getAllSentries = async () => {
    return await requestApi('sentry/list', {}, null, true);
}

export default api;
