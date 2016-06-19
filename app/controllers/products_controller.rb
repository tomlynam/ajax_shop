class ProductsController < ApplicationController
  def index
  end

  def show
  	@product_id = params[:id]
  end

  def new
  end

  def edit
    @product_id = params[:id]
  end

  private

  def product_params
  end

end
