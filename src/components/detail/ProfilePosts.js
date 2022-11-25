import { useState, useEffect } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import { Card } from "react-bootstrap";
import { BsChat } from "react-icons/bs";

function ProfilePosts() {
	const [profilePosts, setProfilePosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  const { name } = useParams();
  const url = BASE_URL + "/social/profiles/" + name + "/posts?_author=true&_comments=true&_reactions=true";

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
    <>
		 {profilePosts.map(post => {
      return (
			<>
			<Card className="feed-wrapper">
			<Card.Body>
					<Link to={`/detail/${post.id}`}>
						<Card.Body className="post-container">
					 <div className="postText">
					 <h2>{post.title}</h2>
         <h5>{post.body}</h5>
        </div>
				<div className="postImg">
					<img src={post.media} width="100%" height="200px"></img>
				</div>
				</Card.Body>
						<section>
        <div className="feedReactions">
       {post.reactions ? post.reactions.map((emoji) => (
          <p>{emoji.symbol}</p>
      )):  <p>0</p>}
      </div>
      </section>
					</Link>
				</Card.Body>
				<Card> 
    <Card.Body className="interactionsFeed">
		<section>
        <div className="commentsHead">
        <h6><BsChat /></h6>
        <h6>{post._count.comments}</h6>
        </div>
        {post.comments ? post.comments.map((com) => (
					<>
					<div className="comments">
						<div className="commentsInner">
							<Link to={`/profile/${com.owner}`}><p>{com.owner}:</p></Link>
							<p>{com.body}</p>
						</div>
					</div>
					</>
      )):  <></>}
      </section>
       </Card.Body>
    </Card>
					</Card>
					</>
			)
     })}
    </>
   );
  }
  
  export default ProfilePosts;