class ApplicationController < ActionController::Base
  include ReactOnRails::Controller

  protect_from_forgery with: :exception
end
