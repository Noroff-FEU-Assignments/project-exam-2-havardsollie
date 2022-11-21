import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
// import Heading from "../layout/Heading";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Button } from "react-bootstrap";

function UnfollowButton() {
	const [unfollow, setUnfollow] = useState(false);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  const [auth] = useContext(AuthContext);

  let history = useNavigate();

  const { name } = useParams();
 
  // if (!id) {
  //  history.push("/");
  // }

  const url = BASE_URL + "/social/profiles/" + name + "/unfollow";
  const http = useAxios();

		async function UnfollowThisUser() {

    
      try {
        const result = await http.put(url);
        console.log(result);
        setUnfollow(true);
      } catch (error) {
        setError(error);
      } finally {
        history(`/profile/${name}`);
        window.location.reload();
      }
      }


	if (error) {
		return <div>An error occurred: {error}</div>;
	}

  return (
    <Button variant="outline-secondary" className="newPost" onClick={UnfollowThisUser}>
      {error ? "Error" : "Unfollow"}
    </Button>
   );
  }
  
  export default UnfollowButton;