import PropTypes from "prop-types";
import { Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";

function SinglePost({ id, title, body, media, _count, comments, commentsNumber, reactions, reactionsNumber, author, name, avatar }) {

 return (
  <>
  <Card>
       <Card.Header>
       <Card.Title>{title}</Card.Title>
        </Card.Header>
        <Link to={`detail/${id}`}>
        <Card.Body className="post-container">
         <div className="postImg">
          {media ?
          <img src={media} width="100%" height="auto"></img>
          : <></>
          }
         </div>
         </Card.Body>
         <hr />
       <Card.Body>
       <section className="authorLinksPost">
					<Link to={`/profile/${name}`}><img src={avatar} width={50} height={50}></img></Link>
					<Link to={`/profile/${name}`}><h3>{name}</h3></Link>
					<hr />
				</section>
       <div className="postText">
         <h5>{body}</h5>
        </div>
       </Card.Body>
       </Link>
   </Card>
   <Card> 
    <Card.Body className="interactionsFeed">
      <section>
        <h6>Comments</h6>
        <hr />
        <div className="feedComments">
        {comments ? comments.map((com) => (
          <p>{com.body}</p>
      )):  <p>0</p>}
      </div>
      </section>
      <div className="vr" />
      <section>
        <h6>Reactions</h6>
        <hr />
        <div className="feedReactions">
       {reactions ? reactions.map((emoji) => (
          <p>{emoji.symbol}</p>
      )):  <p>0</p>}
      </div>
      </section>
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