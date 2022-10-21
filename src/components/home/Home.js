import { useState, useEffect } from "react";
import { BASE_URL } from "../../api/Api";
// import Heading from "../layout/Heading";
import SinglePost from "../singlePost/SinglePost";

function ListOfPosts() {
	const [posts, setPosts] = useState([]);
	// const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(function () {
		async function fetchData() {
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
        },
      }
    
        try {
            const response = await fetch(`${BASE_URL}/social/posts`, options)
            const data = await response.json();
            console.log("response", data);
            setPosts(data);
    
            // if (json.user) {
    
            //     saveTokenKey(data.jwt);
            //     saveThisUser(data.user);
            // }
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
			{posts.map(function (post) {
        const { id, title } = post;
				return <>
          <SinglePost key={id} id={id} title={title} />
				<hr /></>
			})}
		</>
	);
}

export default ListOfPosts;