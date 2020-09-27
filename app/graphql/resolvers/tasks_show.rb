# frozen_string_literal: true

module Resolvers
  class TasksShow < GraphQL::Schema::Resolver
    type [ Types::TaskType ], null: false

    argument :id, String, required: true

    def resolve(id:)
      List.find(id).tasks
    end
  end
end
