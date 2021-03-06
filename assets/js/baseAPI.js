jQuery.ajaxPrefilter(function (options) {
    options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
    // options.url = 'http://ajax.frontend.itheima.net' + options.url;
    //统一为有权限接口设置headers请求头
    if (options.url.indexOf('/my/') !== -1) {
        options.headers = {
            Authorization:localStorage.getItem('token')||''
        }
    }
    //在调用接口时，不论成功还是失败，都会最终调用complete回调函数
    //全局统一挂载complete 函数
    options.complete = function (res) {
        
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
            localStorage.removeItem('token');
            location.href='/login.html'
        }
    }
})