import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../api/Api";
// import Heading from "../layout/Heading";
import SinglePost from "../singlePost/SinglePost";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NewPost from "../newPost/NewPost";

function ListOfPosts() {
	const [posts, setPosts] = useState([]);
	// const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  const [ auth, setAuth ] = useContext(AuthContext);
  const navigate = useNavigate();

	useEffect(function () {
		async function fetchData() {
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
        },
      }
    
        try {
            const response = await fetch(`${BASE_URL}/social/posts/?_author=true`, options)
            const data = await response.json();
            console.log("response", data);
            setPosts(data);
    
            if (!auth) {
              navigate("/login"); 
            }
          } catch (error) {
            console.log("error", error);

          } finally {
            // setSubmitting(false);
          }
        }
		fetchData();
	}, []);

	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

	if (error) {
		return <div>An error occured: {error}</div>;
	}

	return (
		<>
			{/* <Heading title="Home" />  */}
      <NewPost />
      <hr />
			{posts.map((post) => {
        const { id, title, body, media, _count, comments, reactions, author, name, address } = post;
				return <>
        <div className="feed-wrapper">
          <SinglePost key={id} id={id} title={title} body={body} media={media} name={author.name} address={author.email} comments={_count.comments} reactions={_count.reactions} />
        </div>
        </>
			})}
		</>
	);
}

export default ListOfPosts;