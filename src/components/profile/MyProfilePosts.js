import { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import { Card } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";

function MyProfilePosts() {
  const [auth] = useContext(AuthContext);
	const [profilePosts, setProfilePosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  const { name } = useParams();


  const url = BASE_URL + "/social/profiles/" + auth.name + "/posts";

	useEffect(function () {
		async function fetchData() {
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
        },
      }

			try {
				const response = await fetch(url, options);

				if (response.ok) {
					const json = await response.json();

				console.log(json);
				setProfilePosts(json);

				} else {
					setError("An error occurred");
				}
			} catch (error) {
				setError(error.toString());
			} finally {
				setLoading(false);
			}
		}
		fetchData();
	}, [url]);

	if (loading) {
		return <div>Loading...</div>;
	}

	if (error) {
		return <div>An error occurred: {error}</div>;
	}

  return (
    <Card className="profilePosts">
		 {profilePosts.map(post => {
      return <Card>
				<Link to={`/detail/edit/${post.id}`}>
					{post.id}
				</Link>
				{post.title}
        </Card>
     })}
    </Card>
   );
  }
  
  export default MyProfilePosts;