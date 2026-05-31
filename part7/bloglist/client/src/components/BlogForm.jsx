import { useState } from "react";
import useField from "../hooks/useField";

const BlogForm = ({ createBlog }) => {
  // const [title, setTitle] = useState("");
  // const [author, setAuthor] = useState("");
  // const [url, setUrl] = useState("");
  const title = useField("text");
  const author = useField("text");
  const url = useField("text");

  const addBlog = (event) => {
    event.preventDefault();
    createBlog({
      title: title,
      author: author,
      url: url,
    });
    // setTitle("");
    title.reset();
    // setAuthor("");
    author.reset();
    // setUrl("");
    url.reset();
  };

  return (
    <form onSubmit={addBlog}>
      <div>
        <h2>create a new blog</h2>
        <p>
          title:{" "}
          <input
            type={title.type}
            value={title.value}
            placeholder="Title"
            onChange={title.onChange}
          />
        </p>
        <p>
          author:{" "}
          <input
            type={author.type}
            value={author.value}
            placeholder="Author"
            onChange={author.onChange}
          />
        </p>
        <p>
          url:{" "}
          <input
            type={url.type}
            value={url.value}
            placeholder="Url"
            onChange={url.onChange}
          />
        </p>
      </div>
      <button type="submit">create</button>
    </form>
  );
};

export default BlogForm;
