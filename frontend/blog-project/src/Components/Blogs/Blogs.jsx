import { useState, useEffect } from "react";
import { CiClock2 } from "react-icons/ci";
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

  const addBlogPost = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:8000/api/blogs", {
        title,
        body,
      });

      console.log("response", response);

      // Fetch the updated list of blogs from the server
      const updatedBlogs = await axios.get("http://localhost:8000/api/blogs");

      // Update state with the updated list of blogs
      setBlogs(updatedBlogs.data);

      // Clear the input fields
      setTitle("");
      setBody("");
    } catch (error) {
      console.error("Error adding blog post:", error);
    }
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

  return (
    <>
      <div className=" w-1/2 mx-auto">
        <h2 className="text-6xl font-bold text-offWhite text-center mb-4">My Latest Posts</h2>
        <div className=" grid grid-cols-3 gap-4">
          {blogs.map((blog) => (
            <div key={blog.id} className="bg-offWhite w-[400px] h-[400px] relative rounded">
              <h3 className="text-xl font-bold text-charcoal">{blog.title}</h3>
              <p className="text-lg font-thin text-charcoal">{blog.body}</p>
              <p className="text-lg font-bold text-warmGray">ID: {blog.id}</p>
              <div className=" absolute flex w-[190px] justify-between items-center left-[200px] top-[380px] text-warmGray">
                <p>DATE</p>
                <div className=" flex items-center">
                  <CiClock2 className=" mr-2" />
                  <p>5 min read</p>
                </div>
              </div>
            </div>
          ))}
        </div>
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
