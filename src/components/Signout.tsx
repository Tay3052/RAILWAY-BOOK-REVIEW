import Cookies from "js-cookie";
import { Link } from "react-router-dom";
import "../assets/scss/TopPage.scss";

const Signout = () => {
  Cookies.remove("token");
  return (
    <>
      <div className="center">
        <h1 className="title">ログアウト通知</h1>
        <p>ログアウトしました</p>
      </div>

      <div className="center">
        <Link to="/">トップ画面に戻る</Link>
      </div>
    </>
  );
};

export default Signout;
