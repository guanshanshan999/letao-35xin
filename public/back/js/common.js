


$(document).ajaxStart(function () {
  // console.log(123);

  // 开启进度条
  NProgress.start();
})

$(document).ajaxStop(function () {
  //模拟网络延迟
  setTimeout(function () {

    NProgress.done();
  }, 2000);

});

// 公用的功能:
// 1. 左侧二级菜单的切换
// 2. 左侧整体菜单的切换
// 3. 公共的退出功能 

// 等待 dom 结构加载完成后, 才会执行

$(function () {

  // 1. 左侧二级菜单的切换
  $('.lt_aside .category').click(function () {

    $(this).next().stop().slideToggle();
  });

  // 2. 左侧整体菜单的切换

  $('.lt_topbar .icon_menu').click(function () {
    // 让左侧整个菜单切换显示, 改左侧菜单的 left 值
    $('.lt_aside').toggleClass('hidemenu');
    $('.lt_topbar').toggleClass('hidemenu');
    $('.lt_main').toggleClass('hidemenu');

  });

  // 3. 退出功能
  //    点击菜单的退出按钮, 显示一个模态框, 询问用户
  $('.lt_topbar .icon_logout').click(function () {
    $('#logoutModal').modal('show');
  })

  //   点击模态框的退出按钮, 表示确认退出
  //   发送 ajax 请求, 让服务器端销毁用户的登陆状态
  $('#logoutBtn').click(function () {

    $.ajax({
      url: "/employee/employeeLogout",
      type: 'get',
      dataType: 'json',
      success: function (info) {
        console.log(info);
        // 退出成功, 跳转登录页
        location.href = "login111.html"

      }


    })

  })


})