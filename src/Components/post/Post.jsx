import { Link } from 'react-router-dom';
import './post.css';

const Post = ({post}) => {
  const pathFolder = "http://localhost:5000/images/"
    return (
      <div className="post">
        {post.photo && (
          <img
            className="postImg"
            src={pathFolder + post.photo}
            alt="image"
          />
        )}
        <div className="postInfo">
          <div className="postCats">
            {post.category.map((c) => (
              <span className="postCat">{c.name}</span>
            ))}
          </div>
          <Link to={`/posts/${post._id}`} className="postTitle">
            {post.title}
          </Link>
          <hr />
          <span className="postDate">
            {new Date(post.createdAt).toDateString()}
          </span>
        </div>
        <p className="postDesc">{post.desc}</p>
      </div>
    );
};

export default Post;