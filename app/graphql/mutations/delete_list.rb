# frozen_string_literal: true

module Mutations
  class DeleteList < GraphQL::Schema::Mutation
    argument :list_id, String, required: true

    type Types::TaskType

    def resolve(list_id:)
      list = List.find(list_id)
      if list
        list.destroy

       list
      end
    end
  end
end

