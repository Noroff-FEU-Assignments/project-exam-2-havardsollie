import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from 'react-bootstrap/Form';
import FormError from "../../common/FormError";
import useAxios from "../../hooks/useAxios";
import { Button } from "react-bootstrap";
import { BsChat } from "react-icons/bs";
import Modal from 'react-bootstrap/Modal';

const schema = yup.object().shape({
  body: yup.string().required("Please enter your message"),
  replyToId: yup.number().required(),
});

export default function CommentOnCom( { key }) {
  const [commentError, setCommentError] = useState(null);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

	const { register, handleSubmit, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

  let { id } = useParams();
  const navigate = useNavigate();
  const http = useAxios();
  const url = `/social/posts/${id}/comment`
  


  async function PostComment(data) {
    try {
      const response = await http.post(url, data);
      console.log(response.data);
    } catch (error) {
      console.log(error)
      setCommentError(error)
    } finally {
      navigate("/detail/" + id)
    }
  }

        return (
          <>
          <BsChat onClick={handleShow} />
          {console.log(key)}
          <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create a new post</Modal.Title>
          </Modal.Header>
          <Modal.Body>
          <Form className="createForm">
              <textarea id="comment" placeholder="Write a comment..." {...register("body")} className="commentSection"></textarea>
              {errors.message && <FormError>{errors.message.message}</FormError>}
              <Form.Group className="mb-3" controlId="formGroupTitle">
                  <input
                    {...register("replyToId")}
                    placeholder="ID"
                    defaultValue={key}
                    required />
                  {errors.replyToId && <FormError>{errors.replyToId.message}</FormError>}
                </Form.Group>
                <hr />
              <Button variant="outline-secondary" className="commentBtn" onClick={handleSubmit(PostComment)}>Send</Button>
              {commentError && <FormError>{commentError}</FormError>}
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