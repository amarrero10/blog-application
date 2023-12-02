import "./App.css";
import { useState, useEffect } from "react";
import axios from "axios";

function App() {
  const [blogs, setBlogs] = useState([{}]);
  const [title, setTitle] = useState("");
  const [body, setBody] = useState("");

  useEffect(() => {
    axios.get("http://localhost:8000/api/blogs").then((res) => {
      setBlogs(res.data);
    });
  }, []);

  const addBlogPost = (e) => {
    e.preventDefault();
    axios
      .post("http://localhost:8000/api/blogs", {
        title,
        body,
      })
      .then((res) => {
        setBlogs([...blogs, res.data]);
      });
    setTitle("");
    setBody("");
  };

  // const editBlogPost = (title, data) => {
  //   axios
  //     .put(`http://localhost:8000/api/blogs/${title}`, {
  //       data,
  //     })
  //     .then((res) => {
  //       setBlogs([...blogs, res.data]);
  //     });
  //   setBody("");
  // };

  console.log("blogs", blogs);

  return (
    <>
      <h1 className="text-3xl font-bold underline text-red-400">Hello world! FARM STACK!</h1>
      <div>
        <h2 className="text-2xl font-bold text-blue-400">Blogs</h2>
        {blogs.map((blog) => (
          <div key={blog.id}>
            <h3 className="text-xl font-bold text-green-400">{blog.title}</h3>
            <p className="text-lg font-bold text-gray-400">{blog.body}</p>
          </div>
        ))}
      </div>
      <form onSubmit={addBlogPost}>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="title">
            Title
          </label>
          <input
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            type="text"
            placeholder="Title"
          />
        </div>
        <div className="mb-4">
          <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="body">
            Body
          </label>
          <textarea
            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            value={body}
            onChange={(e) => setBody(e.target.value)}
            type="text"
            placeholder="Body"
          />
        </div>
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
          type="submit"
        >
          Add Blog
        </button>
      </form>
    </>
  );
}

export default App;
