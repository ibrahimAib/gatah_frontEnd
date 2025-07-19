import React, { useState } from "react";
import { login } from "../server/user";
import SmallLoading from "../components/SmallLoading";
import "../css/login.css";
function LoginPage() {
  const [phone, setphone] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsloading] = useState(false);
  const [erorrMessage, setErorrMessage] = useState(false);
  const handleSubmit = (e) => {
    setErorrMessage(false);
    e.preventDefault();
    login(phone, password, setIsloading, setErorrMessage);
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>
        <input
          type="text"
          placeholder="رقم الجوال"
          value={phone}
          onChange={(e) => setphone(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="الرقم السري"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {erorrMessage ? (
          <label htmlFor="login-button" style={{ color: "red" }}>
            رقم الجوال او كلمة المرور خطأ!
          </label>
        ) : (
          ""
        )}
        <button
          type="submit"
          id="login-button"
          style={styles.button}
          className={isLoading ? "gray" : ""}
        >
          {isLoading ? <SmallLoading /> : "دخول"}
        </button>
      </form>
    </div>
  );
}

const styles = {
  container: {
    maxWidth: 300,
    margin: "100px auto",
    padding: 20,
    border: "1px solid #ccc",
    borderRadius: 8,
    textAlign: "center",
    fontFamily: "Arial, sans-serif",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: 10,
  },
  input: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "1px solid #ccc",
  },
  button: {
    padding: 10,
    fontSize: 16,
    borderRadius: 4,
    border: "none",
    backgroundColor: "#007bff",
    color: "white",
    cursor: "pointer",
  },
};

export default LoginPage;
