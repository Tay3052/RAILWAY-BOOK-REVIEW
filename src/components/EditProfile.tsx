import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";

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

const EditProfile = () => {
  return (
    <>
      <div className="center">
        <Form>
          
        </Form>
      </div>
    </>
  );
};
