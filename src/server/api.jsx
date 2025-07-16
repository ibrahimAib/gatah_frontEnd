// const FRONTEND_URL = "https://gatah.alowairdi.com/";
const FRONTEND_URL = "https://gatah.alowairdi.com/";
const BASE_API_URL = "https://darkgrey-viper-985923.hostingersite.com";
const API_URL_V1 = `${BASE_API_URL}/api/v1`;
const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN")
  ? `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
  : "";
const HEADERS = {
  "Content-Type": "application/json",
  Authorization: ACCESS_TOKEN,
};
export const getGatah = async (month) => {
  const response = await fetch(`${API_URL_V1}/current?date=${month}`, {
    headers: HEADERS,
  });
  auth_error(response);
  const data = await response.json();
  return data.data;
};

export const getPastGatahs = async (month) => {
  const response = await fetch(`${API_URL_V1}/past?date=${month}`, {
    headers: HEADERS,
  });
  auth_error(response);
  const data = await response.json();
  return data.data;
};
export const getBalance = async () => {
  const response = await fetch(`${API_URL_V1}/balance`, {
    headers: HEADERS,
  });

  auth_error(response);
  const data = await response.json();
  return data.balance;
};

export const submitGatah = async (body) => {
  const response = await fetch(`${API_URL_V1}/submit-gatah`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify(body),
  });
  const data = await response.json();
  return data.status;
};

export const deleteBill = async (id) => {
  try {
    const response = await fetch(`${API_URL_V1}/delete-bill/${id}`, {
      method: "POST",
      headers: HEADERS,
    });

    if (!response.ok) {
      throw new Error("HTTP error");
    }

    const data = await response.json();
    if (data.message == "the bill is already paid!") {
      alert("لا يمكن حذف الفاتورة المدفوعة");
    }
    if (data.message == "bill deleted successfully") {
      return true;
    }
  } catch (error) {
    console.error("deleteBill error:", error);
    throw error; // مهم عشان `catch` في handeldeleteBill يشتغل
  }
};

export const submitBill = async (items) => {
  for (const element of items) {
    if (element.title == "") {
      alert("يوجد خانة فارغة");
      return "erorr";
    }
  }
  const response = await fetch(`${API_URL_V1}/add-bill`, {
    method: "POST",
    headers: HEADERS,
    body: JSON.stringify({
      items: items,
    }),
  });
  const data = await response.json();
  return data.status;
};

export const getBills = async () => {
  const response = await fetch(`${API_URL_V1}/bills`, {
    headers: HEADERS,
  });
  const data = await response.json();
  return data.data;
};

export const login = async (phone, password, setIsloading) => {
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
    console.log(message);
    setIsloading(false);
    return message;
  }

  const data = await response.json();
  localStorage.setItem("ACCESS_TOKEN", data.token);
  localStorage.setItem("userphone", data.phone);
  localStorage.setItem("RESPONCE_STSTUS", 200);
  window.location.href = FRONTEND_URL;
  console.log(data.token);
  setIsloading(false);
};

export const auth_error = async (res) => {
  if (!res.ok) {
    console.log(res.status);
    localStorage.setItem("RESPONCE_STSTUS", res.status);
    await setTimeout((window.location.href = `${FRONTEND_URL}login`), 1000);
    return;
  }
};
