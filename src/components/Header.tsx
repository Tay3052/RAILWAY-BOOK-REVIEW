import { Outlet, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import "../assets/scss/Header.scss";
import axios from "axios";
import Cookies from "js-cookie";

const Header = () => {
  const [user, setUser] = useState<string>(""); // ユーザー名を格納するstate
  const [token, setToken] = useState<string>(""); // トークンを格納するstate
  useEffect(() => {
    setToken(Cookies.get("token") || "");
    console.log(token);
    axios
      .get("https://railway.bookreview.techtrain.dev/users", {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setUser(res.data.name);
        console.log(user);
      });
  }, [token, user]);

  return (
    <>
      <div className="header">
        <h1>書籍レビュー</h1>
        <p className="user_name">ようこそ {user} さん</p>
      </div>
      <div className="center">
        <ul className="nav_ul">
          <li className="nav_li">
            <Link to={"/"} className="link">
              Home
            </Link>
          </li>
          <li className="nav_li">
            <Link to={"/Signin"} className="link">
              Signin
            </Link>
          </li>
          <li className="nav_li">
            <Link to={"/Signup"} className="link">
              Signup
            </Link>
          </li>
          <li className="nav_li">
            <Link to={"/Signout"} className="link">
              Signout
            </Link>
          </li>
        </ul>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
