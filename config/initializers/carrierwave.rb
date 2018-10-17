require 'carrierwave/orm/activerecord'

CarrierWave.configure do |config|
  # # AWS has not been configured for this project
  # config.fog_provider = 'fog/aws'
  # config.fog_credentials = {
  #   provider:              'AWS',
  #   aws_access_key_id:     ENV['aws_access_key_id'],
  #   aws_secret_access_key: ENV['aws_secret_access_key']
  # }

  if Rails.env.test?
    config.storage = :file
    config.enable_processing = false
    config.root = "#{Rails.root}/tmp"
  elsif Rails.env.development?
    config.storage = :file
    config.enable_processing = true
  else
    config.storage = :fog
  end

  config.cache_dir = "#{Rails.root}/tmp/uploads"

  # config.fog_directory  = ENV['aws_s3_bucket_name']
  # config.fog_public     = false
  # config.fog_attributes = { cache_control: "public, max-age=#{365.day.to_i}" }
end
