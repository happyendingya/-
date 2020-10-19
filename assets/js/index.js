$(function () {
    // 调用getUserInfo获取用户的基本信息
    getUserInfo();

    // 提示用户是否确认退出
    $('#btnLogout').on('click', function () {
        layui.layer.confirm('确认退出登录?', {
            icon: 3,
            title: '提示'
        }, function (index) {
            // 1.清空本地存储的 token
            localStorage.removeItem('token');
            // 2.重新跳转到登录页面
            location.href = '/home/login.html';
            // 关闭 confirm询问框
            layer.close(index);
        })
    })
})
// 异步获取 用户的基本信息-----------------------
// JQ内部方法存在 var xhr = new XMLHttpRequest();XHR对象
function getUserInfo() {
    // 获取token
    // var token = localStorage.getItem('token');
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        // 请求头配置对象
        // headers: {
        //     // token一段对称加密算法后的字符串
        //     Authorization: token,
        // },
        success: function (res) {
            if (res.status !== 0) {
                // layer.msg提示框
                return layui.layer.msg('获取用户信息失败');
            }
            // 成功 调用renderAvatar 渲染用户的头像
            renderAvatar(res.data)
        }
    })
}

// 渲染用户的头像
function renderAvatar(userinfo) {
    // 1 获取用户的名称
    console.log(userinfo.nickname);
    var uname = userinfo.nickname || userinfo.username;
    $('#welcome').html('欢迎👏' + uname);
    // 渲染用户的头像
    if (userinfo.user_pic !== null) {
        // 渲染图片头像 添加attr自定义属性
        $('.layui-nav-img').attr('src', userinfo.user_pic).show();
        $('.text-avatar').hide();
    } else {
        // 渲染文本头像
        $('.layui-nav-img').hide();
        var firstChar = uname[0].toUpperCase();
        console.log(firstChar, uname);
        $('.text-avatar').html(firstChar).show();
    }
}