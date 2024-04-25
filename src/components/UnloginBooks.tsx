import { useEffect, useState } from "react";
import axios from "axios";
import "../assets/scss/TopPage.scss";

const UnloginBooks = () => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [books, setBooks] = useState([]); // 書籍情報を格納するstate
  useEffect(() => {
    axios
      .get("https://railway.bookreview.techtrain.dev/public/books?offset=10")
      .then((res) => {
        setBooks(res.data);
        console.log(books);
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  });

  return (
    <>
      <div className="center">
        <h1 className="title">本の情報</h1>
        <ul className="ul">
          {books.map((book) => (
            <li className="center" style={{ color: "blue" }} key={book.id}>
              {book.title}
            </li>
          ))}
        </ul>
        <p style={{ margin: "20px 0 0 0" }}>
          他タイトルの検索は会員登録をしてください。
        </p>
      </div>
    </>
  );
};

export default UnloginBooks;
