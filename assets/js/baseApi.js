//为jq的异步请求 新增一个回调函数 每次jq异步请求之前 都会先执行以下代码
$.ajaxPrefilter(function (options) {
    // console.log(options);
    // 在发起真正的ajax请求之前 统一拼接请求的根路径
    // 过滤器之-域名过滤 
    options.url = 'http://ajax.frontend.itheima.net' + options.url;

    // 统一为有权限的接口 设置headers请求头
    // 判断当前url是否包含了 /my/userinfo 如果包含 则发送token
    // 以 / my 开头的请求路径， 需要在请求头中携带 Authorization 身份认证字段， 才能正常访问成功
    if (options.url.indexOf('/my/') > -1) {
        options.headers = {
            Authorization: localStorage.getItem('token')
        }
    }

    // 全局统一 挂载 complete 回调函数
    // 统一处理 服务端返回的 未登录 错误 (无论成功还是失败都会执行complete回调函数)
    options.complete = function (res) {
        if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {

            // 1.提示用户没有权限
            alert('您的登录已经失效，请重新登录')
            // 2.删除localStorage中肯存在的伪造的 token
            localStorage.removeItem('token')
            // 3.页面跳转到 login
            window.top.location.href = '/home/login.html';
        }
    }
})