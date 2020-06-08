user1 = User.create(email: 'jason@email.com', username: 'jasonHayes', first_name: 'Jason', last_name: 'Hayes', password: '123456')
user2 = User.create(email: 'vivian@email.com', username: 'veeveeanne', first_name: 'Vivian', last_name: 'Wang', password: '123456', channel: user1)
user3 = User.create(email: 'chai@email.com', username: 'chaiTheCat', first_name: 'Chai', last_name: 'Wang', password: '123456', channel: user1)
user4 = User.create(email: 'earlgrey@email.com', username: 'earlGreyTheCat', first_name: 'Earl Grey', last_name: 'Wang', password: '123456', channel: user1)
