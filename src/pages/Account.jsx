import "../css/account.css";

import Title from "../components/Title";
import { Link } from "react-router-dom";
import AccountUpdate from "../components/AccountUpdate";
import Logout from "../components/Logout";
function Account() {
  return (
    <>
      <Title title="المستخدم" alt="" />
      <div className="account">
        <span style={{ display: "block", height: "15px" }}></span>
        <AccountUpdate />
        <Logout />
        <span style={{ display: "block", height: "10px" }}></span>
      </div>
    </>
  );
}

export default Account;
