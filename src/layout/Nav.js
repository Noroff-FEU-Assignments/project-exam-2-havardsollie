import { Link } from "react-router-dom";
import { useContext } from "react";
// import AuthenticatedNav from "./AuthNav";
import AuthContext from "../context/AuthContext";
import { useNavigate } from "react-router-dom";

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';

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
      <Navbar.Toggle aria-controls="basic-navbar-nav" />
      <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="me-auto">
			{auth ? (
				<>
					<Link to="/feed">Feed</Link> 
          {/* | <Link to="/feed">Feed</Link> */}
          | <button onClick={logout}>Log out</button>
				</>
			) : (
				<>
          <Link to="/login">Login</Link><Link to="/register">Register</Link>
        </>
			)}
		          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
	);
}

export default Navigate;