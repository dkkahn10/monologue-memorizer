require 'rails_helper'

feature 'user adds a profile photo after signing up' do
  context 'as a user I visit my edit profile page' do
    let!(:user) { FactoryGirl.create(:user) }

    scenario 'so that I can upload a new profile photo' do
      visit root_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'
      click_link 'Profile'
      click_link 'Edit Profile'

      fill_in 'Current password', with: user.password
      attach_file 'user_profile_photo', "#{Rails.root}/spec/support/images/Wakerlink.jpg"
      click_button 'Update'

      expect(page).to have_xpath(
        "//img[contains(@src,'Wakerlink.jpg')]"
      )
    end
  end
end
