app.controller('PostsCtrl', ['Post', 'action', function (Post, action) {
    var ctrl = this;
    // Код отработает только для  '/posts'
    action('index', function(){
      ctrl.posts = Post.query();
    });

    // Вызовется для паттерна '/posts/:id'
    action('show', function (params){
      ctrl.post = Post.get({id: params.id});
    });

    // Только для '/posts/new'
    action('new', function(){
      ctrl.post = Post.new();
      // Присваивание каллбека создания, который будет вызван автоматически при сабмите формы. См. ниже.
      ctrl.save = Post.create;
    });

    // Для паттерна '/posts/:id/edit'
    action('edit', function (params){
      ctrl.post = Post.edit({id: params.id});
      // Аналогичное присваивание для каллбека обновления
      ctrl.save = Post.update;
    })

    // Общий код. Вызовется для двух методов edit и new.
    action(['edit', 'new'], function(){
      //
    })

    action(['index', 'edit', 'show'], function () {
      ctrl.destroy = function (post) {
        Post.destroy({id: post.id}, function () {
          ctrl.posts = _.select(ctrl.posts, function (_post) {
            return _post.id != post.id
          })
        })
      }
    })

    // Так же внутри ресурса routes.rb можно создать свой кастомный метод. Вызовется для: '/posts/some_method'
    action('some_method', function(){
      //
    })

    // etc
  }])