const axios = require('axios');

const apiUrlBase = 'http://127.0.0.1:8080/v1/';

let api = {};

api.requestApi = async (method, params, requireToken) => {
    if (requireToken) {
        params.token = localStorage.getItem('ws-token');
    }

    let res = await axios.request({url: apiUrlBase + method,
                            method: 'post', params: params});
    if (res.data.code===-1) {
        // auth fail, logout
        localStorage.removeItem('ws-token');
        sessionStorage.removeItem('ws-loginInfo');
    }
    return res.data;
}

api.getLoginInfo = async () => {
    if (localStorage.getItem('ws-token') === null) return {login: false};
    let info = localStorage.getItem('ws-loginInfo');
    if (info!==null) return info;
    // use token to request login info
    let response = await api.requestApi('user/info', {}, true);
    if (response.code===0) {
        info = response.data;
        localStorage.setItem('ws-loginInfo', info);
        return info;
    } else {
        return null;
    }
}

api.login = async (email, password) => {
    localStorage.removeItem('ws-token');
    sessionStorage.removeItem('ws-loginInfo');

    const params = {email: email, password: password};
    let response = await api.requestApi('login', params, false);
    if (response.code===0) {
        localStorage.setItem('ws-token', response.data.token);
    }
    return response;
}


export default api
