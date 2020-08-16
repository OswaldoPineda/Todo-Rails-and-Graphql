class AddAuthAvailableToUsers < ActiveRecord::Migration[6.0]
  def change
    add_column :users, :auth_available, :boolean, null: false, default: true
  end
end
