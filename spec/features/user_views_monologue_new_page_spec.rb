require 'rails_helper'

feature 'user visits monologue new page' do
  context 'as a user I want to vist the monologue new page' do
    let!(:user) { FactoryGirl.create(:user) }

    scenario 'so that I can view a form for uploading a monologue' do
      visit root_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'
      click_button 'Add A New Monologue'

      expect(page).to have_css("form")
      expect(page).to have_content("Upload Your Monologue!")
      expect(page).to_not have_content("#{user.first_name}'s Profile")
    end
  end
end
