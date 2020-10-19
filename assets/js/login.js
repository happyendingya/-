 // 从layui中获取form对象
 var form = layui.form;
 var layer = layui.layer;
 $(function () {
     // 点击 注册账号 的链接
     $('#link_reg').on('click', function () {
         // 登录隐藏
         $('.login-box').hide();
         // 注册显示
         $('.reg-box').show();
     })
     // 点击 登录账号 的链接
     $('#link_login').on('click', function () {
         $('.login-box').show();
         $('.reg-box').hide();
     })
     // 通过from.verify()函数自定义校验规则
     //数组的两个值分别代表：[正则匹配、匹配不符时的提示文字]
     form.verify({
         // 自定义pwd校验规则
         pwd: [
             /^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'
         ],
         // 校验两次密码是否一致
         repwd: function (value) {
             // 通过形参value拿到确认密码框中的内容
             // 1.获取 密码内容   属性选择器[name=password] name属性值完全等于password
             var pwd = $('.reg-box [name=password]').val();
             // 2.对比 密码内容 和 val中内容是否一致
             if (pwd !== value) {
                 return '两次输入密码不一致'
             }
         }
     })
 })

 // 监听注册表单的提交事件
 $('#form_reg').on('submit', function (e) {
     e.preventDefault();
     var username = $('.reg-box [name=username]').val();
     var password = $('.reg-box [name=password]').val();
     $.post('/api/reguser', {
             username: username,
             password: password,
         },
         function (res) {
             if (res.status !== 0) {
                 layer.msg(res.message)
             } else {
                 layer.msg(res.message, function () {
                     // alert(res.message);
                     // 注册成功后返回登录界面 将注册表单的值清空
                     $('#link_login').click();
                     $('#form_reg')[0].reset();
                 });
                 // 将 用户名和密码 设置给 登录窗口的输入框和密码框
                 $('.login-box [name=username]').val(username);
                 $('.login-box [name=password]').val(password);
             }

         })
 })
 // 监听登录表单的提交事件
 $('#form_login').on('submit', function (e) {
     e.preventDefault();
     var dataStr = $(this).serialize();
     $.ajax({
         method: 'post',
         url: '/api/login',
         data: dataStr,
         success: function (res) {
             // 直接显示 登录结果 并执行回调函数
             // layer.msg('关闭后想做些什么', {
             // time:2500    2.5秒后执行
             // ,}function(){
             //     //do something
             //   }); 
             console.log(res);
             if (res.status === 0) {
                 localStorage.setItem('token', res.token);
                 window.location = 'index.html'
             }
         }
     })
 })