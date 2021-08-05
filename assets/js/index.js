$(function () {
    
    
})
var layer = layui.layer;
    getUserInfo();
    //获取用户基本信息请求
    function getUserInfo() {
        $.ajax({
            method: 'GET',
            url: '/my/userinfo',
            headers: {
                    Authorization:localStorage.getItem('token')||''
            },
            success: function (res) {
                if (res.status !== 0) {
                    return layui.layer.msg('获取用户信息失败！')
                }
                
                renderAvatar(res.data)
            }
        })
    }

    //渲染用户头像函数
    function renderAvatar(user) {
        var name = user.nickname || user.username;

        $('#welcome').html('欢迎&nbsp;&nbsp;' + name);
        if (user.user_pic !== null) {
            $('.layui-nav-img').attr('src', user.user_pic).show;
            $('.text-avatar').hide()
        } else {
            // 渲染文本头像
            $('.layui-nav-img').hide();
            var first = name[0].toUpperCase();
            $('.text-avatar').html(first).show()
        }


    }
    //实现退出功能
    
    $('#btnLogout').on('click', function () {
        //提示用户是否确认退出
        layer.confirm('确定退出登录？', { icon: 3, title: '提示' }, function (index) {
            
            localStorage.removeItem('token');//清空本地存储中得token
            location.href = '/login.html';//跳转到登录页
            layer.close(index)//关闭confirm询问框
        })
    })
    //控制用户得访问权限
