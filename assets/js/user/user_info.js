$(function () {
    var form = layui.form;
    form.verify({
        nickname: function (val) {
            if (val.length > 6) {
                return '昵称须在1~6个字符之间！'
            }
        }
    })
    initUserInfo();
    //初始化用户得基本信息
    function initUserInfo() {
        $.ajax({
                method: 'GET',
                url: '/my/userinfo',
                success: function (res) {
                    if (res.status!==0) {
                        return layer.msg('获取用户信息失败！')
                    }
                    form.val('formUserInfo',res.data)
                }
            }
        )
    }
    //表单重置--阻止表单默认重置行为，在重新获取用户信息
    $('#btnReset').on('click',function (e) {
        e.preventDefault();
        initUserInfo()
    })
//更新用户信息得请求
    $('.layui-form').on('submit',function (e) {
        e.preventDefault()
        $.ajax({
            method: 'POST',
            url: '/my/userinfo',
            data: $(this).serialize(),
            success:function (res) {
                if (res.status !== 0) {
                    return layer.msg('更新用户信息失败！')
                }
                layer.msg('更新成功！');
                //调用父页面的方法，重新渲染用户的头像和信息
                window.parent.getUserInfo();
                //`<iframe>` 中的子页面，如果想要调用父页面中的方法，使用 `window.parent` 即可
            }

        })
    })
    
})