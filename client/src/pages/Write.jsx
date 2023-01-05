import React, { useEffect, useState, useContext } from "react";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import axios from "axios";
import moment from "moment";
import { useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/authContext";

export const Write = () => {
  const state = useLocation().state;
  console.log(state);
  const [title, setTitle] = useState(state?.title || "");
  const [value, setValue] = useState(state?.description || "");
  const [file, setFile] = useState(state?.img || "");
  // const [file,setFile] = useState("")

  const [category, setCategory] = useState(state?.category || "");

  const navigate = useNavigate();
  const { currentUser } = useContext(AuthContext);

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await axios.post(
        "http://localhost:5000/api/uploads",
        formData
      );
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const handleClick = async (e) => {
    e.preventDefault();
    console.log("sfsd", file);
    let imgUrl = "";
    if (file) {
      imgUrl = await upload();
    }

    try {
      state
        ? await axios.put(
            `http://localhost:5000/api/posts/${state.id}`,
            {
              title,
              description: value,
              category,
              uid: currentUser.id,
              img: file ? imgUrl : "",
            },
            { withCredentials: true }
          )
        : await axios.post(
            `http://localhost:5000/api/posts`,
            {
              title,
              description: value,
              category,
              uid: currentUser.id,
              img: file ? imgUrl : "",
              date: moment(Date.now()).format("YYYY-MM-DD HH:mm:ss"),
            },
            { withCredentials: true }
          );

      navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add">
      <div className="content">
        <input
          type="text"
          placeholder="Title"
          onChange={(e) => setTitle(e.target.value)}
          value={title}
        />

        <div className="editorContainer">
          <ReactQuill
            className="editor"
            theme="snow"
            value={value}
            onChange={setValue}
          />
        </div>
      </div>
      <div className="menu">
        <div className="side-item">
          <h1>Publish</h1>
          <span>
            <b>Status:</b>Draft
          </span>
          <span>
            <b>Visibility:</b>Public
          </span>
          <input
            type="file"
            id="fileUpload"
            style={{ display: "none" }}
            onChange={(e) => {
              setFile(e.target.files[0]);
            }}
            name="photo"
          />
          <label htmlFor="fileUpload" id="upload-file" name="photo">
            Upload Img
          </label>

          <div className="buttons">
            <button>Save as Draft</button>
            <button onClick={handleClick}>Publish</button>
          </div>
        </div>

        <div className="side-item">
          <h1>Category</h1>

          <div>
            <input
              type="radio"
              name="category"
              value="art"
              id="art"
              checked={category === "art"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="art">Art</label>
          </div>

          <div>
            <input
              type="radio"
              name="category"
              value="technology"
              id="technology"
              checked={category === "technology"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="technology">Technology</label>
          </div>

          <div>
            <input
              type="radio"
              name="category"
              value="food"
              id="food"
              checked={category === "food"}
              onChange={(e) => setCategory(e.target.value)}
            />
            <label htmlFor="food">Food</label>
          </div>
        </div>
      </div>
    </div>
  );
};
