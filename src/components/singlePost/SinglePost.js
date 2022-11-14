import PropTypes from "prop-types";
import { Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";

function SinglePost({ id, title, body, media, _count, comments, reactions, author, name, address }) {

 return (
  <>
  <Card>
       <Card.Header className="authorLinks">
       <Link to={`profile/${name}`}>
        <div><p>{name}</p></div>
        </Link>
        <div class="vr"></div>
        <Link to={`profile/${name}`}>
        <div><p>{address}</p></div>
        </Link>
        </Card.Header>
        <Link to={`detail/${id}`}>
        <Card.Body className="post-container">
         <Card.Title>{title}</Card.Title>
         <p>{body}</p>
         {/* {media ? <CardImg>{media}</CardImg> : <></>} */}
         </Card.Body>
       </Link>
   </Card>
   <Card> 
    <Card.Body className="interactions">
      <div>

        {comments}
      </div>
      <div>
       {reactions}
      </div>
       </Card.Body>
    </Card>
     </>
 );
}

SinglePost.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};

export default SinglePost;