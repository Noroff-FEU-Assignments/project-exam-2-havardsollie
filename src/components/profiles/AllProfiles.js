import { useState, useEffect } from "react";
import useAxios from "../../hooks/useAxios";
import SingleProfile from "../single/SingleProfile";

function ListOfProfiles() {
	const [profiles, setProfiles] = useState([]);
	const [error, setError] = useState(null);
  const http = useAxios();
  const url = "/social/profiles?sortOrder=asc";

	useEffect(function () {
		async function fetchProfiles() {
    
        try {
            const response = await http.get(url)
            console.log(response.data);
            setProfiles(response.data);
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