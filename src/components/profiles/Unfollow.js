import { useContext, useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Button } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";

function UnfollowButton() {
  const [auth] = useContext(AuthContext);
	const [error, setError] = useState(null);

  let history = useNavigate();
  const { name } = useParams();
  const url = BASE_URL + "/social/profiles/" + name + "/unfollow";
  const http = useAxios();

  async function UnfollowThisUser() {
    try {
      const result = await http.put(url);
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
    <Button variant="outline-secondary" className="newPost" onClick={UnfollowThisUser}>
      {error ? "Error" : "Unfollow"}
    </Button>
   );
  }
  
  export default UnfollowButton;