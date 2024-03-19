import { useState } from "react";
import { signUpApi } from "../APIs/APIs";
import { Link } from "react-router-dom";

export const Signup = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // useEffect(() => {
  //   console.log("name: ", name);
  //   console.log("email: ", email);
  //   console.log("password: ", password);
  // });

  const res = async (name: string, email: string, password: string) => {
    await signUpApi(name, email, password);
    console.log("signUpApi");
  };

  return;
  <>
    <div></div>
  </>;
};

export default Signup;
