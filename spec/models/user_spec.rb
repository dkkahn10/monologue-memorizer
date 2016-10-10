require 'rails_helper'

RSpec.describe User, type: :model do
  it { should have_valid(:first_name).when('Link', 'Zelda') }
  it { should_not have_valid(:first_name).when(nil, '') }

  it { should have_valid(:last_name).when('Courage', 'Wisdom') }
  it { should_not have_valid(:last_name).when(nil, '') }

  it { should have_valid(:email).when('link@hyrulecastle.com', 'zelda@hyrulecastle.com') }
  it { should_not have_valid(:email).when(nil, '', 'lidns', 'hyrulecastle.com') }

  it 'has a matching password confirmation for the password' do
    user = User.new
    user.password = 'zelda1212'
    user.password_confirmation = 'imthehero1212'

    expect(user).to_not be_valid
    expect(user.errors[:password_confirmation]).to_not be_blank
  end
end
