# frozen_string_literal: true

module Mutations
  class CreateTask < GraphQL::Schema::Mutation
    argument :list_id, String, required: true
    argument :title, String, required: true
    argument :description, String, required: false

    type Types::TaskType

    def resolve(list_id:, title:, description:)
      newTask = Task.new(list_id: list_id, title: title, description: description)
      if newTask.valid?
        newTask.save!

        newTask
      end
    end
  end
end
