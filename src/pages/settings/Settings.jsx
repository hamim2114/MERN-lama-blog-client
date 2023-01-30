import axios from "axios";
import { useContext } from "react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import SideBar from "../../Components/sidebar/SideBar";
import { UserContext } from "../../context/Context";
import "./settings.css";

const Settings = () => {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPass] = useState('')
  const [file, setFile] = useState(null)
  const [success, setSuccess] = useState(false)

  const navigate = useNavigate()
  const pathFolder = "http://localhost:5000/images/"

  const {user, dispatch, isFetching} = useContext(UserContext);

 const handleDelete = async () => {
  try {
    await axios.delete("http://localhost:5000/api/user/" + user._id, {
      data: {userId: user._id}
    })
    dispatch({type: "LOGOUT"})
  } catch (error) {
    
  }
 }
  
  const handleSubmit = async (e) => {
    
    e.preventDefault()
    const updatedUser = {
      userId: user._id,
      username,
      email,
      password
    }
    if(file) {
      const data = new FormData()
      const fileName = Date.now() + file.name;
      data.append("name", fileName)
      data.append("file", file)
      updatedUser.profilePic = fileName;
      try {
        const res = await axios.post("http://localhost:5000/api/upload", data)
        console.log(res);
      } catch (error) {
        console.log(error)
      }
    }
    try {
      const res = await axios.put("http://localhost:5000/api/user/" + user._id, updatedUser);
      res.data && dispatch({type: "UPDATE_SUCCESS", payload: res.data})
      setSuccess(true)
      window.location.reload()
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="settings">
      <div className="settingsWrapper">
        <div className="settingsTitle">
            <span className="settingsUpdateTitle">Update Account</span>
            <span onClick={handleDelete} className="settingsDeleteTitle">Delete Account</span>
        </div>
        <form onSubmit={handleSubmit} className="settingsForm">
            <label>Profile Picture</label>
            <div className="settingsPP">
                <img src={file && URL.createObjectURL(file) || pathFolder + user.profilePic} alt="profilePic" />
                <label htmlFor="fileInput">
                <i className="settingsPPIcon fa-regular fa-circle-user"></i>
                </label>
                <input onChange={e => setFile(e.target.files[0])} type="file" id="fileInput" style={{display: 'none'}} />
            </div>
            <label>Username</label>
            <input onChange={e => setUsername(e.target.value)} type="text" placeholder={user.username} />
            <label>Email</label>
            <input onChange={e => setEmail(e.target.value)} type="email" placeholder={user.email} />
            <label>Password</label>
            <input onChange={e => setPass(e.target.value)} type="password" />
            <button disabled={isFetching} className=" disabled:bg-teal-200 disabled:cursor-wait bg-teal-600 w-[150px] h-[40px] rounded-lg mt-5" type="submit">Update</button>
            {success && <span className="text-green-500 mt-2">Profile Updated</span>}
        </form>
      </div>
      <SideBar />
    </div>
  );
};

export default Settings;
