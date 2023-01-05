import React, { useEffect, useState, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import moment from "moment";
import { AuthContext } from "../context/authContext";
import DOMPurify from "dompurify";
import Menu from "../components/Menu";

export const Single = () => {
  const [post, setPost] = useState({});
  const postId = useLocation().pathname.split("/")[2];
  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/posts/${postId}`
        );
        setPost(res.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchData();
  }, [postId]);

  const handleDelete = async () => {
    try {
      await axios.delete(`http://localhost:5000/api/posts/${postId}`, {
        withCredentials: true,
      });
      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  const getText = (html) => {
    const doc = new DOMParser().parseFromString(html, "text/html");
    return doc.body.textContent;
  };

  return Object.keys(post).length !== 0 ? (
    <div className="single">
      <div className="content">
        <img src={`http://localhost:5000/uploads/${post?.img}`} alt="" />

        <div className="user">
          <img src={`http://localhost:5000/uploads/${post?.avatar}`} alt="" />

          <div className="info">
            <span>{post.username}</span>
            <p>Posted {moment(post.date).fromNow()} </p>
          </div>

          {currentUser.username === post.username && (
            <div className="edit">
              <Link to={`/write?edit=${post.id}`} state={post}>
                <img
                  src={
                    "https://thumbs.dreamstime.com/z/edit-icon-simple-vector-illustration-black-white-document-file-pencil-background-121349839.jpg"
                  }
                  alt=""
                />
              </Link>

              <img
                src={
                  "https://thumbs.dreamstime.com/b/delete-glyph-vector-line-icon-delete-icon-102291534.jpg"
                }
                alt=""
                onClick={handleDelete}
              />
            </div>
          )}
        </div>
        <h1>{post.title}</h1>
        <p
          dangerouslySetInnerHTML={{
            __html: DOMPurify.sanitize(post.description),
          }}
        ></p>
      </div>

      <Menu category={post.category} />
    </div>
  ) : (
    <div>Loading...</div>
  );
};
