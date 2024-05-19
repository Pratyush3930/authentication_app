import Home from "./pages/Home/Home";
import Navbar from "./components/Navbar/Navbar";
import Profile from "./pages/Profile/Profile";
import Login from "./pages/Login/Login";
import SignUp from "./pages/SignUp/SignUp";
import { axiosPrivate } from "./utils/axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import EditProfile from "./pages/EditProfile/EditProfile";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [userData, setUserData] = useState();
  // const [correctInfo, setCorrectInfo] = useState(true);
  const [matchPass, setMatchPass] = useState(true);
  const [menu, setMenu] = useState("home");
  const [error, setError] = useState(false);
  const [errMsg, setErrMsg] = useState("");
  const [validPass, setValidPass] = useState(true);

  const newPage = useNavigate();

  const handleLogin = (e, navigate) => {
    e.preventDefault();
    setErrMsg(false);
    const email = e.target.email.value;
    const password = e.target.password.value;
    const userData = { email, password };
    loginUser(userData, navigate);
  };

  const loginUser = async (Data, navigate) => {
    try {
      const res = await axiosPrivate.post("/login", Data);
      if (res.status === 200) {
        // the res.data is automatically parsed here
        const token = JSON.stringify(res.data);
        localStorage.setItem("token", token);
        const udata = JSON.stringify(res.data.user);
        localStorage.setItem("userData", udata);
        setUserData(res.data.user);
        setLoggedIn(true);
        navigate("/");
      } else {
        setError(true);
        setErrMsg(res.data);
        setTimeout(() => window.location.reload(), 500);
        setLoggedIn(false);
        setTimeout(() => setError(false), 4000);
      }
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  const registerUser = async (e, navigate) => {
    e.preventDefault();
    setErrMsg(false);
    setValidPass(true);
    setMatchPass(true);
    const email = e.target.email.value;
    const name = e.target.name.value;
    const password = e.target.password.value;
    const repassword = e.target.repassword.value;
    if (password === repassword) {
      const userData = { name, email, password };
      if (/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*(\W|_)).{5,}$/.test(password)) {
        setValidPass(true);
        try {
          const res = await axiosPrivate.post("/register", userData);
          if (res.status === 200) {
            navigate("/login");
          } else {
            setError(true);
            setErrMsg(res.data);
            setTimeout(() => window.location.reload(), 500);
            setTimeout(() => setError(false), 4000);
          }
        } catch (error) {
          console.log("Login error:", error);
        }
      } else {
        setValidPass(false);
      }
    } else {
      setMatchPass(false);
    }
  };

  const handleEdit = async (e) => {
    try {
      e.preventDefault();
      const name = e.target.name.value;
      const email = e.target.email.value;
      const localData = JSON.parse(localStorage.getItem("token"));
      const token = localData.token;
      const res = await axiosPrivate.put(
        "/profile",
        {
          name: name,
          email: email,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (res.status === 200) {
        console.log(res.data);
        const response = JSON.stringify(res.data);
        console.log(response);
        localStorage.removeItem("token");
        localStorage.setItem("token", response);
        localStorage.setItem("userData", response);
        setUserData(res.data);
        newPage("/profile");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      const localData = JSON.parse(localStorage.getItem("token"));
      const token = localData.token;
      const res = await axiosPrivate.delete("/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(res);
      handleLogOut();
      newPage("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleLogOut = () => {
    // clear user data
    setUserData(null);
    setLoggedIn(false);

    // Clear token from localStorage
    localStorage.removeItem("token");
    localStorage.removeItem("userData");
  };

  // This keeps the user logged in even after page reloads
  useEffect(() => {
    // localStorage.removeItem("userData");
    const uData = JSON.parse(localStorage.getItem("userData"));
    if (uData) {
      setUserData(uData);
      setLoggedIn(true);
    }
  }, []);

  return (
    <div className="mx-20 my-2 flex flex-col min-h-[24rem]">
      <Navbar
        loggedIn={loggedIn}
        userData={userData}
        setMenu={setMenu}
        menu={menu}
      />
      <Routes>
        <Route
          path="/"
          element={
            <Home
              handleLogOut={handleLogOut}
              loggedIn={loggedIn}
              setMenu={setMenu}
            />
          }
        ></Route>
        <Route
          path="/profile"
          element={<Profile userData={userData} handleDelete={handleDelete} />}
        ></Route>
        <Route
          path="/signup"
          element={
            <SignUp
              matchPass={matchPass}
              registerUser={registerUser}
              error={error}
              errMsg={errMsg}
              validPass={validPass}
            />
          }
        ></Route>
        <Route
          path="/login"
          element={
            <Login handleLogin={handleLogin} error={error} errMsg={errMsg} />
          }
        ></Route>
        <Route
          path="/editprofile"
          element={<EditProfile handleEdit={handleEdit} />}
        ></Route>
      </Routes>
    </div>
  );
}

export default App;
