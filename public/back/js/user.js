$(function () {
  var currentPage = 1;
  var pageSize = 5;
  render();
  function render() {
    $.ajax({
      url: '/user/queryUser',
      type: 'get',
      data: {
        page: currentPage,
        pageSize: pageSize
      },
      dataType: 'json',
      success: function (info) {
        //  console.log(info);

        var htmlStr = template('userTpl', info);
        $('tbody').html(htmlStr);


        // 根据请求回来的数据, 完成分页的初始化显示  
        $('#paginator').bootstrapPaginator({
          // 版本号
          bootstrapMajorVersion: 3,
          // 当前页
          currentPage: info.page,
          // 总页数
          totalPages: Math.ceil(info.total / info.size),
          // 给页码添加点击事件
          onPageClicked: function (a, b, c, page) {
            //   console.log(page);
            // 更新 currentPage, 并且重新渲染即可
            currentPage = page;
            render();
          }
        })

      }

    })

  }

  // 2. 点击表格中的按钮, 显示模态框
  // 事件委托的作用:
  // 1. 给动态创建的元素绑定点击事件
  // 2. 批量绑定点击事件 (效率比较高的)
  // 思路: 使用事件委托绑定按钮点击事件
  var currentId 
  $('tbody').on('click', '.btn', function () {
    //让模态框显示
    $('#userModal').modal('show');
    //获取当前按钮的id
    currentId = $(this).parent().data('id');
    // console.log(currentId);
    //获取启用 禁用的状态
    isDelete = $(this).hasClass('btn-danger') ? 0 : 1;
    // console.log(isDelete);

  })
  // 给模态框的确定按钮, 添加点击事件
  $('#confirmBtn').on('click', function () {
    console.log(currentId,isDelete)
    //发送ajax请求
    $.ajax({
      url: '/user/updateUser',
      type: 'post',
      data: {
        id: currentId,
        isDelete: isDelete
      },
      dataType: 'json',
      success: function (info) {
        console.log(info);
        if (info.success) {
          //关闭模态框
          $('#userModal').modal('hide');
          //重新渲染页面
          render();
        }

      }
    })


  })





});