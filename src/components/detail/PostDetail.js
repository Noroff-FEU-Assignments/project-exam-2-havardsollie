import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
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

  const { id } = useParams();

  const url = BASE_URL + "/social/posts/" + id + "?_author=true&_comments=true&_reactions=true";

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
			<section className="postBody">
				{post.media ? 
				<>
				<img src={post.media} alt={post.title} width="100%" height="auto"></img>
				<hr />
				</>
				: <></>
				}
				<section className="authorLinksPost">
				{post.author.avatar ?
         		<>
              <Link to={`/profile/${post.author.name}`}><img src={post.author.avatar} alt={post.author.name} width={50} height={50}></img></Link>
              <Link to={`/profile/${post.author.name}`}><h3>{post.author.name}</h3></Link>
            </>
        : <Link to={`/profile/${post.author.name}`}><h3>{post.author.name}</h3></Link> 
        }
					<h2>{post.title}</h2>
					<hr />
				</section>
				<section className="postDetails">
					<div>
						<h5>{post.body}</h5>
					</div>
					<div className="tags">
				{post.tags ?
					post.tags.map((tag) => (
					<div>
						<h6>#{tag}</h6>
					</div>
				)): <></>}
				</div>
				</section>
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
					<h6>Comments {post._count.comments}</h6>
					{post.comments && post.comments.map((comment) => {
						const { owner, body } = comment;
						return <>
					<div className="commentsInner">
						<Link to={`/profile/${owner}`}><p>{owner}:</p></Link>
						<p>{body}</p>
					</div>
					</>
				})}
				</div>
				<CommentOnPost />
			<hr />
			</section>
			{post.author.name === auth.name ?
			<EditPost title={post.title} body={post.body} media={post.media} />
			: <></>
			}
		</Card>
   );
}
  
  export default PostDetails;