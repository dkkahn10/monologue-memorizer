require 'rails_helper'

feature 'user uploads a new monologue' do
  context 'as a user I want to vist the monologue new page' do
    let!(:user) { FactoryGirl.create(:user) }
    let!(:monologue) { FactoryGirl.create(:monologue, user_id: user) }

    scenario 'so that I can upload a monologue successfully' do
      visit root_path
      click_link 'Sign In'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'
      click_link 'Add A New Monologue'
      fill_in 'Title Of Play', with: monologue.play_title
      fill_in 'Character', with: monologue.character
      fill_in 'Genre', with: monologue.genre
      fill_in 'Page Number', with: monologue.page_number
      attach_file 'user_monologue_text_file', "#{Rails.root}/spec/support/files/monologue_test.docx"
      click_button 'Add A Monologue'

      expect(page).to have_content('You uploaded a new monologue! Congratulations!')
      expect(page).to have_content(monologue.play_title)
      expect(page).to have_content(monologue.page_number)
    end

    scenario 'so that I can upload a monologue unsuccessfully' do
      visit root_path
      click_link 'Sign In'
      fill_in 'Email', with: user.email
      fill_in 'Password', with: user.password
      click_button 'Sign In'
      click_link 'Add A New Monologue'
      click_button 'Add A Monologue'

      expect(page).to have_content('missing required')
      expect(page).to_not have_content('You uploaded a new monologue! Congratulations!')
      expect(page).to_not have_content(monologue.play_title)
      expect(page).to_not have_content(monologue.page_number)
    end
  end
end
