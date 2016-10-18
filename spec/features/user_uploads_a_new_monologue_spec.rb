require 'rails_helper'

feature 'user uploads a new monologue' do
  context 'as a user I want to vist the monologue new page' do
    let!(:user) { FactoryGirl.create(:user) }

    scenario 'so that I can upload a monologue successfully' do
      visit root_path
      click_link 'Sign In'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'
      click_link 'Add A New Monologue'
      fill_in 'Title Of Play', with: "Brighton Beach Memoirs"
      fill_in 'Character', with: "Eugene"
      fill_in 'Genre', with: "Dramedy"
      fill_in 'Page Number', with: 35
      attach_file 'monologue_text_file', "#{Rails.root}/spec/support/files/monologue_test.txt"
      click_button 'Add A Monologue'
      save_and_open_page

      expect(page).to have_content('You uploaded a new monologue! Congratulations!')
      expect(page).to have_content("Brighton Beach Memoirs")
      expect(page).to have_content(35)
    end

    scenario 'so that I can upload a monologue unsuccessfully' do
      visit root_path
      click_link 'Sign In'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'
      click_link 'Add A New Monologue'
      click_button 'Add A Monologue'

      expect(page).to have_content("can't be blank")
      expect(page).to_not have_content('You uploaded a new monologue! Congratulations!')
      expect(page).to_not have_content("Brighton Beach Memoirs")
      expect(page).to_not have_content(35)
    end
  end
end
