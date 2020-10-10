# frozen_string_literal: true

module Mutations
  class EditList < GraphQL::Schema::Mutation
    argument :list_id, String, required: true
    argument :name,    String, required: true

    type Types::ListType

    def resolve(list_id:, name:)
      list = List.find(list_id)
      if list.update(name: name)
       list
      end
    end
  end
end

