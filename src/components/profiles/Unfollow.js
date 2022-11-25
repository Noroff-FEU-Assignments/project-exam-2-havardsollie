import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import { Button } from "react-bootstrap";
import RefreshAtSubmit from "../../common/Refresh";

function UnfollowButton() {
	const [error, setError] = useState(null);

  let history = useNavigate();
  const { name } = useParams();
  const url = BASE_URL + "/social/profiles/" + name + "/unfollow";
  const http = useAxios();

		async function UnfollowThisUser() {

    
      try {
        const result = await http.put(url);
        console.log(result);
        history(`/profile/${name}`)
        // <RefreshAtSubmit />
      } catch (error) {
        setError(error);
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