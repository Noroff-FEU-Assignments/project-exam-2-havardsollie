import { Link } from "react-router-dom";

function Nav() {
	return (
		<nav>
			<Link to="/">Home</Link>
      <Link to="/contact">Contact</Link>
      <Link to="/register">Register</Link>
			<Link to="/login">Login</Link>
		</nav>
	);
}

export default Nav;