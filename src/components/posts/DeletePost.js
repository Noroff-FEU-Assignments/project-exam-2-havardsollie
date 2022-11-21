import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
// import Heading from "../layout/Heading";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Button } from "react-bootstrap";

function DeletePost({id}) {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  let history = useNavigate();

  if (!auth) {
    history.push("/");
  }

  const url = BASE_URL + "/social/posts/" + id;
  const http = useAxios();

		async function deleteThisPost() {
      const confirm = window.confirm("Delete this post?");

      if (confirm) {
        try {
          await http.delete(url);
          history("/");
        } catch (error) {
          setError(error);
        } finally {
          history(`/profile/${auth.name}`);
        }
      }
		}

	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

	if (error) {
		return <div>An error occurred: {error}</div>;
	}

  return (
    <Button variant="outline-secondary" className="newPost" onClick={deleteThisPost}>
      {error ? "Error" : "Delete"}
    </Button>
   );
  }
  
  export default DeletePost;