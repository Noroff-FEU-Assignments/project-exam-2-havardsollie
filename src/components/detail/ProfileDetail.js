import { useState, useEffect, useContext } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { BASE_URL } from "../../api/Api";
import { Card } from "react-bootstrap";
import ProfilePosts from "./ProfilePosts";
import FollowButton from "../profiles/Follow";
import UnfollowButton from "../profiles/Unfollow";
import AuthContext from "../../context/AuthContext";
import MyProfilePosts from "../profiles/MyProfilePosts";
import UpdateMedia from "../profiles/UpdateMedia";
import DefaultAvatar from "../../common/DefaultAvatar";
import NewPost from "../posts/NewPost";
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

function ProfileDetails() {
	const [profile, setProfile] = useState(null);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [auth] = useContext(AuthContext);

  let history = useNavigate();

  const { name } = useParams();
 
  if (!name) {
   history.push("/");
  }

  const url = BASE_URL + "/social/profiles/" + name + "?_following=true&_followers=true";

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
				setProfile(json);

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

	const followers = profile.followers;
	console.log(followers)
	const following = profile.following;
	console.log(following)

	console.log(followers);
	console.log(auth.name)

	// const checkFollowers = (auth) => {
	// 	if (auth) {
	// 		for (let i = 0; i < followers.length; i++) {
	// 			if (followers[i].includes(auth.name)) {
	// 				return auth.name;
	// 			}
	// 		}
	// 	}
	// 	return false;
	// }

	const isFollowingUser = auth.name;

	// if (profile.name === auth.name) {
	// 	history("/profile")
	// }

  return (
    <>
		<Card className="profileWrapper">
			<section className="profileAvatar">
				<img src={profile.avatar} width={300} height={300}></img>
				<h3>{profile.name}</h3>
				<h6>{profile.email}</h6>
				<Card.Body className="upper">
					{profile.name === auth.name ?
					<><div><UpdateMedia /></div><hr /><div><NewPost /></div></>
					: <div>{Object.values(followers).find(follower => (follower.name === auth.name)) ? <UnfollowButton /> : <FollowButton />}</div>
				}
				</Card.Body>
			</section>
			<section className="profileInfo">
				<Card.Body className="middle">
					{/* <div className="followContainer"> */}
						{/* <h5>Followers: {profile._count.followers}</h5> */}
					{/* <hr /> */}
					{/* <h5>Following: {profile._count.following}</h5> */}
				{/* </div> */}
				<section className="profileBanner">
				<img src={profile.banner} width="100%" height="auto"></img>
			</section>
				</Card.Body>
				{/* <div class="vr" className="profileLines"/> */}
			</section>
		</Card>
		<Tabs
      defaultActiveKey="posts"
      className="tabWrap"
    >
    <Tab eventKey="posts" title="Posts" className="tabKey">
		<Card className="profilePostSection">
			{profile.name === auth.name ?
			<><h4>My posts</h4><MyProfilePosts /></>
			: <><h4>{profile.name}'s posts</h4><ProfilePosts /></>
			}
			</Card>
			</Tab>
      <Tab eventKey="following" title="Following" className="tabKey">
				<div className="followContainer">
				<h3>Following: {profile._count.following}</h3>
				<div className="followingList">
					{following && following.map((follow) => (
						<div className="follower">
							{follow.avatar ?
							<Link to={`/profile/${follow.name}`}>
								<img src={follow.avatar} width={100} height={100}></img>
								<h5>{follow.name}</h5>
							</Link>
						: <Link to={`/profile/${follow.name}`}><p>{follow.name}</p></Link>
						}
						</div>
					))}
					</div>
					</div>
					</Tab>
				<Tab eventKey="followers" title="Followers" className="tabKey">
					<div className="followContainer">
					<h3>Followers: {profile._count.followers}</h3>
				<div className="followersList">
					{followers && followers.map((follower) => (
						<div className="follower">
							{follower.avatar ?
						<Link to={`/profile/${follower.name}`}>
							<img src={follower.avatar} width={100} height={100}></img>
							<h5>{follower.name}</h5>
							</Link>
						: <DefaultAvatar />	
						}
						</div>
					))}
					</div>
					</div>
				</Tab>
      </Tabs>
			
			</>
   );
  }
  
  export default ProfileDetails;