import axios from 'axios';
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
  url: Yup.string().required('URLは必須です').url('URLの形式が違います'),
  detail: Yup.string().required('詳細は必須です'),
  review: Yup.string().required('1文字以上は必須です'),
});

const NewBooks = () => {
  const token = Cookies.get('token');
  const navigate = useNavigate();
  const booksForm = new FormData();
  booksForm.append('title', '');
  booksForm.append('url', '');
  booksForm.append('detail', '');
  booksForm.append('review', '');

  const handleSubmit = async (
    values: Book,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    axios
      .post('https://railway.bookreview.techtrain.dev/books', values, {
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
      })
      .finally(() => {
        setSubmitting(false);
        navigate('/');
      });
  };
  return (
    <>
      <div>
        <Formik
          initialValues={{
            title: '',
            url: '',
            detail: '',
            review: '',
          }}
          validationSchema={validation}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className='forms'>
                <h1>新規本登録</h1>
                <label htmlFor='title'>タイトル</label>
                <Field type='text' name='title' id='title' />
                <ErrorMessage
                  name='title'
                  component='div'
                  className='error'
                  style={{ color: 'red' }}
                />
                <label htmlFor='url'>URL</label>
                <Field type='text' name='url' id='url' />
                <ErrorMessage
                  name='url'
                  component='div'
                  className='error'
                  style={{ color: 'red' }}
                />
                <label htmlFor='detail'>詳細</label>
                <Field type='text' name='detail' id='detail' />
                <ErrorMessage
                  name='detail'
                  component='div'
                  className='error'
                  style={{ color: 'red' }}
                />
                <label htmlFor='review'>レビュー</label>
                <Field type='text' name='review' id='review' />
                <ErrorMessage
                  name='review'
                  component='div'
                  className='error'
                  style={{ color: 'red' }}
                />
                <button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? '登録中です...' : '登録'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default NewBooks;
