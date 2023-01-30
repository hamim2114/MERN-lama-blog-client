import "./singlePost.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useContext, useEffect, useState } from "react";
import axios from "axios";
import { UserContext } from "../../context/Context";

const SinglePost = () => {
  const [post, setPost] = useState(null);
  const [title, setTitle] = useState(null);
  const [desc, setDesc] = useState(null);
  const [editmode, setEditMode] = useState(false);

  const location = useLocation();
  const path = location.pathname.split("/")[2];

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const pathFolder = "http://localhost:5000/images/";

  useEffect(() => {
    const getPost = async () => {
      const res = await axios.get("http://localhost:5000/api/posts/" + path);
      setPost(res.data);
      setTitle(res.data.title);
      setDesc(res.data.desc);
    };
    getPost();
  }, [path]);

  const handleUpdate = async () => {
    try {
      await axios.put(`http://localhost:5000/api/posts/${post._id}`, {
        username: user.username,
        title,
        desc,
      });
      setEditMode(false)
    } catch (error) {}
  };

  const handleDelete = async () => {
    try {
      await axios.delete("http://localhost:5000/api/posts/" + path, {
        data: { username: post.username },
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <div className="singlePost">
      {!post ? (
        <div className=" text-2xl font-bold text-gray-500">loading..</div>
      ) : (
        <div className="singlePostWrapper">
          {post.photo && (
            <img
              className="singlePostImg"
              src={pathFolder + post.photo}
              alt=""
            />
          )}
          <h1 className="singlePostTitle">
            {editmode ? (
              <input
                onChange={(e) => setTitle(e.target.value)}
                className=" border rounded-xl w-full focus:outline-none"
                value={title}
                type="text"
              />
            ) : (
              post.title
            )}
            {post.username === user?.username && (
              <div className="singlePostEdit">
                <i
                  onClick={() => setEditMode(true)}
                  className="singlePostIcon fa-solid fa-pen-to-square"
                ></i>
                <i
                  className="singlePostIcon fa-solid fa-trash-can"
                  onClick={handleDelete}
                ></i>
              </div>
            )}
          </h1>
          <div className="singlePostInfo">
            <Link to={`/?user=${post.username}`} className="singlePostAuthor">
              Author: <b>{post.username}</b>
            </Link>
            <span className="singlePostDate">
              {new Date(post.createdAt).toDateString()}
            </span>
          </div>
          {editmode ? (
            <textarea
              onChange={(e) => setDesc(e.target.value)}
              className="focus:outline-none border rounded-xl w-full h-[20rem]"
              type="text"
              value={desc}
            />
          ) : (
            <p className="singlePostDesc">{post.desc}</p>
          )}
          {editmode && (
            <button
              onClick={handleUpdate}
              className="bg-teal-500 py-2 px-6 rounded-lg "
            >
              Update
            </button>
          )}
        </div>
      )}
    </div>
  );
};

export default SinglePost;
