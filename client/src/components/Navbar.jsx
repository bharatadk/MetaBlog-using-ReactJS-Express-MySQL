import Logo from "../images/logo.svg";
import { Link, useNavigate } from "react-router-dom";
import { useContext, useState } from "react";
import { AuthContext } from "../context/authContext.jsx";

export const Navbar = () => {
  const navigate = useNavigate();
  const [searchInput, setSearchInput] = useState("");

  const { currentUser, logout } = useContext(AuthContext);

  const handleSearch = async () => {};

  return (
    <div className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">
            <img src={Logo} alt="logoBlog" />
          </Link>
        </div>
        <div className="links">
          <input
            className="searchbar"
            onChange={(e) => setSearchInput(e.target.value)}
          />
          <Link className="link" to={`/?search=${searchInput}`}>
            <button className="searchButton" onClick={handleSearch}>
              <h2>🔍</h2>
            </button>
          </Link>

          <Link className="link" to="/?category=art">
            <h6>ART</h6>
          </Link>
          <Link className="link" to="/?category=technology">
            <h6>TECHNOLOGY</h6>
          </Link>
          <Link className="link" to="/?category=food">
            <h6>FOOD</h6>
          </Link>

          <span>{currentUser?.username}</span>
          {currentUser.username ? (
            <span
              onClick={() => {
                logout();
                navigate("/");
              }}
            >
              Logout
            </span>
          ) : (
            <Link className="link" to="/login">
              Login
            </Link>
          )}
          <span className="write">
            <Link className="insidewrite" to="/write">
              ✍️
            </Link>
          </span>
        </div>
      </div>
    </div>
  );
};
