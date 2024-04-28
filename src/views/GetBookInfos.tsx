import { useEffect, useState } from 'react';
import axios from 'axios';
import Cookies from 'js-cookie';
import { Link } from 'react-router-dom';

export interface bookInfo {
  id: string;
  title: string;
  url: string;
  detail: string;
  review: string;
  reviewer: string;
  isMine: boolean;
}

const GetBookInfos = ({ id }: { id: string }) => {
  console.log(id);
  const [bookInfos, setBookInfos] = useState<bookInfo[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const token = Cookies.get('token');
  useEffect(() => {
    axios
      .get(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        // レスポンスデータが配列であるかどうかを確認し、
        // 配列であればそのまま設定し、そうでない場合は適切な処理を行う
        if (Array.isArray(res.data)) {
          setBookInfos(res.data);
        } else {
          setBookInfos([res.data]);
        }
        setLoading(false);
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, token]);

  if (loading) {
    return <p className='center'>読み込み中...</p>;
  }

  return (
    <>
      <div className='center'>
        <h1 className='title'>本の情報</h1>
        <ul className='ul'>
          {bookInfos.map((book) => (
            <li key={book.id}>
              <h2>タイトル：{book.title}</h2>
              <span>ページ：</span>
              <a href={book.url}>リンク</a>
              <p>詳細：{book.detail}</p>
              <p>レビュー：{book.review}</p>
              <p>レビュワー：{book.reviewer}</p>
              <p style={{ color: 'red' }}>
                {book.isMine ? (
                  <Link to={`/edit/${id}`}>編集する</Link>
                ) : (
                  '他の人の本です'
                )}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};
export default GetBookInfos;
