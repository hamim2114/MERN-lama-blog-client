import Home from "./pages/Home/Home";
import TopBar from "./Components/topbar/TopBar";
import Single from "./Components/Single/Single";
import Write from "./pages/write/Write";
import Settings from "./pages/settings/Settings";
import Login from "./pages/login/Login";
import Register from "./pages/register/Register";
import { Route, Routes } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "./context/Context";

function App() {
  const {user} = useContext(UserContext)

  return (
    <>
      <TopBar />
      <Routes>
        <Route path="/">
          <Route index element={<Home />} />
          <Route path="login" element={user ? <Home/> : <Login />} />
          <Route path="register" element={user ? <Home /> : <Register />} />
          <Route path="write" element={user ? <Write /> : <Register/>} />
          <Route path="posts/:postId" element={<Single />} />
          <Route path="profile" element={user ? <Settings /> : <Login/>}/>
        </Route>
      </Routes>
    </>
  );
}

export default App;
