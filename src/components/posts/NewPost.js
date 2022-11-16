import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
// import axios from "axios";
import FormError from "../../common/FormError";
import { BASE_URL } from "../../api/Api";
// import AuthContext from "../../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter your message"),
  media: yup.string().nullable().notRequired(),
});

export default function NewPost() {
  // const [auth, setAuth] = useContext(AuthContext);
	const [submit, setSubmitting] = useState(false);
	const [postError, setPostError] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

  const navigate = useNavigate();

  async function sendPost(schema) {
    const options = {
      method: "POST",
      body: JSON.stringify(schema),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
      },
    }

      setSubmitting(true);
      setPostError(null);

      try {
          const response = await fetch(`${BASE_URL}/social/posts`, options)
          const data = await response.json();
          setPostError(postError);
          console.log(data)

          if (data.status) {
            return <FormError>{postError}</FormError>         
          } else {
            navigate("/"); 
          }

        } catch (error) {
          console.log("Error:" + error);
        } finally {
          setSubmitting(false);
          navigate("/"); 
        }
      }

        // if (json.error) {
        //     displayMessage("warning", "Invalid login details", ".message-container");
        // }

        return (
          <>
          <Button variant="outline-secondary" className="newPost" onClick={handleShow}>
            New post
          </Button>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form className="createForm">
              <fieldset disabled={submit}>
                <Form.Group className="mb-3" controlId="formGroupTitle">
                  <input
                    {...register("title")}
                    placeholder="Title"
                    required />
                  {errors.title && <FormError>{errors.title.message}</FormError>}
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" controlId="formGroupBody">
                  <input
                    {...register("body")}
                    placeholder="Write something"
                    />
                  {errors.body && <FormError>{errors.body.message}</FormError>}
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" controlId="formGroupMedia">
                  <input
                    {...register("media")}
                    placeholder="Image URL"
                    />
                  {errors.media && <FormError>{errors.media.message}</FormError>}
                </Form.Group>
                {postError && <FormError>{postError}</FormError>}
                <Button variant="outline-secondary" className="newPost" onClick={handleSubmit(sendPost)}>{submit ? "Sending..." : "Send"}</Button>
              </fieldset>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            </Modal.Footer>
            </Modal>
            </>
        );

}