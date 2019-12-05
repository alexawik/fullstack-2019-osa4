const dummy = (blogs) => {
  
  return 1
}

const totalLikes = (blogs) => {
  const reducer = (sum, item) => {
    return sum + item
  }
  return blogs.length === 0
    ? 0
    : blogs.map(blog => blog.likes).reduce(reducer, 0)

}

const favoriteBlog = (blogs) => {
  const likes = blogs.map(blog => blog.likes)
  const favorite = likes.indexOf(Math.max(...likes))

  return blogs[favorite]
}

const mostBlogs = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  function mostFrequent(array) {
    return array.sort((a,b) => 
      array.filter(auth => auth===a).length
    - array.filter(auth => auth===b).length 
    ).pop()
  }

  const authorWithMost = mostFrequent(authors)
  const numberOfBlogs = (blogs.filter(blog => blog.author.includes(authorWithMost))).length

  const returnable = { author: authorWithMost, blogs: numberOfBlogs }

  return returnable
}

const mostLikes = (blogs) => {
  const authors = blogs.map(blog => blog.author)
  authors.filter((a,b) => authors.indexOf(a) === b)
  const likes = Array.apply(null, Array(authors.length)).map(Number.prototype.valueOf,0)

  blogs.forEach(function(blog)  {
    for (let i = 0; i < authors.length; i++) {
      if (blog.author.includes(authors[i])) 
      likes[i] = likes[i] + blog.likes       
    }   
  })

  const maxIndex = likes.indexOf(Math.max(...likes))
  const returnable = { author: authors[maxIndex], likes: likes[maxIndex]}
  
  return returnable
}

module.exports = {
  dummy,
  totalLikes,
  favoriteBlog,
  mostBlogs,
  mostLikes
}