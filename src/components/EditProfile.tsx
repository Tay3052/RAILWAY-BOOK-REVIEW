import { Formik, Form, Field } from 'formik';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import axios from 'axios';

interface Values {
  name: string;
}

const EditProfile = () => {
  const token = Cookies.get('token') || '';
  const navigate = useNavigate();

  const handleSubmit = (
    values: Values,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void },
  ) => {
    const form = new FormData();
    form.append('name', values.name);
    axios
      .put('https://railway.bookreview.techtrain.dev/users', values, {
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

    setSubmitting(false);
    navigate('/');
  };

  return (
    <>
      <div>
        <Formik
          initialValues={{
            name: '',
          }}
          onSubmit={handleSubmit}>
          {({ isSubmitting }) => (
            <Form>
              <div className='forms'>
                <h1>プロフィール変更</h1>
                <label htmlFor='name'>名前</label>
                <Field type='text' name='name' id='name' />
                <button type='submit' disabled={isSubmitting}>
                  {isSubmitting ? '登録中です...' : '変更登録'}
                </button>
              </div>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EditProfile;
