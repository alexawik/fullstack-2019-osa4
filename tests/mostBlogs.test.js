const listHelper = require('../utils/list_helper')

describe('Most blogs', () => {
  const blogList = [
    {
      title: "Elämäm käpyjä",
      author: "Teijuli",
      url: "elamankapyja.blogit.fi",
      likes: 300,
      id: "5dcbf27320f27f0c38e2a90a"
    },
    {
      title: "Parhaat vesitornit",
      author: "Rinna",
      url: "vesitornit.blogit.fi",
      likes: 20,
      id: "5dcbfff2c206a91c6c414a52"
    },
    {
      title: 'Go To Statement Considered Harmful',
      author: 'Edsger W. Dijkstra',
      url: 'http://www.u.arizona.edu/~rubinson/copyright_violations/Go_To_Considered_Harmful.html',
      likes: 5,
      id: '5a422aa71b54a676234d17f8'
    },
    {
      title: 'Parhaat tähtitornit',
      author: 'Rinna',
      url: 'tahdistoon.blogit.fi',
      likes: 10,
      id: '5f332aa71b125a91c6c414b4'
    }
  ]

  test('returns author with most blogs', () => {
    const expected = { author: 'Rinna', blogs: 2 }
    const result = listHelper.mostBlogs(blogList)
    expect(result.author).toBe(expected.author)
    expect(result.blogs).toBe(expected.blogs)
  })
})