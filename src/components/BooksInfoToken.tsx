import React, { useEffect, useState, useContext } from "react";
import axios from "axios";
import "../assets/scss/SignupSignin.scss";
import { Pagination } from "@yamada-ui/react";

// Propsの型を定義
interface Books {
  id: number;
  title: string;
}

interface ReceiveTokenProps {
  token: string;
  page: number;
}

// コンテキストを作成
export const MyContext1 = React.createContext<number>(0);

// 本の情報を取得するコンポーネント
const TokenBooksInfo: React.FC<ReceiveTokenProps> = ({ token, page }) => {
  const [books, setBooks] = useState<Books[]>([]); // 本の情報を格納するためのstate
  const count = useContext(MyContext1);

  useEffect(() => {
    if (token) getBooks(page);
  }, [token, page]);

  // 本の情報を取得する関数
  // tokenに値が入っている場合のみ実行
  const getBooks = (page: number) => {
    axios
      .get(
        `https://railway.bookreview.techtrain.dev//books?offset=${
          (page - 1) * 10 // ページ数から取得する本の数を計算
        }`,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        setBooks(res.data);
        console.log(books);
      })
      .catch((error) => {
        console.error(error);
      });
  };

  const handlePageChange = (page: number) => {
    getBooks(page);
  };

  return (
    <>
      <div className="center">
        <h1 className="title">本の情報</h1>
        <ul className="ul center">
          {books.map((book) => (
            <li key={book.id} className="li">
              {book.title}
            </li>
          ))}
        </ul>
      </div>
      <div className="center" style={{ margin: "20px 0 0 0" }}>
        <Pagination
          total={books.length}
          size="xl"
          current={count}
          pageSize={10}
          variant="ghost"
          colorScheme="secondary"
          withEdges
          onChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TokenBooksInfo;
