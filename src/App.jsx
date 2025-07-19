import Home from "./pages/Home";
import PayList from "./pages/PayList";
import Purchases from "./pages/Purchases";
import LoginPage from "./pages/login";
import Account from "./pages/Account";

import NavBar from "./components/Navbar";
import { Navigate, Route, Routes } from "react-router-dom";
import "./css/main.css";
import { GroupListProvider } from "./contexts/GroupContext";
if (!localStorage.getItem("ACCESS_TOKEN")) {
  // window.location.href = "http://localhost:5173/login";
}
function App() {
  const token = localStorage.getItem("ACCESS_TOKEN");
  const responce = localStorage.getItem("RESPONCE_STSTUS");
  if (!token || responce == 401) {
    return (
      <Routes>
        <Route path="*" element={<LoginPage />} />
      </Routes>
    );
  }
  return (
    <>
      <main className="main">
        <GroupListProvider>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/paylist" element={<PayList />} />
            <Route path="/purchases" element={<Purchases />} />
            <Route path="/account" element={<Account />} />
            <Route path="*" element={<Home />} />
          </Routes>
        </GroupListProvider>
        {location.pathname !== "/login" && <NavBar />}
      </main>
    </>
  );
}

export default App;
