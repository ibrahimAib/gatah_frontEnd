export const FRONTEND_URL = "https://gatah.alowairdi.com";
export const BASE_API_URL = "https://gatah-api.alowairdi.com";
export const API_URL_V1 = `${BASE_API_URL}/api/v1`;
export const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN")
  ? `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
  : "";
export const HEADERS = {
  "Content-Type": "application/json",
  Accept: "application/json",
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

export const auth_error = async (res) => {
  if (!res.ok) {
    localStorage.setItem("RESPONCE_STSTUS", res.status);
    await setTimeout((window.location.href = `${FRONTEND_URL}/login`), 1000);
    return;
  }
};
