import { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from 'react-bootstrap/Form';
import FormError from "../../common/FormError";
import useAxios from "../../hooks/useAxios";
import { Button } from "react-bootstrap";

const schema = yup.object().shape({
  body: yup.string().required("Please enter your message"),
});

export default function CommentOnPost() {
  const [comment, setComment] = useState();
  const [commentError, setCommentError] = useState(null);

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
            <Form className="commentForm">
              <textarea id="comment" placeholder="Write a comment..." {...register("body")} className="commentSection"></textarea>
              {errors.message && <FormError>{errors.message.message}</FormError>}
              <Button variant="outline-secondary" className="commentBtn" onClick={handleSubmit(PostComment)}>Send</Button>
              {commentError && <FormError>{commentError}</FormError>}
            </Form>
          </>
        );

}