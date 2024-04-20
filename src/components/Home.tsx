import { Link } from "react-router-dom";
import "../assets/scss/TopPage.scss";
const Home = () => {
  return (
    // BEMの命名規則を使用
    <>
      <h1 className="title">Home</h1>
      <div className="linkDiv">
        <Link to="/signup" className="link">
          新規登録はこちら
        </Link>
      </div>
      <div className="linkDiv">
        <Link to="/signin" className="link">
          サインインはこちら
        </Link>
      </div>
    </>
  );
};

export default Home;
