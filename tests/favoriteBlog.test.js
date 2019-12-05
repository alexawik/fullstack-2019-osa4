const listHelper = require('../utils/list_helper')

describe('Favorite blog', () => {
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
    }
  ]

  test('returns blog with most likes', () => {
    const result = listHelper.favoriteBlog(blogList)
    expect(result).toEqual(blogList[0])
  })
})