$(function () {
    initTable()
})

// 2.定义美化时间的过滤器 -----------------------
template.defaults.imports.dataFormat = function (date) {
    const dt = new Date(date)
  
    var y = dt.getFullYear()
    var m = padZero(dt.getMonth() + 1)
    var d = padZero(dt.getDate())
  
    var hh = padZero(dt.getHours())
    var mm = padZero(dt.getMinutes())
    var ss = padZero(dt.getSeconds())
  
    return y + '-' + m + '-' + d + ' ' + hh + ':' + mm + ':' + ss
  }

 // 1.定义一个(全局变量)查询的参数对象 将来请求数据的时候
    // 需要将请求参数对象提交到服务器
    var queryData = {
        pagenum: 1, //页码值
        pagesize: 2, //每页显示多少条数据
        cate_id: '', //文章分类的 Id
        state:'' //文章的状态
    }
function initTable() {
    $.ajax({
        method: 'GET',
        url: '/my/article/list',
        data: queryData,
        success: function (res) {
            console.log(res);
            if (res.status !== 0) {
                return layui.layer.msg('获取文章失败!')
            }
            // 使用引擎模版渲染数据
            console.log(123);
            var htmlStr = template('tpl-table', res)
            $('.layui-table tbody').html(htmlStr);
        }
    })
}