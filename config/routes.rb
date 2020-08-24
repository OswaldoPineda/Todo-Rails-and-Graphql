Rails.application.routes.draw do
  mount_graphql_devise_for 'User', at: '/graphql_auth', operations: {
    sign_up: Mutations::SignUp,
    login:   Mutations::Login
  }
  # mount_graphql_devise_for 'User', at: 'graphql_auth'
  if Rails.env.development?
    mount GraphiQL::Rails::Engine, at: "/graphiql", graphql_path: "/graphql"
  end

  get "*page", to: "home#index", constrains: ->(req) do
    !req.xhr? && requ.format.html?
  end

  post "/graphql", to: "graphql#execute"
  root to: 'home#index'
  # For details on the DSL available within this file, see https://guides.rubyonrails.org/routing.html
end
