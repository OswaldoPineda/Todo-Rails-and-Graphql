module Types
  class MutationType < Types::BaseObject
    # TODO: remove me
    field :test_field, String, null: false,
      description: "An example field added by the generator"

    # List Mutations
    field :create_list, resolver: Mutations::CreateList, authenticate: true,
      description: "Mutation to create a new list"

    # Task Mutations
    field :create_task, resolver: Mutations::CreateTask, authenticate: true,
      description: "Mutation to create a new Task"

    def test_field
      "Hello World"
    end
  end
end
