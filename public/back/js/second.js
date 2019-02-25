$(function(){
  // 1. 一进入页面发送 ajax请求
  var currentPage = 1; // 当前页
  var pageSize = 5; // 每页条数
  render(); // 完成渲染

  function render(){
    $.ajax({
    url:'/category/querySecondCategoryPaging',
    type: 'get',
    data: {
        page:currentPage,
        pageSize:pageSize
    },
    dataType:'json',
    success:function(info){
      console.log(info);
      //渲染页面
var htmlStr = template('secondTpl',info);
$('tbody').html(htmlStr)

 //初始化分页插件
 $('#paginator').bootstrapPaginator({
     //版本号
     bootstrapMajorVersion:3,
     //当前页
     currentpage:info.page,
     //总页数
     totalPages: Math.ceil(info.total/info.size),
     //给页面添加点击事件
     onPageClicked:function(a,b,c,page){
      //更新当前页
     currentPage = page;
    //  console.log(currentPage );
     
     render();

     }
   })
  }
 })
};

// 2. 点击添加分类按钮, 显示添加模态框

$('#addBtn').on('click',function(){
    $('#addModal').modal('show');
})


})