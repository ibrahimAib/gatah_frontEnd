import { BASE_API_URL, FRONTEND_URL, HEADERS } from "./api";

export const login = async (phone, password, setIsloading, setErorrMessage) => {
  setIsloading(true);
  const response = await fetch(`${BASE_API_URL}/api/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      phone: phone,
      password: password,
    }),
  });
  if (response.status == 401) {
    let message = "خطأ في رقم الجوال او كلمة المرور!!";
    setIsloading(false);
    setErorrMessage(true);
    return message;
  }

  const data = await response.json();
  localStorage.setItem("ACCESS_TOKEN", data.token);
  localStorage.setItem("userphone", data.phone);
  localStorage.setItem("username", data.name);
  localStorage.setItem("RESPONCE_STSTUS", 200);
  window.location.href = FRONTEND_URL;
  setIsloading(false);
};

export const logout = async (setIsloading) => {
  setIsloading(true);
  const response = await fetch(`${BASE_API_URL}/api/v1/logout`, {
    method: "POST",
    headers: HEADERS,
  });
  if (response.status != 200) {
    let message = "حدذ خطأ";
    console.log(message);
    setIsloading(false);
    return message;
  }

  localStorage.removeItem("ACCESS_TOKEN");
  localStorage.removeItem("userphone");
  localStorage.removeItem("username");
  localStorage.removeItem("RESPONCE_STSTUS");
  window.location.href = `${FRONTEND_URL}/login`;
  setIsloading(false);
};

export const updateUserInfo = async (body, setIsloading, setIsUpdated, setErorrMessage) => {
  setIsloading(true);
  try {
    const response = await fetch(`${BASE_API_URL}/api/v1/user`, {
      method: "POST",
      headers: HEADERS,
      body: JSON.stringify(body),
    });

    const data = await response.json();
    localStorage.setItem("userphone", data.updated_user.phone);
    localStorage.setItem("username", data.updated_user.name);
    setIsUpdated(true);
    setIsloading(false);
    setErorrMessage(false)
  } catch (error) {
    setErorrMessage(true)
    console.error("deleteBill error:", error);

  }
};
