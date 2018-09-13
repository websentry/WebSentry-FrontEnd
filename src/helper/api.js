

const apiUrlBase = 'http://127.0.0.1:8080/v1/';

let api = {};

api.requestApi = async (method, params, requireToken) => {
    if (requireToken) {
        params.token = localStorage.getItem('ws-token');
    }

    let res = await axios.request({url: apiUrl + method,
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
    let data = await api.requestApi('user/info', {}, false);
    if (data.code===0) {
        info = {login: true
                email: data.email};
        localStorage.setItem('ws-loginInfo', info);
        return info;
    } else {
        return {login: false};
    }
}


export default api
