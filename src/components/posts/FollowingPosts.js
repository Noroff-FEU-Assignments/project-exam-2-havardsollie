import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import SinglePost from "../single/SinglePost";

function FollowingFeed() {
	const [posts, setPosts] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

  const url = "/social/posts/following?_author=true&_comments=true&_reactions=true";
  const http = useAxios();

	useEffect(function () {
		async function fetchData() {
			try {
				const response = await http.get(url);
        console.log(response.data);
				setPosts(response.data);

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
		{posts.map((post) => {
      const { id, title, body, media, _count, comments, reactions, author, tags } = post;
      return <>
      <div className="feed-wrapper">
        <SinglePost key={id} id={id} title={title} body={body} media={media} name={author.name} avatar={author.avatar} tags={tags} comments={comments} commentsNumber={_count.comments} reactions={reactions} reactionsNumber={_count.reactions} />
      </div>
      </>
    })}
    </>
   );
}
  
  export default FollowingFeed;