module Mutations
  class BaseMutation < GraphQL::Schema::RelayClassicMutation
    # Custom auth
    # field :sign_up, mutation: Mutations::SignUp

    argument_class Types::BaseArgument
    field_class Types::BaseField
    input_object_class Types::BaseInputObject
    object_class Types::BaseObject
  end
end
