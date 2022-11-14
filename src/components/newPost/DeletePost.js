import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
// import Heading from "../layout/Heading";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";

function DeletePost({id}) {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  let history = useNavigate();

  // const { id } = useParams();
 
  // if (!id) {
  //  history.push("/");
  // }

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
    <button type="button" className="deleteBtn" onClick={deleteThisPost}>
      {error ? "Error" : "Delete"}
    </button>
   );
  }
  
  export default DeletePost;