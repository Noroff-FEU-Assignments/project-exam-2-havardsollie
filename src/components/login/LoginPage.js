// import Heading from "../layout/Heading";
import LoginForm from "./Login";
import logo from "../../assets/caffeine_logo.png"
import { Card } from "react-bootstrap";

export default function LoginPage() {
	return (
		<div className="formPage">
			<Card.Img src={logo} />
      <hr />
			<div className="welcomeText">
				<h2>Back for some</h2><h1>coffee</h1><h2>?</h2>
			</div>
      <hr />
			<LoginForm />
		</div>
	);
}