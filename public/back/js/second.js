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
    //   console.log(info);
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
    //  console.log(info);
     var htmlStr = template('secondTpl2',info);
     $('.dropdown-menu').html(htmlStr);
     
    }
  })
 });
// 3. 给下拉菜单添加可选功能
$('.dropdown-menu').on('click','a',function(){

var txt = $(this).text();
var id = $(this).data('id');

//赋值给button按钮 span显示
$('#dropdownText').text(txt);

//赋值给隐藏域
$('[name="categoryId"]').val(id);

//只要隐藏域有值了.就更新成成功状态
$('#form').data('bootstrapValidator').updateStatus('categoryId','VALID')

});
//完成文件初始化
$('#fileupload').fileupload({
    dataType: 'json',
    //文件上传完成时的回调函数
    done: function(e,data){
       console.log(data);
    var picUrl = data.result.picAddr;
    
    //获取图片地址 设置给img 的src
    $('#imgBox img').attr('src',picUrl);
    //然后在赋值给隐藏域 input 的value
    $('[name="brandLogo"]').val(picUrl);

// 只要隐藏域有值了, 就是更新成成功状态
$('#form').data('bootstrapValidator').updateStatus('brandLogo','VALID');

    }
})

// 5. 直接进行校验
$('#form').bootstrapValidator({
//配置 excluded 排除项,对隐藏域完成校验
excluded:[],
//配置图标
feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
  //配置校验字段
fields: {
// 选择一级分类 
 categoryId: {
    validators: {
        notEmpty: {
            message: '请选择一级分类'
        }
    }
 },

 brandName: {
    validators: {
        notEmpty: {
            message: '请输入二级分类'
        }
    }
 },
 brandLogo: {
    validators: {
        notEmpty: {
            message: '请输入选择图片'
        }
    }
 }
}
});
console.log($('#form').serialize());

//注册表单校验成功事件,阻止默认的提交,通过ajax提交
$('#form').on('success.form.bv',function(e){
    e.preventDefault();

    $.ajax({
        url:'/category/addSecondCategory',
        type:'post',
        data:$('#form').serialize(),
        dataType:'json',
        success:function(info){
           console.log(info);
       //关闭模态框  
          $('#addModal').modal('hide');
       //重新渲染
       currentPage=1;
       render();

       //将表单元素重置(内容和状态)
       $('#form').data('bootstrapValidator').resetForm(true);
      //button 和 img 不是表单元素,手动重置
      $('#dropdownText').text('请选择一级分类');
      $('#imgBox img').attr('src','./images/none.png');
      
           
        }
    })
})




});