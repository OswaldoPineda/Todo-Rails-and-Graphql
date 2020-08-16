# frozen_string_literal: true

class User < ActiveRecord::Base
    devise :database_authenticatable,
         :registerable,
         :recoverable,
         :rememberable

  include GraphqlDevise::Concerns::Model

  validates :name, presence: true

  def valid_for_authentication?
    auth_available && super
  end

  def do_something
    'Nothing to see here!'
  end
end
