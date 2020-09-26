# frozen_string_literal: true

module Mutations
  class CreateList < GraphQL::Schema::Mutation
    argument :name, String, required: true

    type Types::ListType

    def resolve(name:)
      current_user = context[:current_resource]
      newList = List.new(user_id: current_user.id, name: name)
      if newList.valid?
        newList.save!

        newList
      end
    end
  end
end
