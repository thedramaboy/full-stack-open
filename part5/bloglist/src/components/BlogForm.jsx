import { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const addBlog = (event) => {
    event.preventDefault()
    createBlog({
      title: title,
      author: author,
      url: url,
    })
    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>create a new blog</h2>
        <p>
          title:{' '}
          <input
            type="text"
            value={title}
            placeholder='titleInput'
            onChange={({ target }) => setTitle(target.value)}
          />
        </p>
        <p>
          author:{' '}
          <input
            type="text"
            value={author}
            placeholder='authorInput'
            onChange={({ target }) => setAuthor(target.value)}
          />
        </p>
        <p>
          url:{' '}
          <input
            type="text"
            value={url}
            placeholder='urlInput'
            onChange={({ target }) => setUrl(target.value)}
          />
        </p>
      </div>
      <button type="submit">create</button>
    </form>
  )
}

export default BlogForm
