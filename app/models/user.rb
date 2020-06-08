class User < ApplicationRecord
  has_many :listeners, class_name: 'User',
                       foreign_key: 'channel_id'

  belongs_to :channel, class_name: 'User', optional: true

  validates :email, presence: true, uniqueness: true
  validates :username, presence: true, uniqueness: true
  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :password, presence: true

  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :validatable
end
