import PropTypes from "prop-types";
import { useContext } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import AuthContext from "../../context/AuthContext";

function SinglePost({ id, title, body, media, _count, comments, commentsNumber, reactions, reactionsNumber, tags, name, avatar }) {

const [auth] = useContext(AuthContext);

 return (
  <>
  <Card>
        <Link to={`detail/${id}`}>
        {media ?
        <Card.Body className="post-container">
         <div className="postImg">
          <img src={media} alt={title} width="100%" height="auto"></img>
          </div>
          </Card.Body>
          : <></>
        }
       <Card.Body>
       <section className="authorLinksPost">
					<Link to={`/profile/${name}`}><img src={avatar} alt={name} width={50} height={50}></img></Link>
					<Link to={`/profile/${name}`}><h3>{name}</h3></Link>
            <h2 className="postTitle">{title}</h2>
					<hr />
				</section>
        <section className="postDetails">
					<div>
						<h5>{body}</h5>
					</div>
				</section>
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
        {comments ? comments.map((com) => (

        <div className="comments">
        
					<div className="commentsInner">
          <Link to={`/profile/${com.owner}`}><p>{com.owner}:</p></Link>
          <p>{com.body}</p>
        </div>
        </div>
      )):  <></>}
      
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