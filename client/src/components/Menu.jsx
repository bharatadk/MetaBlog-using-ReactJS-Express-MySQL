import axios from "axios";
import React, { useEffect, useState } from "react";
import {Link} from "react-router-dom"

const Menu = ({category}) => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(`http://localhost:5000/api/posts/?category=${category}`)
        setPosts(res.data);
      } catch (err) {
        console.log(err);
      }
    };
    fetchData();
  }, [category]);



return (
    <div className="menu">
      <h1>Suggested Posts</h1>
      {posts.map((post) => (
        <div className="post" key={post.id}>
    <img src={`http://localhost:5000/uploads/${post?.img}`} alt="" />
          <h2>{post.title}</h2>
              <Link className="link" to={`/post/${post.id}`}>

              <button>Read More</button>
              </Link>
        </div>
      ))}
    </div>
  );
};

export default Menu;