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

const schema = yup.object().shape({
  title: yup.string().required("Please enter a title"),
  body: yup.string().required("Please enter your message"),
  media: yup.string().nullable().notRequired(),
});

export default function EditPost() {
  const [post, setPost] = useState([]);
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
    
            setPost(response.data);
          } catch (error) {
            setFetchError(error.toString());
          } finally {
            setFetchingPost(false);
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
          <h2>Edit post</h2>
          <Form onSubmit={handleSubmit(onSubmit)} className="editForm">
              
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
                <button>Update</button>
                <DeletePost id={post.id} />
              
            </Form>
            </>
        );

}