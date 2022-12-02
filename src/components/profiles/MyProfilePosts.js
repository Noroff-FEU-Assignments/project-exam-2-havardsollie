import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../api/Api";
import { Card } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { Link } from "react-router-dom";
import { BsChat } from "react-icons/bs";

function MyProfilePosts() {
  const [auth] = useContext(AuthContext);
	const [profilePosts, setProfilePosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  const url = BASE_URL + "/social/profiles/" + auth.name + "/posts?_author=true&_comments=true&_reactions=true";

	useEffect(function () {
		async function fetchData() {
      const options = {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
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
				{post.media ?
				<div className="postImg">
					<img src={post.media} alt={post.title} width="100%" height="auto"></img>
				</div>
				: <></>
				}
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
        <h4><BsChat /></h4>
        <h4>{post._count.comments}</h4>
        </div>
        {post.comments ? post.comments.map((com) => (
					<div className="comments">
					<div className="commentsInner">
          <Link to={`/profile/${com.owner}`}><p>{com.owner}:</p></Link>
          <p>{com.body}</p>
        </div>
				</div>
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
  
  export default MyProfilePosts;