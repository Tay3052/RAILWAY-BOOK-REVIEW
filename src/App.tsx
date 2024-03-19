import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./compoments/Header";
import EmailCheck from "./compoments/EmailCheck";
import SignUp from "./views/SignUpView";
import Signin from "./compoments/Signin";
import Home from "./compoments/Home";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<Signin />} />
            <Route path="/emailcheck" element={<EmailCheck />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/home" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
