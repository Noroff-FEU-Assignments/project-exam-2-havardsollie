// import Heading from "../layout/Heading";
import LoginForm from "./Login";
import logo from "../../assets/caffeine_logo.png"
import { Card } from "react-bootstrap";

export default function LoginPage() {
	return (
		<div className="formPage">
			<Card.Img src={logo} />
      <hr />
			<LoginForm />
		</div>
	);
}