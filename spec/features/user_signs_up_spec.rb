require 'rails_helper'

feature 'user signs up' do
  context 'as an authenticated user I want to sign up' do

    scenario 'user specifies all required information' do
      visit root_path
      click_link 'Sign Up'
      fill_in 'First Name', with: 'Link'
      fill_in 'Last Name', with: 'Courage'
      fill_in 'Email', with: 'link@hyrulecastle.com'
      fill_in 'Password', with: 'zelda1212'
      fill_in 'Password Confirmation', with: 'zelda1212'
      click_button 'Sign Up'

      expect(page).to have_content("You've made it!")
      expect(page).to have_content("Sign Out")
    end

    scenario 'user does not fill out all required information' do
      visit root_path
      click_link 'Sign Up'
      click_button 'Sign Up'

      expect(page).to have_content("can't be blank")
      expect(page).to_not have_content("Sign Out")
    end

    scenario 'password does not match password confirmation' do
      visit root_path
      click_link 'Sign Up'
      fill_in 'Password', with: 'zelda1212'
      fill_in 'Password Confirmation', with: 'imahero1212'
      click_button 'Sign Up'

      expect(page).to have_content("doesn't match")
      expect(page).to_not have_content("Sign Out")
    end
  end
end
