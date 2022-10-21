import PropTypes from "prop-types";
import { Link } from "react-router-dom";

function SinglePost({ id, title }) {
 return (
  <Link to={`detail/${id}`}>
   <h5>{id}</h5>
   <p>{title}</p>
  </Link>
 );
}

SinglePost.propTypes = {
  id: PropTypes.number,
  title: PropTypes.string,
};

export default SinglePost;