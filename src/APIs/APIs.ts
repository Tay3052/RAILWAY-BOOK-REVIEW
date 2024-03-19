import axios from "axios";

const url = "https://railway.bookreview.techtrain.dev";

const signUpApi = () => {
  const res = axios.post(`${url}/signup`, data, {});
};

const signInApi = (email: string, password: string) => {
  const res = fetch(`${url}/signin`, {
    method: "POST",
    body: JSON.stringify({
      email: email,
      password: password,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // クッキーを送信するためのオプション
  });

  const resData = res.then((res) => res.json());
  return resData;
};

const getUser = (name: string, iconUrl: string) => {
  const res = fetch(`${url}/users`, {
    method: "GET",
    body: JSON.stringify({
      name: name,
      iconUrl: iconUrl,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });

  const resData = res.then((res) => res.json());
  return resData;
};

export { signUpApi, signInApi, getUser };
