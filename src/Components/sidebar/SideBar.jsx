import { useEffect } from "react";
import { useState } from "react";
import "./sidebar.css";
import axios from 'axios'
import { Link } from "react-router-dom";

const SideBar = () => {
  const [cats, setCats] = useState([])

  useEffect(() => {
    const getCats = async () => {
      const res = await axios.get('http://localhost:5000/api/categories')
      setCats(res.data)
    }
    getCats()
  },[])
  return (
    <div className="sidebar">
      <div className="sidebarItem">
        <span className="sidebarTitle">ABOUT ME</span>
        <img src="https://www.w3schools.com/howto/img_avatar.png" alt="" />
        <p>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Quidem
          pariatur a, ratione amet voluptatum unde voluptates hic libero rem
          provident qui cupiditate.
        </p>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">CATEGORIES</span>
        <ul className="sidebarList">
          {cats.map(c => (
            <Link to={`/?category=${c.name}`} key={c._id} className="sidebarListItem ml-2">{c.name}</Link>
          ))}
          
        </ul>
      </div>
      <div className="sidebarItem">
        <span className="sidebarTitle">FOLLOW US</span>
        <div className="sidebarSocial">
          <i className="sidebarIcon fa-brands fa-square-facebook"></i>
          <i className="sidebarIcon fa-brands fa-square-twitter"></i>
          <i className="sidebarIcon fa-brands fa-square-pinterest"></i>
          <i className="sidebarIcon fa-brands fa-square-instagram"></i>
        </div>
      </div>
    </div>
  );
};

export default SideBar;
