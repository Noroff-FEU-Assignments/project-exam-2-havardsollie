// import { displayMessage } from "./utils/displayMessage.js";
// import { saveTokenKey, saveThisUser } from "./settings/storage.js";
// import menu from "./utils/createMenu.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
import FormError from "../../common/FormError";
import { BASE_URL } from "../../api/Api";


// const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
	email: yup.string().required("Please enter your stud.noroff.no address"),
	password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
	const [submit, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

  const navigate = useNavigate();

async function doLogin(schema, event) {
  event.preventDefault();
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
        console.log(data.name, data.accessToken);
        setLoginError(data.errors[0].message);

        if (data.name) {
          navigate("/contact");
        }

        // if (data.user) {

        //     saveTokenKey(data.jwt);
        //     saveThisUser(data.user);
        // }
      } catch (error) {
        console.log(error[0]);
      } finally {
        setSubmitting(false);
      }
    }

        // if (json.error) {
        //     displayMessage("warning", "Invalid login details", ".message-container");
        // }

        return (
          <form onSubmit={handleSubmit(doLogin)}>
            {loginError && <FormError>{loginError}</FormError>}
      
            <fieldset disabled={submit}>
            <input {...register("email")} placeholder="email" required />
            {/* <p>{errors.username.message}</p> */}
            <br />
      
            <input
              {...register("password")}
              placeholder="password"
              type="password"
              required
            />
            {/* <p>{errors.password.message}</p> */}
            <br />
      
            <button>{submit ? "Logging in" : "Login"}</button>
            </fieldset>
          </form>
        );

}