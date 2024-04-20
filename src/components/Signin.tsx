import { Link } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import "../assets/scss/SignupSignin.scss";
import { useNavigate } from "react-router-dom";

const validation = Yup.object().shape({
  email: Yup.string()
    .email("メールアドレスの形式が違います")
    .required("メールアドレスは必須です"),
  password: Yup.string()
    .min(8, "パスワードは8文字以上です")
    .required("パスワードは必須です"),
});

const Signin = () => {
  const navigate = useNavigate();
  const [cookie, setCookies] = useCookies(["token"]);

  // anyになるのはなぜ？
  const handleSubmit = async (values, { setSubmitting }) => {
    const signinForm = new FormData();
    signinForm.append("email", values.email);
    signinForm.append("password", values.password);

    try {
      const res = await axios.post(
        "https://railway.bookreview.techtrain.dev/signin",
        signinForm,
        {
          headers: { "Content-Type": "application/json" },
        }
      );
      setCookies("token", res.data.token);
    } catch (error) {
      console.error(error);
    }

    const token = cookie.token;
    console.log(token);

    try {
      const pic = await axios.get(
        "https://railway.bookreview.techtrain.dev/users",
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          responseType: "blob",
        }
      );
      const data = pic.data;
      const blob = new Blob([data], { type: "image/jpeg, image/png" });
      const imgUrl = window.URL.createObjectURL(blob);

      console.log(data, imgUrl);
      console.log("Success!");
      // フォームの送信が完了したら、Submittingの状態をリセットする
      setSubmitting(false);
      navigate("/"); // 画面遷移が出来たら成功
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <Formik
        initialValues={{ email: "", password: "" }}
        validationSchema={validation}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <>
            <div className="forms">
              <h1>ログイン</h1>
              <Form>
                <label htmlFor="email">メールアドレス</label>
                <br />
                <Field type="email" name="email" id="email" />
                <ErrorMessage
                  name="email"
                  component="div"
                  render={(message) => (
                    <div style={{ color: "red" }}>{message}</div>
                  )}
                />
                <br />
                <label htmlFor="password">パスワード</label>
                <br />
                <Field type="password" name="password" id="password" />
                <ErrorMessage
                  name="password"
                  component="div"
                  render={(message) => (
                    <div style={{ color: "red" }}>{message}</div>
                  )}
                />
                <br />
                <button
                  type="submit"
                  disabled={isSubmitting}
                  id="submit"
                  className="signinbtn">
                  {isSubmitting ? "ログイン中..." : "ログイン"}
                </button>
              </Form>
            </div>

            <div className="signup">
              <Link to="/signup">新規登録はこちら</Link>
            </div>
          </>
        )}
      </Formik>
    </>
  );
};

export default Signin;
