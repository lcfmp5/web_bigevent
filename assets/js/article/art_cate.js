$(function () {
    initArtCateList();
    //获取文章分类列表
    function initArtCateList() {
        $.ajax({
            method: 'GET',
            url: '/my/article/cates',
            success: function (res) {
                console.log(res);
                var htmlStr = template('tpl-table', res)
                $('tbody').html(htmlStr)
            }
        })
    }
    var layer = layui.layer;
    var form = layui.form;
    var indexAdd = null;
    //按钮点击事件通过layer.open()展示弹出层
    $('#btnAddCate').on('click', function () {
      indexAdd=  layer.open({
            type: 1,
            area: ['500px', '240px'],
            title: '添加文章分类',
            content:$('#dialog-add').html()
    })
    })
    // 通过代理的形式，为 form-add 表单绑定 submit 事件
    $('body').on('submit', '#form-add', function (e) {
        e.preventDefault();
        $.ajax({
            method: 'POST',
            url: '/my/article/addcates',
            data: $(this).serialize(),
            success: function (res) {
                if (res.status !== 0) {
                    return layer.msg('新增分类失败！')
                }
                initArtCateList()
                layer.msg('新增分类成功！')
                layer.close(indexAdd)
            }
        })
    })
   //通过 `代理` 的形式，为 `btn-edit` 按钮绑定点击事件
    var indexEdit = null;
    $('tbody').on('click', '.btn-edit', function () {
        indexEdit = layer.open({
            type: 1,
            area: ['500px', '240px'],
            title: '修改文章分类',
            content:$('#dialog-edit').html()
        })
        //在展示弹出层之后，根据 id 的值发起请求获取文章分类的数据，并填充到表单中
        var id = $(this).attr('data-id');
       
        $.ajax({
            method: 'GET',
            url: '/my/article/cates'+id,
            success: function (res) {
              console.log(res);
                form.val('form-edit',res.data)
            }
        })
    })
    $('body').on('submit', '#form-edit', function(e) {
        e.preventDefault()
        $.ajax({
              method: 'POST',
              url: '/my/article/updatecate',
            data: $(this).serialize(),
              
            success: function (res) {
                 
                if (res.status !== 0) {
                  return layer.msg('更新分类数据失败！')
                }
                layer.msg('更新分类数据成功！')
                layer.close(indexEdit)
                initArtCateList()
              }
        })
    })
    $('tbody').on('click', '.btn-delete', function() {
        var id = $(this).attr('data-id')
        // 提示用户是否要删除
        layer.confirm('确认删除?', { icon: 3, title: '提示' }, function(index) {
          $.ajax({
            method: 'GET',
            url: '/my/article/deletecate/' + id,
            success: function(res) {
              if (res.status !== 0) {
                return layer.msg('删除分类失败！')
              }
              layer.msg('删除分类成功！')
              layer.close(index)
              initArtCateList()
            }
          })
        })
    })
   
})
