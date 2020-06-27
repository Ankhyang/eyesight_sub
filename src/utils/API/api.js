const API_BASE_URL = 'http://host1.cqgfwlkj.com:8084'

const request = (url, data, method) => { 
    let _url = API_BASE_URL  + url;
    return new Promise((resolve, reject) => {
      wx.request({
        url: _url,
        method,
        data: data,
        header: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        success(request) {
            resolve(request.data)
        },
        fail(error) {
            reject(error)
        }
      })
    });
}

export default {
    // 保存用户信息
    save_userInfo : data => {
        return request('/api/v1/save/user', data, 'POST')
    },
    // 获取openid
    getOpenId: code => {
        return request('/api/v1/wx/login', code, 'GET')
    },
    // 保存视力信息
    save_sight_info: data => {
        return request('/api/v1/save/logv', data, 'POST')
    },
    // 获取手机号码
    getPhoneNum: data => {
        return request('/api/v1/wx/getPhone', data, 'GET')
    }
}







