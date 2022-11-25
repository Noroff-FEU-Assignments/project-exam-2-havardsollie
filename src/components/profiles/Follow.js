import { useState, useContext } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

function FollowButton() {
  const [auth] = useContext(AuthContext);
	const [follow, setFollow] = useState(false);
	const [error, setError] = useState(null);

  let history = useNavigate();

  const { name } = useParams();

  const url = BASE_URL + "/social/profiles/" + name + "/follow";
  const http = useAxios();

		async function followThisUser() {

    
      try {
        const result = await http.put(url);
        console.log(result);
        setFollow(true);
      } catch (error) {
        setError(error);
      } finally {
        window.location.reload();
      }
      }


	if (error) {
		return <div>An error occurred: {error}</div>;
	}

  return (

      
      <Button variant="outline-secondary" className="newPost" onClick={followThisUser}>
          {error ? "Error" : "Follow"}
      </Button>

)
}
  
export default FollowButton;