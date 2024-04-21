import Cookies from "js-cookie";
import { Link } from "react-router-dom";

const Signout = () => {
  Cookies.remove("token");
  return (
    <>
      <div>
        <p>ログアウトしました</p>
      </div>

      <div>
        <Link to="/">トップ画面に戻る</Link>
      </div>
    </>
  );
};

export default Signout;
