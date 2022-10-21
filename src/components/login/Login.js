// import { displayMessage } from "./utils/displayMessage.js";
// import { saveTokenKey, saveThisUser } from "./settings/storage.js";
// import menu from "./utils/createMenu.js";
import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
import FormError from "../../common/FormError";
import { BASE_URL } from "../../api/Api";


// const url = BASE_URL + TOKEN_PATH;

const schema = yup.object().shape({
	username: yup.string().required("Please enter your username"),
	password: yup.string().required("Please enter your password"),
});

export default function LoginForm() {
	const [submit, setSubmitting] = useState(false);
	const [loginError, setLoginError] = useState(null);

	const { register, handleSubmit, errors } = useForm({
		resolver: yupResolver(schema),
	});

async function doLogin(schema) {
  const options = {
    method: "POST",
    body: schema,
    headers: {
      Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
    },
  }

    setSubmitting(true);
    setLoginError(null);

    try {
        const response = await fetch(`${BASE_URL}/social/auth/login`, options)
        const data = await response.json();
        console.log("response", data, schema);

        // if (json.user) {

        //     saveTokenKey(data.jwt);
        //     saveThisUser(data.user);
        // }
      } catch (error) {
        console.log("error", error);
        setLoginError(error.toString());
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
            <input {...register("username")} placeholder="username" required />
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