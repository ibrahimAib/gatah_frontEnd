import { useState } from "react";
import { logout } from "../server/user";
import SmallLoading from "../components/SmallLoading";
function Logout() {
  const [isLoading, setIsLoading] = useState(false);
  const handleLogout = () => {
    logout(setIsLoading);
  };
  return (
    <div className={"container logout-container"}>
      <button
        className={`account-btn logout-btn ${isLoading ? "gray" : ""}`}
        onClick={handleLogout}
      >
        {isLoading ? <SmallLoading /> : "تسجيل الخروج"}
      </button>
    </div>
  );
}

export default Logout;
