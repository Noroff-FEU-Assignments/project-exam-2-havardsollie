import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import { BASE_URL } from "../../api/Api";
import { Button } from "react-bootstrap";

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
      } catch (error) {
        console.log("error", error);
      } finally {
        setSubmitting(false);
      }
    }

        return (
          <form className="enterForm">
            {registerError && <FormError>{registerError}</FormError>}
      
            <fieldset disabled={submit}>
            <input {...register("name")} placeholder="Username" required />
            {errors.name && <FormError>{errors.name.message}</FormError>}
            <hr />

            <input
              {...register("email")}
              placeholder="Email"
              type="email"
              required
            />
            {errors.email && <FormError>{errors.email.message}</FormError>}
            <hr />
      
            <input
              {...register("password")}
              placeholder="Password"
              type="password"
              required
            />
            {errors.password && <FormError>{errors.password.message}</FormError>}
            <hr />
      
            <Button variant="outline-secondary" className="newPost" onClick={handleSubmit(registerUser)}>{submit ? "Registering user" : "Register"}</Button>
            </fieldset>
          </form>
        );

}