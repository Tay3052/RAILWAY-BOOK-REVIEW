import React, { useState } from "react";
import axios from "axios";
import "../assets/scss/SignupSignin.scss";

// Propsの型を定義
interface ReceiveTokenProps {
  token: string;
  pageNumber: number;
}

// 本の情報を取得するコンポーネント
const TokenBooksInfo: React.FC<ReceiveTokenProps> = ({ token }) => {
  const [books, setBooks] = useState([]); // 本の情報を格納するためのstate

  // 本の情報を取得する関数
  // tokenに値が入っている場合のみ実行
  if (token !== undefined) {
    axios
      .get(`https://railway.bookreview.techtrain.dev//books?offset=10`, {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBooks(res.data);
        console.log(books);
      })
      .catch((error) => {
        console.error(error);
      });
  }
  return (
    <>
      <div className="center">
        <h2 className="title">本の情報</h2>
        <ul className="ul">
          {books.map((book) => (
            <li key={book.id} className="li">
              {book.title}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default TokenBooksInfo;
