// 前端不知道当前用户的登录状态, 但是后台知道
// 前端一般可以发送 ajax 请求, 去检测用户的登录状态, 如果未登录, 进行拦截, 拦截到登录页
$.ajax({
    url:'/employee/checkRootLogin',
    type:'get',
    dataType:'json',
    success:function(info) {
        // console.log(info);
   if(info.error === 400){
    location.href = 'login111.html';
   }
}
})