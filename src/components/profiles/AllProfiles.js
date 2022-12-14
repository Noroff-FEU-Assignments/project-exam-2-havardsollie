import { useState, useEffect, useContext } from "react";
import { useNavigate } from "react-router-dom";
import useAxios from "../../hooks/useAxios";
import SingleProfile from "../single/SingleProfile";
import AuthContext from "../../context/AuthContext";
import { BASE_URL } from "../../api/Api";

function ListOfProfiles() {
	const [profiles, setProfiles] = useState([]);
  const [auth] = useContext(AuthContext);
	const [error, setError] = useState(null);
  const http = useAxios();
  const url = BASE_URL + "/social/profiles?sortOrder=asc";
  const navigate = useNavigate();

	useEffect(function () {
		async function fetchProfiles() {
      const options = {
        headers: {
          Authorization: `Bearer ${auth.accessToken}`,
        },
      }
    
        try {
            const response = await fetch(url, options)
            const data = await response.json();
            console.log(data);
            setProfiles(data);

            if (!auth) {
              navigate("/login");
            }
          } catch (error) {
            console.log("error", error);
          }
        }
		fetchProfiles();
	}, []);

	if (error) {
		return <div>An error occured: {error}</div>;
	}

	return (
		<>
    <div className="profiles-wrapper">
			{profiles.map((profile) => {
        const { name, email, banner, avatar, _count } = profile;
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