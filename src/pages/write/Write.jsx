import axios from "axios";
import { useContext, useTransition } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { UserContext } from "../../context/Context";
import "./write.css";

const Write = () => {
  const [title, setTitle] = useState("");
  const [desc, setDescription] = useState("");
  const [file, setFile] = useState("");

  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPost = {
      username: user.username,
      title: title,
      desc: desc,
    };
    if (file) {
      const data = new FormData();
      const fileName = Date.now() + file.name;
      data.append("name", fileName);
      data.append("file", file);
      newPost.photo = fileName;
      try {
        await axios.post("http://localhost:5000/api/upload", data);
      } catch (error) {
        console.log(error);
      }
    }
    try {
      const res = await axios.post("http://localhost:5000/api/posts", newPost);
      res.data && navigate(`/posts/${res.data._id}`);
    } catch (error) {
      console.log(error)
    }
  };

  return (
    <div className="write">
      {file && <img
        className="writeImg"
        src={URL.createObjectURL(file)}
        alt=""
      />}
      <form className="writeForm" onSubmit={handleSubmit}>
        <div className="writeFormGroup">
          <label htmlFor="fileInput">
            <i className="writeIcon fa-solid fa-circle-plus"></i>
          </label>
          <input onChange={e => setFile(e.target.files[0])} type="file" id="fileInput" style={{ display: "none" }} />
          <input
            type="text"
            placeholder="title"
            className="writeInput"
            autoFocus={true}
            onChange={(e) => setTitle(e.target.value)}
          />
        </div>
        <div className="writeFormGroup">
          <textarea
            className="writeInput writeText"
            placeholder="Story.."
            type="text"
            onChange={(e) => setDescription(e.target.value)}
          ></textarea>
        </div>
        <button
          className="absolute top-[20px] right-[12%] font-bold bg-teal-500 text-white py-3 px-6 rounded-xl"
          type="submit"
        >
          Publish
        </button>
      </form>
    </div>
  );
};

export default Write;
