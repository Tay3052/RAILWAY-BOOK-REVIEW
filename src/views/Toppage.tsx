import TokenBooksInfo from '../components/BooksInfoToken';
import { useContext, useEffect, useState } from 'react';
import Cookies from 'js-cookie';
import React from 'react';
import '../assets/scss/SignupSignin.scss';
import UnloginBooks from '../components/UnloginBooks';

const TopPage = () => {
  const [token, setToken] = useState('');
  const [page, setPage] = useState<number>(0);

  useEffect(() => {
    // Cookieからtokenを取得
    // undefinedの場合は空文字をセット
    const token = Cookies.get('token');
    console.log(token);
    if (token) setToken(token);
  }, [token]);

  if (Cookies.get('token') !== undefined) {
    return (
      <>
        <div>
          <TokenBooksInfo token={token} page={page} />
        </div>
      </>
    );
  } else {
    return (
      <>
        <div className='center'>
          <p className='title'>
            会員登録をしていない方はSignupを選択して会員登録を行ってください。
          </p>
        </div>
        {/* 本の情報を書き出す */}
        <UnloginBooks />
      </>
    );
  }
};

export default TopPage;
