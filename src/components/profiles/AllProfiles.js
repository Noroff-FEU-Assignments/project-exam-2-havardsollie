import { useState, useEffect, useContext } from "react";
import AuthContext from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import SingleProfile from "../single/SingleProfile";

function ListOfProfiles() {
	const [profiles, setProfiles] = useState([]);
	// const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
  const [ auth, setAuth ] = useContext(AuthContext);
  const navigate = useNavigate();
  const http = useAxios();
  const url = "/social/profiles";
  // const usersURL = "/social/profiles?limit=100&offset=100";
  // const usersNextURL = "/social/profiles?limit=100&offset=200";

	useEffect(function () {
		async function fetchProfiles() {
      // const options = {
      //   headers: {
      //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
      //   },
      // }
    
        try {
            const response = await http.get(url)
            console.log(response.data);
            setProfiles(response.data);
          } catch (error) {
            console.log("error", error);

          } finally {
            // setSubmitting(false);
          }
        }
		fetchProfiles();
	}, []);

  // useEffect(function () {
	// 	async function fetchMore() {
  //     // const options = {
  //     //   headers: {
  //     //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
  //     //   },
  //     // }
    
  //       try {
  //           const response = await http.get(usersURL, usersNextURL)
  //           console.log(response.data);
  //           setProfiles(response.data);
  //         } catch (error) {
  //           console.log("error", error);

  //         } finally {
  //           // setSubmitting(false);
  //         }
  //       }
  //       fetchMore();
	// }, []);

  // useEffect(function () {
	// 	async function fetchEvenMore() {
  //     // const options = {
  //     //   headers: {
  //     //     Authorization: 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MTY3OSwibmFtZSI6ImhhdmFyZF9zb2xsaWUiLCJlbWFpbCI6IkhhYVNvbDg1MzQ2QHN0dWQubm9yb2ZmLm5vIiwiYXZhdGFyIjpudWxsLCJiYW5uZXIiOm51bGwsImlhdCI6MTY2NjAwNTg3OH0.J00wSf1IXqUEyxB0MxXBmGgRU4niCs75PKxKXSzo2xs',
  //     //   },
  //     // }
    
  //       try {
  //           const response = await http.get(usersNextURL)
  //           console.log(response.data);
  //           setProfiles(response.data);
  //         } catch (error) {
  //           console.log("error", error);

  //         } finally {
  //           // setSubmitting(false);
  //         }
  //       }
  //       fetchEvenMore();
	// }, []);

	// if (loading) {
	// 	return <div>Loading...</div>;
	// }

	if (error) {
		return <div>An error occured: {error}</div>;
	}

	return (
		<>
    <div className="profiles-wrapper">
			{profiles.map((profile) => {
        const { name, email, banner, avatar, _count, posts, following, followers } = profile;
				return <>
        <div className="profileCard">
          <SingleProfile key={name} name={name} email={email} banner={banner} avatar={avatar} posts={_count.posts} following={_count.following} followers={_count.followers} />
        </div>
        </>
			})}
      </div>
		</>
	);
}

export default ListOfProfiles;