# frozen_string_literal: true

module Types
  class ListType < GraphQL::Schema::Object
    field :id,            Int,    null: false
    field :name,         String, null: false
  end
end
