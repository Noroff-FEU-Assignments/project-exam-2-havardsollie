import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import { Card } from "react-bootstrap";
import ProfilePosts from "./ProfilePosts";

function ProfileDetails() {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  let history = useNavigate();

  const { name } = useParams();
 
  if (!name) {
   history.push("/");
  }

  const url = BASE_URL + "/social/profiles/" + name + "?_following=true&_followers=true";

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
				setProfile(json);

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
    <>
		<Card className="profileWrapper">
			<section className="profileAvatar"
			>
				<img src={profile.avatar} />
				<Card.Body>{profile.name}</Card.Body>
			</section>
			<div class="vr"></div>
			<section className="profilePosts">
				<Card.Body>
					{profile.email}
					<hr />
					<p>Posts: {profile._count.posts}</p>
					<p>Followers: {profile._count.followers}</p>
					<p>Following: {profile._count.following}</p>
				</Card.Body>
			</section>
		</Card>
		<Card>
				<ProfilePosts />
			</Card>
			</>
   );
  }
  
  export default ProfileDetails;