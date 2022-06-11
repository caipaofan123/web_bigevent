$(function(){
    const form= layui.form
    form.verify({
        pwd:[/^[\S]{6,12}$/, "密码必须6到12位，且不能出现空格"],
        samePwd:(val)=>{
            if (val===$('[name=oldPwd]').val()) {
                return "新密码不能和原密码相同"
            }
        },
        rePwd:(val)=>{
            if (val!==$('[name=newPwd').val()) {
                return "新密码和确认密码不相同"
            }
        }
    })

    $('.layui-form').submit(function(e){
        e.preventDefault();
        $.ajax({
            type: 'POST',
            url:'/my/updatepwd',
            data:$(this).serialize(),
            success: res => {
                if (res.status!==0) {
                    layer.msg("更新密码失败")
                }
                layer.msg("更新密码成功")
                localStorage.removeItem('token')
                window.parent.location.href='/login.html'
            }

        })
    })
})