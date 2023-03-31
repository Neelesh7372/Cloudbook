import React, {useEffect} from "react";
import {Link, useLocation, useNavigate} from "react-router-dom";

const Navbar = (props) => {
  let location = useLocation();
  let navigate = useNavigate(); 

  const handleLogout=()=>{
    localStorage.removeItem('token');
    navigate('/login');
    props.showAlert("Logged out Successfully!","success");
  }
  useEffect(() => {
  }, [location]);

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark">
      <div className="container-fluid">
        <Link className="navbar-brand" to="/">
          CloudBook
        </Link>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/home"?"active":""}`} aria-current="page" to="/home">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className={`nav-link ${location.pathname==="/about"?"active":""}`} to="/about">
                About
              </Link>
            </li>
          </ul>
          <form className="d-flex" role="search">
            <input
              className="form-control me-2"
              type="search"
              placeholder="Search"
              aria-label="Search"
            />
            <button className="btn btn-outline-primary mx-1" type="submit">
              Search
            </button>
            </form>

            {!localStorage.getItem('token')?
            <div className="d-flex">
            <Link className="btn btn-outline-primary mx-1" to="/login" role="button">Login</Link>
            <Link className="btn btn-outline-primary mx-1" to="/Signup" role="button">Signup</Link>
            </div>:
            <button onClick={handleLogout} className="btn btn-primary">Logout</button>
            }
        </div>
      </div>
    </nav>
  );
};
export default Navbar;