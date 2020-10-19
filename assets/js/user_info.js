$(function () {
    // 发送异步请求 获取用户的基本信息
    initUserInfo()
})
$('#btnSubmit').on('click', function () {
    modifyUserInfo()
})

$(function () {
    //  从layui中获取form对象
    var form = layui.form;

    // layui.verify自定义规则验证表单字段
    form.verify({
        nickname: function (inputValue) {
            if (inputValue.length > 6) {
                return '昵称必须在1-6个字符之间'
            }
        }
    })
})

// 初始化用户的基本信息
function initUserInfo() {
    $.ajax({
        method: 'GET',
        url: '/my/userinfo',
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('获取用户信息失败')
            }
            layui.form.val('formUserInfo', res.data)
        }

    })
}

// 重置表单的数据（重新渲染）
$('#btnReset').on('click', function (e) {
    // 阻止表单的默认重置行为
    e.preventDefault();
    // 调用方法 重新 请求用户信息 并填充到表单中
    initUserInfo()
})

// 提交修改的用户信息
function modifyUserInfo() {
    // 1.获取表单数据
    var dataStr = $('#formModify').serialize();

    // 2.异步提交到服务器 修改数据的接口
    $.ajax({
        method: 'post',
        url: '/my/userinfo',
        data: dataStr,
        success: function (res) {
            if (res.status === 0) {
                layui.layer.msg(res.message);
                window.top.getUserInfo();
            }
        }
    })
}