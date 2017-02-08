#Monomemorizer

![Build Status](https://codeship.com/projects/1f4172d0-711f-0134-d1a4-4aa32a10a3f8/status?branch=master)

Monomemorizer is an app built through Ruby on Rails which allows a user to upload a monologue and store it in a database. The user is then redirected to a page built entirely out of React where they must type out their piece from memory into a form. After every press of the space bar their current string of words is compared agains those that were uploaded. Missed words are marked in red and until that word is corrected, no new text will appear under the box. Upon completion the user receives a congratulatory message and their new string becomes green. Extra features include the ability to add other user's monologues to your own profile.

[Monomemorizer](https://monomemorizer.herokuapp.com/)

##Built By:
* [Dustin Kahn](https://github.com/dkkahn10)

##Functionality:
* Users may sign up/sign in to an account
* Users may upload a new monologue via a txt file with a play title, author, character, and page number
* Users can edit uploaded monologues without having to re-upload
* Users may test their memory by typing into a form which is updated in real time
* Users may view other users and copy monologues to their own profiles

##Technologies:
* Created with Ruby on Rails
* [React](https://facebook.github.io/react/)
*	[Heroku](http://heroku.com/)
* [Devise](https://github.com/plataformatec/devise) used for user authentication/authorization
* [Carrierwave](https://github.com/carrierwaveuploader/carrierwave) and [Fog](https://github.com/fog/fog) used for image upload along with [Amazon S3](https://aws.amazon.com/s3/) image hosting
* [Materialize](http://materializecss.com/) for styling
*	[Capybara](http://jnicklas.github.io/capybara/) used for Feature testing
*	[RSPEC](https://github.com/rspec/rspec) used for Model testing
