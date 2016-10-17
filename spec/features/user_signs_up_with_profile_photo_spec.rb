require 'rails_helper'

feature 'user uploads a profile photo upon signing up' do
  context 'as an authenticated user I want to visit the sign up page' do
    let!(:user) { FactoryGirl.create(:user) }

    scenario 'so that I can upload a profile photo' do
      visit root_path
      click_link 'Sign Up'
      fill_in 'First Name', with: 'Link'
      fill_in 'Last Name', with: 'Courage'
      fill_in 'Email', with: 'link@hyrulecastle.com'
      fill_in 'Password', with: 'zelda1212'
      fill_in 'Password Confirmation', with: 'zelda1212'
      attach_file 'user_profile_photo', "#{Rails.root}/spec/support/images/Wakerlink.jpg"
      click_button 'Sign Up'

      expect(page).to have_xpath("//img[contains(@src, 'Wakerlink.jpg')]")
      expect(page).to have_content("You've made it!")
      expect(page).to have_content("Sign Out")
    end

    context 'so that I can sign up' do
      scenario 'and see my default profile photo' do
        visit root_path
        click_link 'Sign Up'
        fill_in 'First Name', with: 'Link'
        fill_in 'Last Name', with: 'Courage'
        fill_in 'Email', with: 'link@hyrulecastle.com'
        fill_in 'Password', with: 'zelda1212'
        fill_in 'Password Confirmation', with: 'zelda1212'
        click_button 'Sign Up'

        expect(page).to have_xpath("//img[contains(@src, 'default.jpg')]")
        expect(page).to have_content("You've made it!")
        expect(page).to have_content("Sign Out")
      end
    end
  end
end
