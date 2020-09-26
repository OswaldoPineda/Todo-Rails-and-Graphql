# frozen_string_literal: true

module Resolvers
  class ListsShow < GraphQL::Schema::Resolver
    type [ Types::ListType ], null: false

    argument :id, Int, required: true

    def resolve(id:)
      User.find(id).lists
    end
  end
end
