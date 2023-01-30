import { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/Context";
import "./topbar.css";

const TopBar = () => {
  const {user, dispatch} = useContext(UserContext)

  const pathFolder = "http://localhost:5000/images/"

  const handleLogout = () => {
    dispatch({type: "LOGOUT"})
  }
  
  return (
    <div className="top">
      <div className="topLeft">
        <i className="topIcon fa-brands fa-square-facebook"></i>
        <i className="topIcon fa-brands fa-square-twitter"></i>
        <i className="topIcon fa-brands fa-square-pinterest"></i>
        <i className="topIcon fa-brands fa-square-instagram"></i>
      </div>
      <div className="topCenter">
        <ul className="topList">
            <Link to='/' className="topListItem">HOME</Link>
            <div className="topListItem">ABOUT</div>
            <div className="topListItem">CONTACT</div>
            <Link to='/write' className="topListItem">WRITE</Link>
            <div onClick={handleLogout} className="topListItem">{user && "LOGOUT"}</div>
        </ul>
      </div>
      <div className="topRight">
        {
          user ? <Link to='/profile'><img className="topImg" src={pathFolder + user.profilePic} alt="profile" /></Link> :<> <Link to='/login'>LOGIN</Link> <Link className="ml-4" to='/register'>REGISTER</Link></>
        }
        <i className="topSearchIcon fa-solid fa-magnifying-glass"></i>
      </div>
    </div>
  );
};

export default TopBar;
