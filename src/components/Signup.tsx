import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import Compressor from "compressorjs";
import { useEffect, useState } from "react";
import Cookies from "js-cookie";

// バリデーション設定
const validation = Yup.object().shape({
  name: Yup.string().required("名前は必須です"),
  email: Yup.string()
    .email("メールアドレスの形式が違います")
    .required("メールアドレスは必須です"),
  password: Yup.string()
    .min(8, "パスワードは8文字以上です")
    .required("パスワードは必須です"),
  icon: Yup.mixed().required("画像は必須です"),
});

const SignUp = () => {
  const navigate = useNavigate();
  const [token, setToken] = useState(""); // トークンを格納するstate

  useEffect(() => {
    if (Cookies.get("token") !== undefined) {
      navigate("/"); // トークンがある場合はHomeにリダイレクト
    }
  });

  const handleSubmit = async (values, { setSubmitting }) => {
    // ユーザー登録APIとアイコンアップロードAPIに必要なtokenを取得する
    try {
      const res = await axios.post(
        "https://railway.bookreview.techtrain.dev/users",
        {
          name: values.name,
          email: values.email,
          password: values.password,
        }
      );

      setToken(res.data.token); // レスポンスからtokenを取得

      // アイコンアップロードAPIに送信
      const iconFormData = new FormData();
      iconFormData.append("icon", values.icon);

      await axios.post(
        "https://railway.bookreview.techtrain.dev/uploads",
        iconFormData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      console.log("User registered and icon uploaded successfully!");
      navigate("/"); // 成功時に画面遷移
    } catch (error) {
      console.error("Registration error:", error);
    }

    setSubmitting(false); // Submittingの状態をリセット
  };

  const handleFileChange = (event, setFieldValue) => {
    const file = event.currentTarget.files[0];

    // Compressor.js を使用して画像を圧縮
    new Compressor(file, {
      quality: 0.6, // 画像の品質を指定
      maxWidth: 800, // 画像の最大幅を指定
      success(result) {
        // 圧縮された画像をセット
        setFieldValue("icon", result);
      },
      error(err) {
        console.error("Compression failed:", err.message);
      },
    });
  };

  return (
    <Formik
      initialValues={{
        name: "",
        email: "",
        password: "",
        icon: null,
      }}
      validationSchema={validation}
      onSubmit={handleSubmit}>
      {({ values, isSubmitting, setFieldValue }) => (
        <Form>
          <div className="forms">
            <h1>新規登録</h1>
            <label htmlFor="name">名前</label>
            <Field type="text" name="name" id="name" />
            <ErrorMessage
              name="name"
              component="div"
              style={{ color: "red" }}
            />

            <label htmlFor="email">メールアドレス</label>
            <Field type="email" name="email" id="email" />
            <ErrorMessage
              name="email"
              component="div"
              style={{ color: "red" }}
            />

            <label htmlFor="password">パスワード</label>
            <Field type="password" name="password" id="password" />
            <ErrorMessage
              name="password"
              component="div"
              style={{ color: "red" }}
            />

            <label htmlFor="icon">アイコン</label>
            <input
              type="file"
              name="icon"
              accept="image/png, image/jpeg"
              onChange={(event) => handleFileChange(event, setFieldValue)}
            />
            <ErrorMessage
              name="icon"
              component="div"
              style={{ color: "red" }}
            />

            <div>
              {values.icon && (
                <img src={URL.createObjectURL(values.icon)} alt="Uploaded" />
              )}
            </div>

            <button type="submit" disabled={isSubmitting}>
              {isSubmitting ? "登録中です..." : "新規登録"}
            </button>
          </div>
        </Form>
      )}
    </Formik>
  );
};

export default SignUp;
