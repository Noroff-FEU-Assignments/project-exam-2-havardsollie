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
  
  const url = BASE_URL + "/social/profiles/" + auth.name + "/media";

  async function updateMedia(schema) {
    const options = {
      method: "PUT",
      body: JSON.stringify(schema),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`,
      },
  }

  setSubmitting(true);
  setUpdateError(null);

  try {
      const response = await fetch(url, options)
      const data = await response.json();
    } catch (error) {
      console.log("Error:" + error);
    } finally {
      setSubmitting(false);
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
      <Modal.Title>Update avatar and banner</Modal.Title>
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
        <img src={coffeeman} alt="Man drinking coffee" width="auto" height={100}></img>
        <Button variant="secondary" onClick={handleClose}>
          Close
        </Button>
      </Modal.Footer>
    </Modal>
  </>
);
}