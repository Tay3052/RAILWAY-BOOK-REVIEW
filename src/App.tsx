import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmailCheck from "./compoments/emailCheck";
import "./App.css";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/emailcheck" element={<EmailCheck />} />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
