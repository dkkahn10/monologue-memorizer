require 'rails_helper'

feature 'user types out memory monologue' do
  let!(:user) { FactoryGirl.create(:user) }

  context 'as a user I want to visit the show page for a monologue' do
    scenario 'so that I can see a link to writing out a monologue from memory' do
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

      expect(page).to have_content('You uploaded a new monologue! Congratulations!')
      expect(page).to have_content("Brighton Beach Memoirs")
      expect(page).to have_content(35)
      expect(page).to have_content("Test Your Memory!")
    end

    context 'so that I can visit a link to writing out a new monologue' do
      scenario 'and submit a memory monologue successfully' do
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
        click_link 'Test Your Memory!'
        fill_in 'Memory Text', with: "I AM A MONOLOGUE!!! HEAR ME ROAR!!!!!"
        click_button 'See your results!'

        expect(page).to have_content("The results are in!")
      end

      scenario 'and submit a memory monologue without any text' do
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
        click_link 'Test Your Memory!'
        click_button 'See your results!'

        expect(page).to have_content("blank")
        expect(page).to_not have_content("I AM A MONOLOGUE HEAR ME ROAR")
        expect(page).to_not have_content("The results are in!")
      end
    end
  end
end
