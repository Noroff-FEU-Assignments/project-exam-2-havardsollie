import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import { Card } from "react-bootstrap";
import ReactToPost from "../posts/ReactToPost";
import CommentOnPost from "../posts/CommentPost";
import AuthContext from "../../context/AuthContext";
import EditPost from "../posts/EditPost";

function PostDetails() {
	const [post, setPost] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [auth] = useContext(AuthContext);

  let history = useNavigate();

  const { id } = useParams();
	// const { name } useParams();
 
  if (!id) {
   history.push("/");
  }

  const url = BASE_URL + "/social/posts/" + id + "?_author=true&_comments=true&_reactions=true";

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
				setPost(json);

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
		<Card className="postWrapper">

			<section className="authorLinks">
				<h2>{post.title}</h2>
				<div className="vr"></div>
				<Link to={`/profile/${post.author.name}`}><img src={post.author.avatar} width={50} height={50}></img></Link>
				<Link to={`/profile/${post.author.name}`}><h3>{post.author.name}</h3></Link>
			</section>
			<hr />
			<section className="postBody">
				{post.media ? 
				<img src={post.media} width="100%" height="auto"></img>
				: <></>
				}
				<hr />
				<h4>{post.body}</h4>
			</section>
			<hr />

			<section className="interactions">
				<div className="reactions">
					{post.reactions && post.reactions.map((reaction) => (
					<div className="reactionsInner">
						<p>{reaction.symbol}</p>
					</div>
				))}
				</div>
				<ReactToPost />
				<hr />
				<div className="comments">
					<p>Comments {post._count.comments}</p>
					{post.comments && post.comments.map((comment) => (
					<div className="commentsInner">
						<Link to={`/profile/${comment.owner}`}><p>{comment.owner}:</p></Link>
						<p>{comment.body}</p>
					</div>
				))}
				</div>
				<CommentOnPost />
			<hr />
			</section>
			{post.author.name === auth.name ?
			<EditPost />
			: <></>
			}
		</Card>
   );
}
  
  export default PostDetails;