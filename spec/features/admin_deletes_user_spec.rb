require 'rails_helper'

feature 'admin deletes user' do
  let!(:user) { FactoryGirl.create(:user, role: 'admin') }
  let!(:user2) { FactoryGirl.create(:user, first_name: 'Noah') }
  context 'as a admin I want to login and visit the user index page' do
    scenario 'and see a button for deleting a user' do
      visit root_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'
      click_link 'All Users'

      expect(page).to have_button("Delete User")
      expect(page).to have_content('Noah')
      expect(page).to have_content('All Users')
    end
    scenario 'and delete a user' do
      visit root_path
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'
      click_link 'All Users'
      click_button "#{user2.id}"

      expect(page).to have_content('All Users')
      expect(page).to_not have_content('Noah')
    end
  end

  context 'as a member I want to login and visit the user index page' do
    scenario 'and not see a button for deleting another user' do
      visit root_path
      fill_in 'Email', with: user2.email
      fill_in 'Password', with: user2.password
      click_button 'Sign In'
      click_link 'All Users'

      expect(page).to_not have_button("#{user.id}")
    end
  end
end
