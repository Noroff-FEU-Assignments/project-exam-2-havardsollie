import { useState, useEffect, useContext } from "react";
import { BASE_URL } from "../../api/Api";
import SinglePost from "../single/SinglePost";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NewPost from "../posts/NewPost";
import coffeeman from "../../assets/coffeeman.png";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FollowingFeed from "../posts/FollowingPosts";

function ListOfPosts() {
	const [posts, setPosts] = useState([]);
	const [error] = useState(null);
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();

	useEffect(function () {
		async function fetchData() {
      const options = {
        headers: {
          Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
        },
      }
    
        try {
            const response = await fetch(`${BASE_URL}/social/posts/?_author=true&_comments=true&_reactions=true`, options)
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

	if (error) {
		return <div>An error occured: {error}</div>;
	}

	return (
		<>
      <hr />
      <NewPost />
      <hr />
      <section className="feedHeading">
      <h2>Latest thoughts in the</h2>
      <img
            src={coffeeman}
            width="auto"
            height="77px"
            alt="Coffee drinking man"
          />
           <h2>community</h2>
          </section>
          <Tabs
      defaultActiveKey="all"
      className="tabWrap"
    >
    <Tab eventKey="all" title="All posts" className="tabKey">
			{posts && posts.map((post) => {
        const { id, title, body, media, _count, comments, reactions, author, tags } = post;
				return <>
        <div className="feed-wrapper">
          <SinglePost key={id} id={id} title={title} body={body} media={media} name={author.name} avatar={author.avatar} tags={tags} comments={comments} commentsNumber={_count.comments} reactions={reactions} reactionsNumber={_count.reactions} />
        </div>
        </>
			})}
      </Tab>
      <Tab eventKey="following" title="Following" className="tabKey">
        <FollowingFeed />
      </Tab>
      </Tabs>
		</>
	);
}

export default ListOfPosts;