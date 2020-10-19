$(function () {
    // 添加layui的自定义校验规则
    layui.from.verify({
        repwd: function (confirmpwd) {
            // 2.获取新密码
            var newpwd = $('[name=newPwd]').val().trim();
            if (confirmpwd != newpwd) {
                return layui.layer.msg('两次输入密码不一致')
            }
        }
    })
})

// 1.表单提交事件
//  a.触发 layui的表单验证机制
// 如果 验证机制 有返回错误信息 则阻断 b的执行
// 如果 验证机制 没有任何返回的错误信息 则继续执行b
//  b.执行 程序员注册的事件方法代码 进行ajax提交
$('#formChangePwd').on('submit', function () {
    changePwd();
})

// 修改 用户的密码
function changePwd() {
    // 通过jq 获取表单数据（原密码和新密码）
    var strData = $('#formChangePwd').serialize();
    $.ajax({
        method: 'POST',
        url: '/my/updatepwd',
        data: strData,
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg(res.message);
            } else {
                layui.layer.msg(res.message, function () {
                    localStorage.removeItem('token');
                    window.parent.location.href = "/home/login.html"
                });
            }
        }
    })
}