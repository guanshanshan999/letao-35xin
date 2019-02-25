
$(function(){

    var currentPage = 1;
    var pageSize = 5;

    render();
    function render() {
        $.ajax({
            type: 'get',
            url: '/category/queryTopCategoryPaging',
            data: {
              page: currentPage,
              pageSize: pageSize
            },
            dataType: 'json',
            success: function (info) {
              // console.log(info);
        var htmlStr = template('firstTpl',info);
          $('tbody').html(htmlStr);


        // 完成分页初始化
$('#paginator').bootstrapPaginator({
   //版本号
   bootstrapMajorVersion:3,
   //当前页
   currentPage: info.page,
   //总页数
  totalPages: Math.ceil(info.total / info.size),
  //给页码添加点击事件
  onpageClicked: function (a, b, c, page) {
    // console.log(page);
    //更新当前页,并且重新渲染
    currentPage = page;
    render();

  }


})

 }
   })
   }
// 2. 点击添加分类按钮, 显示添加模态框
$('#addBtn').on('click',function(){
$('#addModal').modal('show');

});

  // 3. 完成添加校验

  $('#form').bootstrapValidator({
   //配置图标
   feedbackIcons: {
    valid: 'glyphicon glyphicon-ok',
    invalid: 'glyphicon glyphicon-remove',
    validating: 'glyphicon glyphicon-refresh'
  },
//配置需要校验的字段列表
fields: {
  categoryName: {
    //配置校验规则
    validators: {
      //非空校验
      notEmpty: {
        message:'请输入一级分类名称'
      }
    }
  }
}

});

// 4. 注册表单校验成功事件, 在事件中阻止默认的提交, 通过ajax提交即可
$('#form').on('success.form.bv',function(e){
   e.preventDefault();//阻止默认事件提交

   //通过 ajax 提交
   $.ajax({
     url:'/category/addTopCategory',
     type:'post',
     data: $('#form').serialize(),
     dataType:'json',
     success:function(info){
      console.log(info);
      if(info.success){
    //关闭模态框 重新渲染
    $('#addModal').modal('hide');
   //渲染第一页
    currentPage = 1;

    render();
//将表单的内容和状态都要重要
$('#form').data('bootstrapValidator').resetForm(true);

      }
     }
   })
})






})