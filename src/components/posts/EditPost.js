import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import FormError from "../../common/FormError";
import { BASE_URL } from "../../api/Api";
// import AuthContext from "../../context/AuthContext";
import Form from 'react-bootstrap/Form';
import DeletePost from "./DeletePost";
import useAxios from "../../hooks/useAxios";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import coffeeman from "../../assets/coffeeman.png"

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter your message"),
  media: yup.string().nullable().notRequired(),
});

export default function EditPost() {
  const [post, setPost] = useState([]);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);
  const [updated, setUpdated] = useState(false);
  const [fetchingPost, setFetchingPost] = useState(true);
  const [updatingPost, setUpdatingPost] = useState(false);
  const [fetchError, setFetchError] = useState(null);
  const [updateError, setUpdateError] = useState(null);

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

  let { id } = useParams();
  const navigate = useNavigate();
  const http = useAxios();
  const url = `/social/posts/${id}`

  useEffect(function () {
    async function getPost() {
        try {
            const response = await http.get(url)
            if (response.data.media === null) {
              response.data.media = "";
            }
            console.log(response);
            setPost(response.data);
          } catch (error) {
            setFetchError(error.toString());
          } finally {
            setFetchingPost(false);
            window.location.reload();
          }
        }
        getPost();
  }, []);


  async function onSubmit(data) {
    setUpdatingPost(true);
    setUpdateError(null);
    setUpdated(false);

    if (data.media === "") {
      data.media = null;
    }

    try {
      const response = await http.put(url, data);
      setUpdated(true);
    } catch (error) {
      setUpdateError(error.toString())
    } finally {
      navigate(`/detail/${id}`)
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
          <Form onSubmit={handleSubmit(onSubmit)} className="createForm">
              
                <Form.Group className="mb-3" controlId="formGroupTitle">
                  <input
                    {...register("title")}
                    defaultValue={post.title}
                    />
                  {errors.title && <FormError>{errors.title.message}</FormError>}
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" controlId="formGroupBody">
                  <input
                    {...register("body")}
                    defaultValue={post.body}
                    />
                  {errors.body && <FormError>{errors.body.message}</FormError>}
                </Form.Group>
                <hr />
                <Form.Group className="mb-3" controlId="formGroupMedia">
                  <input
                    {...register("media")}
                    defaultValue={post.media}
                    />
                  {errors.media && <FormError>{errors.media.message}</FormError>}
                </Form.Group>
                <div className="editButtons">
                  <Button variant="outline-secondary" className="newPost">Update</Button>
                  <DeletePost id={post.id} />
                </div>
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