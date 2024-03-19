import { useEffect, useState } from "react";
import { signInApi } from "../APIs/APIs";
import { Link } from "react-router-dom";
import { useCookies } from "react-cookie";
import "./style.css";
export const Signup = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const res = async (email: string, password: string) => {
    await signInApi(email, password);
    console.log("signInApi");
  };

  return (
    <>
      <h1>ログイン</h1>
      <div className="signin_outer">
        <form action="/home">
          <p>メールアドレス</p>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <br />
          <p>パスワード</p>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            onChange={() => {
              res;
            }}>
            Sign In
          </button>
        </form>
      </div>
      <div>
        <Link to="/signup">新規登録はこちら</Link>
      </div>
    </>
  );
};

export default Signup;
