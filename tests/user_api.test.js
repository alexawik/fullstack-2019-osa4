const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const User = require('../models/user')
const helper = require('./test_helper')

describe('adding users into db', () => {
  beforeEach(async () => {
    await User.deleteMany({})

    const user = new User({ 
      username: 'merik',
      name: 'Meri Koo',
      password: 'dumbledore'
    })
    await user.save()
  })

  test('creating a new user with correct attributes', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'vauvahai',
      name: 'Titi Dii',
      password: 'loruloru'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(200)
      .expect('Content-Type', /application\/json/)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length + 1)

      const usernames = usersAtEnd.map(user => user.username)
      expect(usernames).toContain(newUser.username)
  })

  test('user without username is not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: '',
      name: 'Titi Dii',
      password: 'loruloru'
    }

    await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

      const usersAtEnd = await helper.usersInDb()
      expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

  test('user without password is not created', async () => {
    const usersAtStart = await helper.usersInDb()

    const newUser = {
      username: 'vauvahai',
      name: 'Titi Dii',
      password: ''
    }

    const result = await api
      .post('/api/users')
      .send(newUser)
      .expect(400)

    console.log(result.body.error)
    const usersAtEnd = await helper.usersInDb()
    expect(usersAtEnd.length).toBe(usersAtStart.length)
  })

})

afterAll(() => {
  mongoose.connection.close()
})