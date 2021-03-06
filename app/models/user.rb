class User < ApplicationRecord
  mount_uploader :profile_photo, ProfilePhotoUploader
  has_many :monologues

  validates :first_name, presence: true
  validates :last_name, presence: true
  validates :role, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  def admin?
    role == "admin"
  end

end
