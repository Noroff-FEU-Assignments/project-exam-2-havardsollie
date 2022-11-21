import { useState, useContext, useEffect } from "react";
import { useForm } from "react-hook-form";
import { useNavigate, useParams } from "react-router-dom";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import Form from 'react-bootstrap/Form';
import useAxios from "../../hooks/useAxios";

const schema = yup.object().shape({
  symbol: yup.string().nullable().notRequired(),
});

export default function ReactToPost() {
  const [emoji, setEmoji] = useState();

	const { register, handleSubmit, reset, formState: { errors } } = useForm({
		resolver: yupResolver(schema),
	});

  let { id } = useParams();
  let symbol = emoji;
  const navigate = useNavigate();
  const http = useAxios();
  const url = `/social/posts/${id}/react/${symbol}`
  


  async function ReactSelect() {

    try {
      const response = await http.put(url);
      setEmoji(response);
    } catch (error) {
      console.log(error)
    }
  }

        return (
          <>
          <Form onSubmit={handleSubmit(ReactSelect)} className="reactForm">
                  <select
                  value={emoji}
                  {...register("title")}
                  className="reactionSelect"
                  onChange={(e) => setEmoji(e.target.value)}
                  >
                    <option value="">Emoji</option>
                    <option>😃</option>
                    <option>🥳</option>
                    <option>🌧</option>
                  </select>
                <button>React</button>
            </Form>
            </>
        );

}