const listHelper = require('../utils/list_helper')

describe('Most likes', () => {
  const blogList = [
    {
      title: "Elämäm käpyjä",
      author: "Teijuli",
      url: "elamankapyja.blogit.fi",
      likes: 30,
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
      likes: 100,
      id: '5f332aa71b125a91c6c414b4'
    }
  ]

  test('returns author with most likes', () => {
    const expected = { author: 'Rinna', likes: 120 }
    const result = listHelper.mostLikes(blogList)
    expect(result.author).toBe(expected.author)
    expect(result.likes).toBe(expected.likes)
  })
})