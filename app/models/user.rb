class User < ApplicationRecord
  mount_uploader :profile_photo, ProfilePhotoUploader
  has_one :profile, dependent: :destroy
  has_many :monologues

  validates :first_name, presence: true
  validates :last_name, presence: true

  # Include default devise modules. Others available are:
  # :confirmable, :lockable, :timeoutable and :omniauthable
  devise :database_authenticatable, :registerable,
         :recoverable, :rememberable, :trackable, :validatable

  after_create :create_profile

  private

  def create_profile
    build_profile
    true
  end
end
