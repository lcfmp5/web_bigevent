$(function () {
    //点击注册事件
    $('#link-reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })
    //返回登录
    $('#link-login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})
var form = layui.form;
var layer = layui.layer;
form.verify({
    //自定义密码输入规则
    psd:[
        /^[\S]{6,12}$/
        ,'密码必须6到12位，且不能出现空格'
    ],
    //校验两次密码是否一致
    repsd: function (vaule) {
        var psd = $('.reg-box [name=password]').val();
        if (vaule !== psd) {
            return '两次密码输入不一致'
        }
    }
    
})
//监听注册表单的提交事件
$('#form-reg').on('submit', function (e) {
    //阻止默认表单提交
    e.preventDefault();
    $.post('/api/reguser', { username:  $('#form-reg [name=username]').val(), password:  $('#form-reg [name=password]').val() }, function (res) {
        if (res.status!=0) {
          return layer.msg(res.message);
        }
        layer.msg('注册成功，请登录！');
        //注册成功自动切换到登录界面
        $('#link-login').click();
    })
})

//监听登录表单的提交事件
$('#form-login').submit(function(e) {
    e.preventDefault();
    $.ajax({
        url: '/api/login',
        method: 'POST',
        //快速获取表单数据
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg(res.message)
             
            }
            layer.msg('登录成功！')
            //将登录成功获取的token值存到浏览器本地存储
             localStorage.setItem('token', res.token)
             location.href='/index.html'
        }
            
            
           
    })
   
})