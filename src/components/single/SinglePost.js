import PropTypes from "prop-types";
import { useContext } from "react";
import { Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import { BsChat } from "react-icons/bs";
import { AiOutlineLike } from "react-icons/ai";
import AuthContext from "../../context/AuthContext";

function SinglePost({ id, title, body, media, _count, comments, commentsNumber, reactions, reactionsNumber, created, name, avatar }) {

const [auth] = useContext(AuthContext);

 return (
  <>
  <Card>
        <Link to={`detail/${id}`}>
        <div className="created">
					<h4>{created?.replace("2022-", "")}</h4>
				</div>
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
        {avatar ?
         		<>
              <Link to={`/profile/${name}`}><img src={avatar} alt={name} width={50} height={50}></img></Link>
              <Link to={`/profile/${name}`}><h3>{name}</h3></Link>
            </>
        : <Link to={`/profile/${name}`}><h3>{name}</h3></Link> 
        }
          <h2 className="postTitle">{title}</h2>
					<hr />
				</section>
        {body ?
        <section className="postDetails">
					<div>
						<h5>{body}</h5>
					</div>
				</section>
        :<></>}
       </Card.Body>
    <Card.Body className="interactionsFeed">
    <section>
       <div className="commentsHead">
        <h4><AiOutlineLike /></h4>
        <h4>{reactionsNumber}</h4>
        </div>
      </section>
      <hr />
      <section>
        <div className="commentsHead">
        <h4><BsChat /></h4>
        <h4>{commentsNumber}</h4>
        </div>
        {comments ? comments.map((com) => (

        <div className="comments">
          <Link to={`/profile/${com.owner}`}><p className="commentsOwner">{com.owner}:</p></Link>
          <h6 className="commentBody">{com.body}</h6>
        </div>
      )):  <></>}
      
      </section>
       </Card.Body>
       </Link> 
    </Card>
     </>
 );
}

SinglePost.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};

export default SinglePost;