import TokenBooksInfo from "../components/BooksInfoToken";
import { useContext, useEffect, useState } from "react";
import Cookies from "js-cookie";
import React from "react";
import "../assets/scss/SignupSignin.scss";

export const MyContext = React.createContext<number>(0);

const TopPage = () => {
  const [token, setToken] = useState("");
  const [page, setPage] = useState(0);
  const myContextValue = useContext(MyContext);

  useEffect(() => {
    // Cookieからtokenを取得
    // undefinedの場合は空文字をセット
    const token = Cookies.get("token") || "";
    console.log(token);
    if (token) setToken(token);
    if (myContextValue) setPage(myContextValue);
  }, [token, myContextValue]);

  return (
    <>
      <MyContext.Provider value={page}>
        {/* 本の情報を書き出す */}
        <TokenBooksInfo token={token} page={page} />
      </MyContext.Provider>
    </>
  );
};

export default TopPage;
