const URL = "http://127.0.0.1:8000/api/v1/admin/";
// const login_URL = "http://127.0.0.1:8000/api/login/";
const ACCESS_TOKEN = localStorage.getItem("ACCESS_TOKEN")
  ? `Bearer ${localStorage.getItem("ACCESS_TOKEN")}`
  : "";

let tickets = [];

async function getBillRequeset() {
  const response = await fetch(`${URL}gatah-request`, {
    method: "GET",
    headers: {
      "Content-type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
  });

  let data = await response.json();
  tickets = data.data;
  console.log(tickets);
}
function formatDate(data) {
  const date = new Date(data);

  const day = String(date.getDate()).padStart(2, "0");
  const month = String(date.getMonth() + 1).padStart(2, "0"); // month is 0-based
  const year = date.getFullYear();

  const formattedDate = `${day}-${month}-${year}`;
  return formattedDate;
}

async function approveGatah(gatah_id) {
  const response = await fetch(`${URL}approve-gatah/${gatah_id}`, {
    method: "POST",
    headers: {
      "Content-type": "application/json",
      Authorization: ACCESS_TOKEN,
    },
  });
  let data = await response.json();
  loader();
}

async function login() {
  const response = await fetch(login_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      phone: "0533301365",
      password: "123456",
    }),
  });
  let data = await response.json();
  localStorage.setItem("ACCESS_TOKEN", data.token);
  localStorage.setItem("userphone", data.phone);
  localStorage.setItem("RESPONCE_STSTUS", 200);

  console.log(data);
}
let container = document.getElementById("container");
let HTML_content = "";
let counter = 0;
async function loader() {
  console.log('loader()')
  tickets = [];
  document.getElementById("container").innerHTML = ''
  await getBillRequeset();
  tickets.forEach((ticket) => {
    let formated_date = formatDate(ticket.created_at);
    if (ticket.status != "approved") {
      counter++;
      HTML_content += `
        <div class="card">
            <div class="card-header">
                <span class="date">${formated_date}</span>
                <span class="user-name">${ticket.user_name}</span>
            </div>
            <div class="card-body">
                <p>المبلغ: ${ticket.price}</p>
                <p>الحالة: ${
                  ticket.status == "review" ? "غير مأكدة" : "مأكدة"
                }</p>
            </div>
            <div class="card-footer">
                <button class="approve-btn" onClick="approveGatah(${
                  ticket.gatah_id
                })">تأكيد</button>
            </div>
        </div>
    `;
    }
  });
  container.innerHTML = HTML_content;
  console.log(counter);
}

loader();
