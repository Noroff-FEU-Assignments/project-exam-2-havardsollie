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
	name: yup.string().required("Please enter your username"),
  email: yup.string().required("Please enter your stud.noroff.no account"),
	password: yup.string().required("Please enter your password"),
});

export default function RegisterForm() {
	const [submit, setSubmitting] = useState(false);
	const [registerError, setRegisterError] = useState(null);

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

async function registerUser(schema) {
  const options = {
    method: "POST",
    body: JSON.stringify(schema),
    headers: {
      'Content-Type': 'application/json'
    },
  }

    setSubmitting(true);
    setRegisterError(null);

    try {
        const response = await fetch(`${BASE_URL}/social/auth/register`, options)
        const data = await response.json();
        console.log("response", data);
        setRegisterError(data.errors[0].message);

        // if (json.user) {

        //     saveTokenKey(data.jwt);
        //     saveThisUser(data.user);
        // }
      } catch (error) {
        console.log("error", error);
      } finally {
        setSubmitting(false);
      }
    }

        // if (json.error) {
        //     displayMessage("warning", "Invalid login details", ".message-container");
        // }

        return (
          <form onSubmit={handleSubmit(registerUser)}>
            {registerError && <FormError>{registerError}</FormError>}
      
            <fieldset disabled={submit}>
            <input {...register("name")} placeholder="name" required />
            {/* <p>{errors.username.message}</p> */}
            <br />

            <input
              {...register("email")}
              placeholder="email"
              type="email"
              required
            />
            {/* <p>{errors.email.message}</p> */}
      
            <input
              {...register("password")}
              placeholder="password"
              type="password"
              required
            />
            {/* <p>{errors.password.message}</p> */}
            <br />
      
            <button>{submit ? "Registering user" : "Register"}</button>
            {/* <div>{errors ? <p>{registerError}</p> : "User created"}</div> */}
            </fieldset>
          </form>
        );

}