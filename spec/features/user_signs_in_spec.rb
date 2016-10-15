require 'rails_helper'

feature 'user signs in' do
  context 'as an authenticated user I want to be able to sign in' do
    let!(:user) { FactoryGirl.create(:user) }

    scenario 'an existing user specifies a valid email and password' do
      visit root_path
      click_link 'Sign In'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'

      expect(page).to have_content("Welcome back! It's time to memorize!")
      expect(page).to have_content('Sign Out')
    end

    scenario 'a user specifies an invalid email and password' do
      visit root_path
      click_link 'Sign In'
      fill_in 'Email', with: 'ganon@thekingofhyrule.com'
      fill_in 'Password', with: 'shadowrealm'
      click_button 'Sign In'

      expect(page).to have_content('Invalid')
      expect(page).to_not have_content("Welcome back! It's time to memorize!")
      expect(page).to_not have_content('Sign Out')
    end

    scenario 'an existing email with an invalid password throws an error' do
      visit root_path
      click_link 'Sign In'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: 'ilovezant123'
      click_button 'Sign In'

      expect(page).to have_content('Invalid')
      expect(page).to_not have_content('Sign Out')
    end

    scenario 'an already authenticated user cannot sign in again' do
      visit new_user_session_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'

      expect(page).to have_content('Sign Out')
      expect(page).to_not have_content('Sign In')

      visit new_user_session_path
      expect(page).to have_content('You are already signed in')
    end

    scenario 'an authenticated user can sign out' do
      visit new_user_session_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'
      click_link 'Sign Out'

      expect(page).to have_content('Sign In')
      expect(page).to_not have_content('Sign Out')
    end
  end
end
