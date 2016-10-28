require 'rails_helper'

feature 'user visits user index' do
  context 'as an authenticated user I want to be able to sign in' do
    let!(:user) { FactoryGirl.create(:user) }
    let!(:user2) { FactoryGirl.create(:user, first_name: 'Noah')}

    scenario 'and view a link to see all users' do
      visit root_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'

      expect(page).to have_content("Welcome back! It's time to memorize!")
      expect(page).to have_content('All Users')
    end

    scenario 'and view a list of all users' do
      visit root_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'
      click_link 'All Users'

      expect(page).to have_content("All Users")
      expect(page).to have_content("Noah")
    end
  end
end
