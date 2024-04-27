/* eslint-disable react-hooks/rules-of-hooks */
import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "../assets/scss/TopPage.scss";
import { useEffect } from "react";

const Signout = () => {
  if ((Cookies.get("token") || "") !== undefined) {
    useEffect(() => {
      Cookies.remove("token"); // トークンがある場合はHomeにリダイレクト
    });
    return (
      <>
        <div className="center">
          <h1 className="title" style={{ margin: "20px 0 0 0" }}>
            ログアウト通知
          </h1>
          <p>ログアウトしました</p>
        </div>

        <div className="center">
          <Link to="/">トップ画面に戻る</Link>
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className="center">
          <h1 className="title">ログイン出来ていません</h1>
        </div>
        <div className="center">
          <Link to="/">トップ画面に戻る</Link>
        </div>
      </>
    );
  }
};
export default Signout;
