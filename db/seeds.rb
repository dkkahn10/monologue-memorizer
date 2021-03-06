# This file should contain all the record creation needed to seed the database with its default values.
# The data can then be loaded with the rails db:seed command (or created alongside the database with db:setup).
#
# Examples:
#
#   movies = Movie.create([{ name: 'Star Wars' }, { name: 'Lord of the Rings' }])
#   Character.create(name: 'Luke', movie: movies.first)

dustin = User.create(email: 'dustinkahn@dustin.com', password: 'dustin', first_name: 'Dustin', last_name: 'Kahn', role: 'admin')

noah = User.create(email: 'noah@noah.com', password: 'noah101', first_name: 'Noah', last_name: 'Milstein', role: 'member')

nick = User.create(email: 'nick@nick.com', password: 'nick101', first_name: 'Nick', last_name: 'Alberts', role: 'member')
