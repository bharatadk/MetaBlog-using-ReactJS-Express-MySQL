import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";

export const Register = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [file, setFile] = useState("");

  const [err, setError] = useState(null);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData();
      formData.append("username", username);
      formData.append("email", email);
      formData.append("password", password);
      formData.append("photo", file);

      const config = { headers: { "Content-Type": "multipart/form-data" } };

      await axios.post(
        "http://localhost:5000/api/auth/register",
        formData,
        config
      );

      navigate("/login");
    } catch (err) {
      setError(err.response.data);
    }
  };

  return (
    <div className="auth">
      <h1>Register</h1>
      <form onSubmit={handleSubmit}>
        <input
          required
          type="text"
          placeholder="username"
          name="username"
          onChange={(e) => setUsername(e.target.value)}
        />
        <input
          required
          type="email"
          placeholder="email"
          name="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          required
          type="password"
          placeholder="password"
          name="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="file"
          id="fileUpload"
          style={{ display: "none" }}
          onChange={(e) => {
            setFile(e.target.files[0]);
          }}
          name="photo"
        />
        <label
          htmlFor="fileUpload"
          id="upload-file"
          style={{
            background: "lightgray",
            padding: "5px",
            border: "2px solid teal",
          }}
          name="photo"
        >
          Upload Profile Picture 🖼️
        </label>

        <button>Register</button>

        <p>{err}</p>
        <span>
          {" "}
          Do you already have an account? <Link to="/login"> Login</Link>
        </span>
      </form>
    </div>
  );
};
