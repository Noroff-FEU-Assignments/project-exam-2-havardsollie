import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import DefaultAvatar from "../../common/DefaultAvatar";

function SingleProfile({ name, avatar }) {

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
     </>
 );
}

export default SingleProfile;