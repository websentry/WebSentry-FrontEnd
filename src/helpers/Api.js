import axios from 'axios';

// --- helper ---
async function requestApi(method, params, requireToken) {
    if (requireToken) {
        params.token = localStorage.getItem('ws-token');
        if (!params.token) {
            return {
                code: api.code.authError,
                msg: "Not logged in.",
                detail: ""
            };
        }
    }
    try {
        let res = await axios.request({url: process.env.REACT_APP_BACKEND_URL + method, method: 'post', params: params});

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
    let response = await requestApi('user/info', {}, true);
    return response;
}

api.login = async (email, password) => {
    localStorage.removeItem('ws-token');

    const params = {email: email, password: password};
    let response = await requestApi('login', params, false);
    if (response.code === api.code.ok) {
        localStorage.setItem('ws-token', response.data.token);
    }
    return response;
}


export default api;
