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

// async function login() {
//   const response = await fetch(login_URL, {
//     method: "POST",
//     headers: {
//       "Content-Type": "application/json",
//     },
//     body: JSON.stringify({
//       phone: "0533301365",
//       password: "123456",
//     }),
//   });
//   let data = await response.json();
//   localStorage.setItem("ACCESS_TOKEN", data.token);
//   localStorage.setItem("userphone", data.phone);
//   localStorage.setItem("RESPONCE_STSTUS", 200);

//   console.log(data);
// }

let container = document.getElementById("container");
let HTML_content = "";
async function loader() {
  await getBillRequeset();
  tickets.forEach((ticket) => {
    HTML_content +=
      ticket.status == "approved"
        ? ""
        : `
        <div class="card">
            <span>${ticket.created_at}</span>
            <br>
            <span>${ticket.user_name}</span>
            <br>
            <span>${ticket.price}</span>
            <br>
            <span>${ticket.status == "review" ? "غير مأكدة" : "مأكدة"}</span>

        </div>
    `;
  });
  container.innerHTML = HTML_content;
}
loader();
