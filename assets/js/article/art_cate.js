$(function () {
    // 1.请求分类列表数据
    initArtCateLists();
})
// 获取文章分类的列表
function initArtCateLists() {
    $.ajax({
        method: 'GET',
        url: '/my/article/cates',
        success: function (res) {
            console.log(res);
            var htmlStr = template('tpl-table', res)
            $('tbody').html(htmlStr);
        }
    })
}

// 为添加绑定事件
var indexAdd = null; //打开新窗口
$('#btnAddCate').on('click', function () {
    indexAdd =layui.layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '添加文章分类',
        content: $('#dialog-add').html(),
      });     
     
})
// 通过代理的形式 为from-add表单绑定 submit事件
$('body').on('submit', '#form-add', function (e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/article/addcates',
        data: $(this).serialize(),
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('新增失败')
            }
            layui.layer.msg('新增成功')
            initArtCateLists();
            // 根据索引 关闭对应的弹出层
            layui.layer.close(indexAdd);
        }
    })
})


// 通过代理的形式 为btn-edit按钮绑定事件
var indexEdit = null;
$('tbody').on('click', '.btn-edit', function () {
    // 打开面板 并保存面板的id 弹出一个修改文章分类的信息层
    indexEdit =layui.layer.open({
        type: 1,
        area: ['500px', '250px'],
        title: '修改文章分类',
        content: $('#dialog-edit').html(),
    });    

    // 方法1 
    // 获取 当前行中 数据：id，分类名，分类别名
    // var oldData = {
    //     Id: this.dataset.id,
    //     name: $(this).parent().prev('td').prev('td').text().trim(),
    //     alias:$(this).parent().prev('td').text().trim(),
    // }
    // 方法2 拿到data-id的值
    var id = $(this).attr('data-id');
    console.log(id);
    // 发起请求获取对应分类的数据
    $.ajax({
        method: 'GET',
        url: '/my/article/cates/' + id,
        success: function (res) {
            console.log(res);
            layui.form.val('form-edit',res.data)
        }
    })
})

// 通过代理的形式 为修改分类的表单绑定submit事件
$('body').on('submit', '#form-edit', function (e) {
    e.preventDefault();
    $.ajax({
        method: 'POST',
        url: '/my/article/updatecate',
        data: $(this).serialize(), //获取当前表单数据
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('更新分类数据失败！');
            }
            layui.layer.msg('更新分类数据成功!')
            layer.close(indexEdit); //关闭弹出层
            initArtCateLists(); //刷新表格数据
        }
    })
})
$('tbody').on('click', '.btn-delete', function () {
    var id = $(this).attr('data-id');
    // 提示用户是否要删除
    layui.layer.confirm('确认删除?', { icon: 3, title: '提示' },
        function (index) {
            $.ajax({
                method: 'GET',
                url: '/my/article/deletecate/' + id,
                success: function (res) {
                    console.log(res);
                    if (res.status !== 0) {
                        return layui.layer.msg('删除文章分类失败！')
                    }
                    layui.layer.msg('删除文章分类成功！')
                    layui.layer.close(index); //关闭弹出层
                    initArtCateLists(); //调用表格数据
                }
            })
    })
})