import { useState, useEffect, useContext } from "react";
import SinglePost from "../single/SinglePost";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import NewPost from "../posts/NewPost";
import coffeeman from "../../assets/coffeeman.png";
import useAxios from "../../hooks/useAxios";

import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import FollowingFeed from "../posts/FollowingPosts";

function ListOfPosts() {
	const [posts, setPosts] = useState([]);
	const [error] = useState(null);
  const [auth] = useContext(AuthContext);
  const navigate = useNavigate();
  const http = useAxios();
  const url = `/social/posts/?_author=true&_comments=true&_reactions=true`

	useEffect(function () {
		async function fetchData() {
        try {
            const response = await http.get(url)
            
            console.log(response);
            setPosts(response.data);
    
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
	}, [url]);

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
			{posts.map((post) => {
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