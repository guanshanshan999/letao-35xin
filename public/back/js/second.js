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
    //在点击按钮时, 就发送ajax请求


    // 发送请求, 获取一级分类的全部数据, 将来用于渲染
     // 根据已有接口, 模拟获取全部数据的接口, page:1  pageSize:100

   $.ajax({  
    url:'/category/queryTopCategoryPaging',
    type:'get',
    data:{
     page:1,
     pageSize:100,
    },
    dataType:'json',
    success:function(info){
     console.log(info);
     var htmlStr = template('secondTpl2',info);
     $('.dropdown-menu').html(htmlStr);
     
    }
  })
 });
// 3. 给下拉菜单添加可选功能
$('.dropdown-menu').on('click','a',function(){

var txt = $(this).text();

//赋值给button按钮 span显示
$('#dropdownText').text(txt);

})



});