import { useState, useEffect, useContext } from "react";
import { useParams, Link } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import { Card } from "react-bootstrap";
import ReactToPost from "../posts/ReactToPost";
import CommentOnPost from "../posts/CommentPost";
import AuthContext from "../../context/AuthContext";
import EditPost from "../posts/EditPost";
import { BsChat } from "react-icons/bs";

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
			<div className="created">
				<h6>{post.created?.replace("2022-", "")}</h6>
			</div>
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
              <Link to={`/profile/${post.author.name}`}><img src={post.author.avatar} alt={post.author.name} width={100} height={100}></img></Link>
              <Link to={`/profile/${post.author.name}`}><h3>{post.author.name}</h3></Link>
            </>
        : <Link to={`/profile/${post.author.name}`}><h3>{post.author.name}</h3></Link> 
        }
					<h2 className="postTitle">{post.title}</h2>
				</section>
				<section className="postDetails">
					<div>
						<h5>{post.body}</h5>
					</div>
				</section>
				{post.tags ?
				<div className="tags">
					{post.tags.map((tag) => (
					<div className="singleTag">
						<h6>#{tag.trim()}</h6>
					</div>
					))}
					</div>
				: <></>}
			</section>
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
					<div className="commentHead">
					<h4><BsChat /></h4>
					<h4>{post._count.comments}</h4>
				</div>
					
					{post.comments && post.comments.map((comment) => {
						const { owner, body } = comment;
						return <>
					<div className="commentsInner">
						<Link to={`/profile/${owner}`}><h3>{owner}:</h3></Link>
						<h6 className="commentBody">{body}</h6>
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