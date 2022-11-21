import PropTypes from "prop-types";
import { useContext } from "react";
import { Card, CardImg } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import AuthContext from "../../context/AuthContext";

function SinglePost({ id, title, body, media, _count, comments, commentsNumber, reactions, reactionsNumber, author, name, avatar }) {

const [auth] = useContext(AuthContext);

 return (
  <>
  <Card>
        <Link to={`detail/${id}`}>
        {media ?
        <Card.Body className="post-container">
         <div className="postImg">
          <img src={media} width="100%" height="auto"></img>
          </div>
          </Card.Body>
          : <></>
        }
       <Card.Body>
       <section className="authorLinksPost">
					<Link to={`/profile/${name}`}><img src={avatar} width={50} height={50}></img></Link>
					<Link to={`/profile/${name}`}><h3>{name}</h3></Link>
            <h2 className="postTitle">{title}</h2>
					<hr />
				</section>
       <div className="postText">
         <h5>{body}</h5>
        </div>
       </Card.Body>
       <section>
        <div className="feedReactions">
       {reactions ? reactions.map((emoji) => (
          <p>{emoji.symbol}</p>
      )):  <p>0</p>}
      </div>
      </section>
       </Link>
   </Card>
   <Card> 
    <Card.Body className="interactionsFeed">
      <section>
        <div className="commentsHead">
        <h6><BsChat /></h6>
        <h6>{commentsNumber}</h6>
        </div>
        <hr />
        <div className="comments">
        {comments ? comments.map((com) => (
					<div className="commentsInner">
          <Link to={`/profile/${com.owner}`}><p>{com.owner}:</p></Link>
          <p>{com.body}</p>
        </div>
      )):  <></>}
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