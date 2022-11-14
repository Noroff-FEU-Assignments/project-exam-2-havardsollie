import React from "react";
import { useContext, useState, useEffect } from "react";
import { Card } from "react-bootstrap";
import AuthContext from "../../context/AuthContext";
import { BASE_URL } from "../../api/Api";
import useAxios from "../../hooks/useAxios";
import MyProfilePosts from "./MyProfilePosts";

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
        console.log(response);
      } catch (error) {
        setError(error.toString())
      }
    }
    getProfile();
  }, []);

  return (
    <>
      <div className="ProfileSection">
        <Card>
          <Card.Body>
            {profile.name}
          </Card.Body>
        </Card>
        <Card>
          <MyProfilePosts />
        </Card>
      </div>
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