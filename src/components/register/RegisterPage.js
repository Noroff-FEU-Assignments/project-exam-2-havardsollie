import RegisterForm from "./Register";
import logo from "../../assets/caffeine_logo.png"
import { Card } from "react-bootstrap";

export default function RegisterPage() {
	return (
			<div className="formPage">
				<Card.Img src={logo} />
				<hr />
				<div className="welcomeText">
				<h2>Welcome to</h2><h1>Caffeine</h1>
				</div>
      	<hr />
				<RegisterForm />
			</div>
	);
}