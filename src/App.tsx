import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import EmailCheck from "./components/EmailCheck";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import TopPage from "./views/Toppage";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<TopPage />} />
            <Route path="/emailcheck" element={<EmailCheck />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
