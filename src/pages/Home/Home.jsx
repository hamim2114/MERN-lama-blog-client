import axios from "axios";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import Header from "../../Components/Header/Header";
import Posts from "../../Components/posts/Posts";
import SideBar from "../../Components/sidebar/SideBar";
import "./home.css";

const Home = () => {
    const [posts, setPost] = useState([]);
    const {search} = useLocation();

    useEffect(()=> {
        const fetchPost = async () => {
            const res = await axios.get('http://localhost:5000/api/posts'+search)
            setPost(res.data)
        }
        fetchPost()
    },[search])
  return (
    <>
      <Header />
      <div className="home">
        <Posts posts={posts} key={posts._id} />
        <SideBar />
      </div>
    </>
  );
};

export default Home;
