$.ajaxPrefilter((options)=>{
    options.url = 'http://big-event-api-t.itheima.net'+options.url

    if (options.url.includes('/my/')) {
        options.headers={
            Authorization: localStorage.getItem('token')
        }
    }

    options.complete=(res)=>{
        if(res.responseJSON.status ===1 && res.responseJSON.message === "身份认证失败！") {
            //  强制清空 token
            localStorage.removeItem("token");
            // 强制跳转到登录页面
            location.href = "/login.html"
        }
    }
})

