const API_Key = "16749c97239c9277dfcf8c8936ceac22";
const FRONTEND_URL =
  "https://palegoldenrod-caterpillar-546590.hostingersite.com/";
const BASE_API_URL = "https://darkgrey-viper-985923.hostingersite.com/";
const API_URL_V1 = `${BASE_API_URL}api/v1/`;
const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN")
  ? `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
  : "";
export const getGatah = async (month) => {
  const response = await fetch(`${API_URL_V1}current?date=${month}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
  });
  auth_error(response);
  const data = await response.json();
  return data.data;
};

export const getPastGatahs = async (month) => {
  const response = await fetch(`${API_URL_V1}?date=${month}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
  });
  auth_error(response);
  const data = await response.json();
  return data.data;
};
export const getBalance = async () => {
  const response = await fetch(`${API_URL_V1}balance`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
  });

  auth_error(response);
  const data = await response.json();
  return data.balance;
};

export const submitGatah = async (body) => {
  const response = await fetch(`${API_URL_V1}submit-gatah`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.status;
};

export const submitBill = async (items) => {
  const response = await fetch(`${API_URL_V1}add-bill`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify({
      items: items,
    }),
  });
  const data = await response.json();
  return data.status;
};

export const getBills = async () => {
  const response = await fetch(`${API_URL_V1}bills`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
  });
  const data = await response.json();
  return data.data;
};

export const login = async (phone, password) => {
  const response = await fetch(`${BASE_API_URL}api/login`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
    body: JSON.stringify({
      phone: phone,
      password: password,
    }),
  });
  if (response.status == 401) {
    let message = "خطأ في رقم الجوال او كلمة المرور!!";
    console.log(message);
    return message;
  }
  const data = await response.json();
  localStorage.setItem("ACCESS_TOKEN", data.token);
  localStorage.setItem("userphone", data.phone);
  localStorage.setItem("RESPONCE_STSTUS", 200);
  window.location.href = FRONTEND_URL;
  console.log(data.token);
};

export const auth_error = async (res) => {
  if (!res.ok) {
    console.log(res.status);
    localStorage.setItem("RESPONCE_STSTUS", res.status);
    await setTimeout((window.location.href = `${FRONTEND_URL}login`), 1000);
    return;
  }
};
