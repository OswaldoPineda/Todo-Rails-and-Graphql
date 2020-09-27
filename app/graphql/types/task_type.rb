# frozen_string_literal: true

module Types
  class TaskType < GraphQL::Schema::Object
    field :id,            Int,    null: false
    field :title,         String, null: false
    field :description,   String, null: true
  end
end
