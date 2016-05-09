class PostsController < ApplicationController
  before_action :set_post, only: [:show, :edit, :update, :destroy]

  def index
    respond_to do |format|
      format.html
      format.json {
        @posts = Post.all
        render json: @posts
      }
    end
  end

  def show
    respond_to do |format|
      format.html
      format.json {
        render json: @post
      }
    end
  end

  def new
    respond_to do |format|
      format.html
      format.json {
        render json: Post.new
      }
    end
  end

  def edit
    respond_to do |format|
      format.html
      format.json {
        render json: @post
      }
    end
  end

  def create
    @post = Post.new post_params
    if @post.save
      render json: {post: @post, msg: "Post successfully created", redirect_to: "posts_path"}
    else
      render json: {errors: @post.errors, msg: @post.errors.full_messages.join(', ')}, status: 422
    end
  end

  def update
    if @post.update(post_params)
      render json: {post: @post, msg: "Post successfully updated", redirect_to: "posts_path"}
    else
      render json: {errors: @post.errors, msg: @post.errors.full_messages.join(', ')}, status: 422
    end
  end

  def destroy
    @post.destroy
    render json: {msg: "Post successfully deleted", redirect_to: "posts_path"}
  end

  private
    def set_post
      @post = Post.find(params[:id])
    end

    def post_params
      params.require(:post).permit(:title, :description)
    end
end
