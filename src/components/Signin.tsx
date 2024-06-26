import { Link, useNavigate } from "react-router-dom";
import "./style.css";
import axios from "axios";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { useCookies } from "react-cookie";
import "../assets/scss/TopPage.scss";
import Cookies from "js-cookie";
import { useEffect } from "react";

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
  const [cookie, setCookie] = useCookies(["token"]);
  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      navigate("/"); // トークンがある場合はHomeにリダイレクト
    }
  });
  const handleSubmit = async (values, { setSubmitting }) => {
    const signinForm = new FormData();
    signinForm.append("email", values.email);
    signinForm.append("password", values.password);
    const res = await axios.post(
      "https://railway.bookreview.techtrain.dev/signin",
      signinForm,
      {
        headers: { "Content-Type": "application/json" },
      }
    );
    // クッキーをセットすることで、トークンを保持する
    // こうやってセットするとクッキー文字列だけ保存できた
    setCookie("token", res.data.token, { path: "/" });
    const token = res.data.token;
    console.log(cookie.token);

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
    const blob = new Blob([data], { type: "image/*" });
    const imgUrl = window.URL.createObjectURL(blob);

    console.log(pic, imgUrl);
    console.log("Success!");
    // フォームの送信が完了したら、Submittingの状態をリセットする
    setSubmitting(false);
    navigate("/"); // 画面遷移が出来たら成功
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
