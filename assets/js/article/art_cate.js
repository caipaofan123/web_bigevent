$(function () {
  const initArtCateList = () => {
    $.ajax({
      type: 'GET',
      url: '/my/article/cates',
      success: (res) => {
        if (res.status !== 0) {
          return layer.msg('获取文章列表失败');
        }
        const htmlStr = template('tpl-table', res);
        $('tbody').empty().html(htmlStr);
      },
    });
  };

  let indexAdd=null
  $('#btnAddCate').click(() => {
    indexAdd=layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章分类',
      content: $('#dialog-add').html()
  })
  });

  $('body').on('submit',"#form-add",function(e){
      e.preventDefault();
      $.ajax({
          type: "POST",
          url:'/my/article/addcates',
          data:$(this).serialize(),
          success:(res)=>{
            if (res.status !== 0) return layer.msg("新增文章分类失败！");
            layer.msg("添加文章分类成功！")
            initArtCateList()
            layer.close(indexAdd)
          }


      })
  })
  initArtCateList();
});
