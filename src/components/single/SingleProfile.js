// import PropTypes from "prop-types";
import { Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import DefaultAvatar from "../../common/DefaultAvatar";
import DefaultBanner from "../../common/DefaultBanner";

function SingleProfile({ name, email, banner, avatar, _count, posts, following, followers }) {

 return (
  <>
  <Card>
       <Card.Header className="profileLinks">
       <Link to={`/profile/${name}`}>
       <div>
        {avatar ?
        <img src={avatar} width={50} height={50}></img>
        : <DefaultAvatar />
        }
      </div>
      <hr />
        <div><h3>{name}</h3></div>
        </Link>
        </Card.Header>
   </Card>
   {/* <Card> 
    <Card.Body className="interactions">
      <div>
          {banner ?
          <img src={banner} width="auto" height={100}></img>
          : <DefaultBanner />
          }
      </div>
      <div>
        {avatar ?
        <img src={avatar} width={50} height={50}></img>
        : <DefaultAvatar />
        }
      </div>
       </Card.Body>
    </Card> */}
     </>
 );
}

// SinglePost.propTypes = {
//   id: PropTypes.number,
//   title: PropTypes.string,
// };

export default SingleProfile;