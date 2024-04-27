import { BrowserRouter, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import EmailCheck from "./components/EmailCheck";
import Signup from "./components/Signup";
import Signin from "./components/Signin";
import Signout from "./components/Signout";
import TopPage from "./views/Toppage";
import UnloginBooks from "./components/UnloginBooks";
import "./App.css";
import EditProfile from "./components/EditProfile";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Header />}>
            <Route path="/" element={<TopPage />} />
            <Route path="/emailcheck" element={<EmailCheck />} />
            <Route path="/unlogin" element={<UnloginBooks />} />
            <Route path="/profile" element={<EditProfile />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/signin" element={<Signin />} />
            <Route path="/signout" element={<Signout />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
