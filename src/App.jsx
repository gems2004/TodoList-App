import { Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import "./index.css";
import Login from "./components/Login";
import SignUp from "./components/signup/SignUp";
import MainPage from "./pages/MainPage";
function App() {
  return (
    <>
      <Routes>
        <Route path="/">
          <Route index element={<LandingPage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/mainpage" element={<MainPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
