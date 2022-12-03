import { useState } from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import { BASE_URL } from "../../api/Api";
import { Button } from "react-bootstrap";

const nameRegex = /^[a-zA-Z0-9]+?/;
const emailRegex = /^\w+([-+.']\w+)*@?(stud.noroff.no)$/;

const schema = yup.object().shape({
	name: yup.string().required("Please enter your username").matches(nameRegex, "Only letters and underscore"),
  email: yup.string().required("Please enter your stud.noroff.no account").email().matches(emailRegex, "Must be @stud.noroff.no address"),
	password: yup.string().required("Please enter your password").min(8, "Must be 8 characters"),
});

export default function RegisterForm() {
	const [submit, setSubmitting] = useState(false);
  const [successMessage, setSuccess] = useState();
  const [submitError, setSubmitError] = useState(null);

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

  try {
      const response = await fetch(`${BASE_URL}/social/auth/register`, options)
      const data = await response.json();
      console.log("response", data);
      if (response.ok) {
        setSuccess(data.id)
      }
      else {
        setSubmitError(data.status)
      }
    } catch (error) {
      setSubmitError(error.toString());
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form className="enterForm">
      {submitError && <FormError>{submitError}</FormError>}
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
      {successMessage && <p className="success">User created!</p>}
      <Button onClick={handleSubmit(registerUser)} variant="outline-secondary" className="newPost">{submit ? "Registering user" : "Register"}</Button>
    </form>
  );

}