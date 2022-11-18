import { Link } from "react-router-dom";
import { useContext, useState } from "react";
// import AuthenticatedNav from "./AuthNav";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import { Button } from "react-bootstrap";
import logo from "../assets/caffeine_logo.png";
import { BsPersonCircle } from "react-icons/bs";
import { BsPeople } from "react-icons/bs";

function Navigate() {

  const [auth, setAuth] = useContext(AuthContext);
  // const [isHovering, setIsHovering] = useState(false);
  const navigate = useNavigate();

  // const handleMouseOver = () => {
  //   setIsHovering(true);
  // };

  // const handleMouseOut = () => {
  //   setIsHovering(false);
  // };

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
          <Nav.Link><Link to="/allprofiles"><BsPeople /></Link></Nav.Link>
					<Nav.Link><Link to={`/profile/${auth.name}`}><BsPersonCircle /></Link></Nav.Link>
        </div>
        <div>
          <Button variant="outline-secondary" className="newPost" onClick={logout}>Log out</Button>
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