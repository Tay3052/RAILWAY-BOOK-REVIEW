import React, { useState } from "react";
import { Formik, Form, Field } from "formik";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";

const EditProfile = () => {
  const [name, setName] = useState(""); // ユーザー名を格納するstate
  const token = Cookies.get("token") || "";

  const handleSubmit = async (
    values,
    { setSubmitting }: { setSubmitting: (isSubmitting: boolean) => void }
  ) => {
    const name = await axios.put(
      "https://railway.bookreview.techtrain.dev/users",
      values.name,
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );
  };

  return (
    <>
      <Formik
        initialValues={{
          name: "",
        }}
        onSubmit={handleSubmit}>
        {({ isSubmitting }) => (
          <Form>
            <div className="forms">
              <h1>プロフィール変更</h1>
              <label htmlFor="name">名前</label>
              <Field
                type="text"
                name="name"
                id="name"
                onSubmit={setName(name)}
              />
              <button type="submit" disabled={isSubmitting}>
                {isSubmitting ? "登録中です..." : "新規登録"}
              </button>
            </div>
          </Form>
        )}
      </Formik>
    </>
  );
};

export default EditProfile;
