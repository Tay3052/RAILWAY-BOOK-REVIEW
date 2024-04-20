import Home from "../components/Home";
import TokenBooksInfo from "../components/BooksInfoToken";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";
const TopPage = () => {
  const [token, setToken] = useState("");

  useEffect(() => {
    // Cookieからtokenを取得
    // undefinedの場合は空文字をセット
    const token = Cookies.get("token") || "";
    console.log(token);
    if (token) setToken(token);
  }, []);

  return (
    <>
      <Home />
      {/* 本の情報を書き出す */}
      <TokenBooksInfo token={token} />
    </>
  );
};

export default TopPage;
