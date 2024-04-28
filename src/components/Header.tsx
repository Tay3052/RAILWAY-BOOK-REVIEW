import { Outlet, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import '../assets/scss/Header.scss';
import axios from 'axios';
import Cookies from 'js-cookie';

const Header = () => {
  const [user, setUser] = useState<string>(''); // ユーザー名を格納するstate
  const [token, setToken] = useState<string>(''); // トークンを格納するstate

  const cookie = Cookies.get('token');

  useEffect(() => {
    setToken(cookie ?? '');
    console.log(token);
    if (token !== undefined) {
      axios
        .get('https://railway.bookreview.techtrain.dev/users', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then((res) => {
          setUser(res.data.name);
          console.log(user);
        });
    }
    [token, user];
  }, [cookie, token, user]);

  if (user === '') {
    setUser('ゲスト');
  }

  if (token !== Cookies.get('token')) {
    return (
      <>
        <div className='header'>
          <div className='header'>
            <h1>
              <p className='link'>書籍レビュー</p>
            </h1>
          </div>
          <p className='user_name'>ようこそ {user} さん</p>
        </div>
        <div className='center'>
          <ul className='nav_ul'>
            <li className='nav_li'>
              <Link to={'/'} className='link'>
                Home
              </Link>
            </li>
            <li className='nav_li'>
              <Link to={'/signin'} className='link'>
                Signin
              </Link>
            </li>
            <li className='nav_li'>
              <Link to={'/signup'} className='link'>
                Signup
              </Link>
            </li>
            <li className='nav_li'>
              <Link to={'/signout'} className='link'>
                Signout
              </Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </>
    );
  } else {
    return (
      <>
        <div className='header'>
          <h1>
            <Link className='link' to={'/unlogin'}>
              書籍レビュー
            </Link>
          </h1>
          <p className='user_name'>ようこそ {user} さん</p>
        </div>
        <div className='center'>
          <ul className='nav_ul'>
            <li className='nav_li'>
              <Link to={'/'} className='link'>
                Home
              </Link>
            </li>
            <li className='nav_li'>
              <Link to={'/profile'} className='link'>
                Profile編集
              </Link>
            </li>
            <li className='nav_li'>
              <Link to={'/new'} className='link'>
                本の投稿
              </Link>
            </li>
            <li className='nav_li'>
              <Link to={'/signout'} className='link'>
                Signout
              </Link>
            </li>
          </ul>
        </div>
        <Outlet />
      </>
    );
  }
};

export default Header;
