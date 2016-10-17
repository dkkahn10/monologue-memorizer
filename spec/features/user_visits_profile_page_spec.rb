require 'rails_helper'

feature 'user visits profile page' do
  context 'as an authenticated user I want to visit my profile page' do
  let!(:user) { FactoryGirl.create(:user) }

    scenario 'so that I know that I am signed in' do
      visit root_path
      click_link 'Sign In'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'

      expect(page).to have_content("#{user.first_name}'s Profile")
      expect(page).to have_content("Welcome back! It's time to memorize!")
      expect(page).to have_content('Sign Out')
    end
  end
end
