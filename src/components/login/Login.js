// import { displayMessage } from "./utils/displayMessage.js";
// import { saveTokenKey, saveThisUser } from "./settings/storage.js";
// import menu from "./utils/createMenu.js";
import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
import FormError from "../../common/FormError";
import { BASE_URL } from "../../api/Api";
import AuthContext from "../../context/AuthContext";
import logo from "../../assets/caffeine_logo.png";
import Form from 'react-bootstrap/Form';
import Card from "react-bootstrap/Card";
import { Button } from "react-bootstrap";


// const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
	email: yup.string().required("Please enter your stud.noroff.no address").email("Please enter valid email address"),
	password: yup.string().required("Please enter your password").min(8, "Must be at least 8 characters"),
});

export default function LoginForm() {
  const [auth, setAuth] = useContext(AuthContext);
	const [submit, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

  const navigate = useNavigate();

  async function doLogin(schema) {
    const options = {
      method: "POST",
      body: JSON.stringify(schema),
      headers: {
        'Content-Type': 'application/json',
        // Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
      },
    }

      setSubmitting(true);
      setLoginError(null);

      try {
          const response = await fetch(`${BASE_URL}/social/auth/login`, options)
          const data = await response.json();
          setLoginError("Invalid email or password");
          console.log(data)

          if (data.status) {
            return <FormError>{loginError}</FormError>         
          } else {
            setAuth(data);
            navigate("/"); 
          }

        } catch (error) {
          console.log("Error:" + error);
        } finally {
          setSubmitting(false);
        }
      }

        // if (json.error) {
        //     displayMessage("warning", "Invalid login details", ".message-container");
        // }

        return (
          <>
          <Form className="enterForm">
              <fieldset disabled={submit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <input
                    {...register("email")}
                    placeholder="Email"
                    required />
                  {errors.email && <FormError>{errors.email.message}</FormError>}
                </Form.Group>

                <hr />
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <input
                    {...register("password")}
                    placeholder="Password"
                    type="password"
                    required />
                  {errors.password && <FormError>{errors.password.message}</FormError>}
                </Form.Group>
                <hr />
                {loginError && <FormError>{loginError}</FormError>}
                <Button variant="outline-secondary" className="newPost" onClick={handleSubmit(doLogin)}>{submit ? "Brewing coffee..." : "Login"}</Button>
              </fieldset>
            </Form>
            </>
        );

}