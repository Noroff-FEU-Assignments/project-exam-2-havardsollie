import { useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import { BASE_URL } from "../../api/Api";
import AuthContext from "../../context/AuthContext";
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import coffeeman from "../../assets/coffeeman.png"

const schema = yup.object().shape({
	banner: yup.string(),
	avatar: yup.string(),
});

export default function UpdateMedia() {
  const [auth] = useContext(AuthContext);
	const [submit, setSubmitting] = useState(false);
	const [updateError, setUpdateError] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});
  const navigate = useNavigate();
  const url = BASE_URL + "/social/profiles/" + auth.name + "/media";

  async function updateMedia(schema) {
    const options = {
      method: "PUT",
      body: JSON.stringify(schema),
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
      },
    }

      setSubmitting(true);
      setUpdateError(null);

      try {
          const response = await fetch(url, options)
          const data = await response.json();
          console.log(data)

        } catch (error) {
          console.log("Error:" + error);
        } finally {
          setSubmitting(false);
          navigate(`/profile/${auth.name}`);
          window.location.reload();
        }
      }

        return (
          <>
          <Button variant="outline-secondary" className="newPost" onClick={handleShow}>
            Update images
          </Button>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Update banner and avatar</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form className="createForm">
              <fieldset disabled={submit}>
                <Form.Group className="mb-3" controlId="formGroupEmail">
                  <input
                    {...register("avatar")}
                    defaultValue={auth.avatar}
                    placeholder="Avatar"
                    />
                  {errors.banner && <FormError>{errors.banner.message}</FormError>}
                </Form.Group>

                <hr />
                <Form.Group className="mb-3" controlId="formGroupPassword">
                  <input
                    {...register("banner")}
                    defaultValue={auth.banner}  
                    placeholder="Banner"                
                    />
                  {errors.avatar && <FormError>{errors.avatar.message}</FormError>}
                </Form.Group>
                <hr />
                {updateError && <FormError>{updateError}</FormError>}
                <Button variant="outline-secondary" className="newPost" onClick={handleSubmit(updateMedia)}>{submit ? "Updating..." : "Update"}</Button>
              </fieldset>
            </Form>
            </Modal.Body>
            <Modal.Footer>
            <img src={coffeeman} width="auto" height={100}></img>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            </Modal.Footer>
            </Modal>
            </>
        );

}