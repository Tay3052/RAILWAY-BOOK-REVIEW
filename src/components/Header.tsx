import { Outlet } from "react-router-dom";
import "../assets/scss/Header.scss";

const Header = () => {
  return (
    <>
      <div className="header">
        <h1>書籍レビュー</h1>
      </div>
      <Outlet />
    </>
  );
};

export default Header;
