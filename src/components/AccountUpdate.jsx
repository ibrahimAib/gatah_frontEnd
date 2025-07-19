import React, { useState } from "react";
import { updateUserInfo } from "../server/user";
import SmallLoading from "./SmallLoading";

const AccountUpdate = () => {
  const [isUpdateLoading, setIsUpdateLoading] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);
  const [erorrMessage, setErorrMessage] = useState(false);
  const [formData, setFormData] = useState({
    name: localStorage.getItem("username"),
    phone: localStorage.getItem("userphone"),
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const dataToSend = { ...formData }; // ننسخ البيانات عشان ما نعدّل مباشرة على state

    if (dataToSend.password === "") {
      delete dataToSend.password; // نحذف الباسوورد لو فاضي
    }
    if (formData.password != "") {
      if (formData.password.length < 6) {
        setErorrMessage(true);
        return;
      }
    }
    updateUserInfo(
      dataToSend,
      setIsUpdateLoading,
      setIsUpdated,
      setErorrMessage
    );
  };

  return (
    <div className="account-container container">
      <h2 className="account-title">بيانات المستخدم</h2>
      <form className="account-form" onSubmit={handleSubmit}>
        <label>
          الأسم:
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          الجوال:
          <input
            type="tel"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          كلمة المرور:
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            autoComplete="new-password"
          />
        </label>
        {erorrMessage ? (
          <label htmlFor="password" style={{ color: "red" }}>
            يجب الا تقل كلمة المرور عن 6 حروف او ارقام
          </label>
        ) : (
          ""
        )}

        <button
          className={`account-btn update-account-btn 
            ${isUpdateLoading ? " gray" : ""}
            ${isUpdated ? " green" : ""}`}
          type="submit"
        >
          {isUpdateLoading ? (
            <SmallLoading />
          ) : isUpdated ? (
            <img src="done.png" width="30px" alt="" />
          ) : (
            "تحديث"
          )}
        </button>
      </form>
    </div>
  );
};

export default AccountUpdate;
