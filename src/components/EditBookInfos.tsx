import axios from 'axios';
import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

interface Book {
  title: string;
  url: string;
  detail: string;
  review: string;
}

const validation = Yup.object().shape({
  title: Yup.string().required('タイトルは必須です'),
  url: Yup.string().url('URLの形式が違います'),
  detail: Yup.string().required('詳細は必須です'),
  review: Yup.string().required('レビューは必須です'),
});

const EditBooksInfo = () => {
  const { id } = useParams<{ id: string }>();
  const [loading, setLoading] = useState<boolean>(true);
  const [book, setBook] = useState<Book>([]); // 書籍の情報を格納するstate
  const token = Cookies.get('token');
  const navigate = useNavigate();

  useEffect(() => {
    // ページがマウントされたときに書籍の情報を取得
    axios
      .get(`https://railway.bookreview.techtrain.dev/books/${id}`, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        setBook(res.data); // 取得した書籍の情報をstateにセット
        setLoading(false); // ローディングが完了したことを示す
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [id, token]);

  if (loading) {
    return <p className='center'>読み込み中...</p>;
  }

  const handleSubmit = (values: Book) => {
    const form = new FormData();
    form.append('title', values.title);
    form.append('url', values.url);
    form.append('detail', values.detail);
    form.append('review', values.review);

    axios
      .put(`https://railway.bookreview.techtrain.dev/books/${id}`, form, {
        headers: {
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      })
      .finally(() => {
        setLoading(false);
        navigate('/');
      });
  };

  const deleteBook = () => {
    axios.delete(`https://railway.bookreview.techtrain.dev/books/${id}`, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });
  };
  return (
    <>
      <div className='center'>
        <Formik
          initialValues={{
            title: book.title || '', // 書籍の情報があれば最初にセットし、なければ初期値をセット
            url: book.url || '',
            detail: book.detail || '',
            review: book.review || '',
          }}
          validationSchema={validation}
          onSubmit={handleSubmit}>
          <Form className='center'>
            <h1 className='title'>本の情報を編集</h1>

            <label htmlFor='title'>タイトル</label>
            <Field name='title' type='text' />

            <label htmlFor='url'>URL</label>
            <Field name='url' type='text' />
            <ErrorMessage
              name='url'
              component='div'
              className='error'
              style={{ color: 'red' }}
            />

            <label htmlFor='detail'>詳細</label>
            <Field name='detail' type='text' />
            <label htmlFor='review'>レビュー</label>
            <Field name='review' type='text' />
            <button type='submit'>更新</button>

            <button onClick={deleteBook}>削除する</button>
          </Form>
        </Formik>
      </div>
    </>
  );
};

export default EditBooksInfo;
