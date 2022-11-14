// import Heading from "../layout/Heading";
import RegisterForm from "./Register";
import logo from "../../assets/caffeine_logo.png"
import { Card } from "react-bootstrap";

export default function RegisterPage() {
	return (
			<div className="formPage">
				<Card.Img src={logo} />
      	<hr />
				<RegisterForm />
			</div>
	);
}