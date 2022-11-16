import { Link } from "react-router-dom";
import { useContext } from "react";
// import AuthenticatedNav from "./AuthNav";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

import logo from "../assets/caffeine_logo.png";

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
          <Nav.Link><Link to="/allprofiles">All Profiles</Link></Nav.Link>
					<Nav.Link><Link to={`/profile/${auth.name}`}>My Profile</Link></Nav.Link>
        </div>
        <div>
          <button onClick={logout}>Log out</button>
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