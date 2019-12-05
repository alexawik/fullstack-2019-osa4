const mongoose = require('mongoose')
const supertest = require('supertest')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

const initialBlogs = [
  {
    title: "Parhaat vesitornit",
    author: "Rinna",
    url: "vesitornit.blogit.fi",
    likes: 20
  },
  {
    title: 'Go To Statement Considered Harmful',
    author: 'Edsger W. Dijkstra',
    url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
    likes: 5
  }
]

beforeEach(async () => {
  await Blog.deleteMany({})

  let blogObject = new Blog(initialBlogs[0])
  await blogObject.save()

  blogObject = new Blog(initialBlogs[1])
  await blogObject.save()
})

test('blogs returned as json', async () => {
  await api
    .get('/api/blogs')
    .expect(200)
    .expect('Content-type', /application\/json/)
})

test('all blogs are returned', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

test('Identifier defined as id', async () => {
  const response = await api.get('/api/blogs')
  expect(response.body[0].id).toBeDefined()
})

test('blog can be added', async () => {
  const newBlog = {
    title: 'That rug really tied the room together',
    author: 'The Dude',
    url: 'lebowski.interiors.com',
    likes: 157,
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)
    .expect('Content-Type', /application\/json/)

  const response = await api.get('/api/blogs')
  
  expect(response.body.length).toBe(initialBlogs.length + 1)
})

test('likes given value 0 if empty', async () => {
  const newBlog = {
    title: 'Tykkääjät tykkää',
    author: 'Keekki',
    url: 'http://heitterit.heittaa.com',
    likes: null
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(200)

  const response = await api.get('/api/blogs')
  const addedBlog = response.body[response.body.length - 1]

  expect(addedBlog.likes).toBe(0)
})

test('blog without title and url cannot be added', async () => {
  const newBlog = {
    title: null,
    author: 'John Doe',
    url: null,
    likes: 1
  }

  await api
    .post('/api/blogs')
    .send(newBlog)
    .expect(400)

  const response = await api.get('/api/blogs')
  expect(response.body.length).toBe(initialBlogs.length)
})

afterAll(() => {
  mongoose.connection.close()
})