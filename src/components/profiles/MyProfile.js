import React from "react";
import { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { BASE_URL } from "../../api/Api";
import useAxios from "../../hooks/useAxios";
import MyProfilePosts from "./MyProfilePosts";
import UpdateMedia from "./UpdateMedia";
import FollowButton from "../profiles/Follow";
import UnfollowButton from "../profiles/Unfollow";
import { Link } from "react-router-dom";

function MyProfile() {
  const [auth] = useContext(AuthContext);
  const [profile, setProfile] = useState([]);
  const [error, setError] = useState(null);

  // const url = BASE_URL + "/social/profiles/" + auth.name + "?_following=true&_followers=true";
  const urlAxios = useAxios();


  useEffect(function () {
    async function getProfile() {
      try {
        const response = await urlAxios.get("/social/profiles/" + auth.name + "?_following=true&_followers=true");
        setProfile(response.data);
        console.log(response.data);
      } catch (error) {
        setError(error.toString())
      }
    }
    getProfile();
  }, []);

  const followers = profile.followers;
	const following = profile.following;

  return (
    <>
		<Card className="profileWrapper">

			<section className="profileAvatar">
				<img src={profile.avatar} width={300} height={300}></img>
				<h3>{profile.name}</h3>
			</section>

			<div class="vr"></div>
			
			<section className="profileInfo">
				<Card.Body className="upper">
					<h4>{profile.email}</h4>
					{/* <div>{Object.values(followers).filter(name => auth.name === name) ? <UnfollowButton /> : <FollowButton />}</div> */}
				</Card.Body>
				
				<Card.Body className="middle">
					<div className="followContainer">
						{/* <h5>Followers: {profile._count.followers}</h5> */}
						<div className="followersList">
					{followers && followers.map((follower) => (
						<div>
							{follower.avatar ?
						<Link to={`/profile/${follower.name}`}><img src={follower.avatar} width={50} height={50}></img></Link>
						: <p>{follower.name}</p>	
						}
						</div>
					))}
					</div>
					<hr />
					{/* <h5>Following: {profile._count.following}</h5> */}
					<div className="followingList">
					{following && following.map((follow) => (
						<div>
							{follow.avatar ?
							<Link to={`/profile/${follow.name}`}><img src={follow.avatar} width={50} height={50}></img></Link>
						: <p>{follow.name}</p>
						}
						</div>
					))}
					</div>
				</div>
				
				</Card.Body>
			</section>
		</Card>
		<Card className="profilePostSection">
			<h4>{profile.name}'s posts</h4>
				<MyProfilePosts />
			</Card>
			</>
  )
}

export default MyProfile

// import React from "react";
// import { useContext, useState, useEffect } from "react";
// import { Card } from "react-bootstrap";
// import AuthContext from "../../context/AuthContext";
// import { BASE_URL } from "../../api/Api";

// function MyProfile() {
//   const [auth] = useContext(AuthContext);
//   console.log(auth);

//   return (
//     <>
//       <div className="ProfileSection">
//         <Card>
//           <Card.Body>
//             {auth.name}
//             {auth.email}
//           </Card.Body>
//         </Card>
//       </div>
//     </>
//   )
// }

// export default MyProfile