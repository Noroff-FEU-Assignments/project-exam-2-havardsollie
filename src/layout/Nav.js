import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import AuthContext from "../context/AuthContext";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import logo from "../assets/caffeine_logo.png";
import { BsPersonCircle, BsPeople, BsDoorOpen } from "react-icons/bs";

function Navigate() {
  const [auth, setAuth] = useContext(AuthContext);
  const navigate = useNavigate();

  function logout() {
    setAuth(null);
    navigate("/login");
  }

	return (
		<Navbar bg="light" expand="lg">
      <Container>
        <Navbar.Brand href="/" className="logo">
          <img
            src={logo}
            width="auto"
            height="100px"
            alt="Caffeine logo"
          />
          <h1>Caffeine</h1>
        </Navbar.Brand>
        <div class="vr"></div>
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
        {auth ? (
          <>
          <div className="nav-middle">
            <div className="navLink">
            <Nav.Link>
              <Link to="/allprofiles"><BsPeople />
              <h5>All profiles</h5>
              </Link>
              </Nav.Link>
            </div>
            <div className="navLink">
            <Nav.Link>
              <Link to={`/profile/${auth.name}`}><BsPersonCircle />
              <h5>My profile</h5>
              </Link>
              </Nav.Link>
            </div>
          </div>
          <div className="nav-right">
            <Nav.Link><BsDoorOpen className="logOut" onClick={logout} /></Nav.Link>
          </div>
          </>
          ) : (
          <>
            <Nav.Link><Link to="/login">Login</Link></Nav.Link><Nav.Link><Link to="/register">Register</Link></Nav.Link>
          </>
        )}
		  </Nav>
      </Navbar.Collapse>
      </Container>
    </Navbar>
	);
}

export default Navigate;