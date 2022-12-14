import { useContext, useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import { BASE_URL } from "../../api/Api";
import Form from 'react-bootstrap/Form';
import DeletePost from "./DeletePost";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import coffeeman from "../../assets/coffeeman.png"
import { schema } from "./Schema";
import AuthContext from "../../context/AuthContext";

export default function EditPost({ title, body, tags, media }) {
  const [auth] = useContext(AuthContext);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [updateError, setUpdateError] = useState(null);

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

  let { id } = useParams();
  const navigate = useNavigate();

  async function onSubmit(data) {
    const formData = {
      title: data.title,
      body: data.body,
      tags: data.tags.split(","),
      media: data.media,
    };

    const options = {
      method: "PUT",
      body: JSON.stringify(formData),
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${auth.accessToken}`,
      },
    }

    try {
      const response = await fetch(`${BASE_URL}/social/posts/${id}`, options);
      const data = await response.json();
      setUpdateError(data.status)
      navigate(`/`);
    } catch (error) {
      setUpdateError(error.toString())
    } finally {
      navigate(`/profile/${auth.name}`);
    }
  }
        return (
          <>
          <Button variant="outline-secondary" className="newPost" onClick={handleShow}>
            Edit post
          </Button>
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Edit post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form className="createForm">
              {updateError && <FormError>{updateError}</FormError>}
                <Form.Group className="mb-3" controlId="formGroupTitle">
                  <input
                    {...register("title")}
                    defaultValue={title}
                    />
                  {errors.title && <FormError>{errors.title.message}</FormError>}
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" controlId="formGroupBody">
                  <input
                    {...register("body")}
                    defaultValue={body}
                    placeholder="Body text"
                    />
                  {errors.body && <FormError>{errors.body.message}</FormError>}
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" controlId="formGroupTags">
                  <input
                    {...register("tags")}
                    defaultValue={tags}
                    placeholder="Tags"
                    />
                  {errors.tags && <FormError>{errors.tags.message}</FormError>}
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" controlId="formGroupMedia">
                  <input
                    {...register("media")}
                    defaultValue={media}
                    placeholder="Image URL"
                    />
                  {errors.media && <FormError>{errors.media.message}</FormError>}
                </Form.Group>
                <hr />
                <div className="editButtons">
                  <Button variant="outline-secondary" className="newPost" onClick={handleSubmit(onSubmit)}>Update</Button>
                  <DeletePost id={id} />
                  
                </div>
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