import { useState } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import useAxios from "../../hooks/useAxios";
import { Button } from "react-bootstrap";

function FollowButton() {
	const [error, setError] = useState(null);

  const { name } = useParams();
  const url = BASE_URL + "/social/profiles/" + name + "/follow";
  const http = useAxios();

  async function followThisUser() {
    try {
      const result = await http.put(url);
      console.log(result);
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