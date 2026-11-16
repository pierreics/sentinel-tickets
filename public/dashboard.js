const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/index.html";
}

const header = { authorization: "Bearer " + token };

const logout = document.getElementById("logout-btn");
const tickets = document.getElementById("ticket-list");
const sendTicketForm = document.getElementById("ticket-form");
const message = document.getElementById("message");
const searchForm = document.getElementById("search-form");

logout.addEventListener("click", () => {
  localStorage.removeItem("token");
  window.location.href = "/index.html";
});

const loadTickets = async () => {
  tickets.textContent = "";
  const resp = await fetch("/api/tickets", {
    headers: header,
  });
  const data = await resp.json();
  if (resp.status === 401 || resp.status === 403) {
    localStorage.removeItem("token");
    window.location.href = "/index.html";
    return;
  }
  if (data.data.length === 0) {
    const doc = document.createElement("article");
    doc.innerText = "No ticket found";
    tickets.appendChild(doc);
    return;
  }
  for (let i = 0; i < data.data.length; i++) {
    const doc = document.createElement("article");
    doc.textContent = `id : ${data.data[i].id}\ntitle : ${data.data[i].title}\ndescription : ${data.data[i].description}`;
    tickets.appendChild(doc);
  }
};

sendTicketForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  const title = document.getElementById("ticket-title");
  const description = document.getElementById("ticket-description");
  const is_confidential_checkbox = document.getElementById("is_confidential");
  let is_confidential = -1;
  if (is_confidential_checkbox.checked) {
    is_confidential = 1;
  } else {
    is_confidential = 0;
  }
  const response = await fetch("/api/tickets", {
    method: "POST",
    headers: {
      ...header,
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      title: title.value,
      description: description.value,
      is_confidential: is_confidential,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    message.textContent = `Ticket ${data.data} created`;
    await loadTickets();
    sendTicketForm.reset();
  } else {
    message.textContent = data.error;
  }
});

searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  tickets.textContent = "";
  const query = document.getElementById("search-input");
  if (!query.value) {
    await loadTickets();
    return;
  }
  const resp = await fetch(`/api/tickets/search?q=${encodeURIComponent(query.value)}`, {
    headers: header,
  });
  const data = await resp.json();
  if (data.data.length === 0) {
    const doc = document.createElement("article");
    doc.innerText = "No ticket found";
    tickets.appendChild(doc);
    return;
  }
  for (let i = 0; i < data.data.length; i++) {
    const doc = document.createElement("article");
    doc.textContent = `id : ${data.data[i].id}\ntitle : ${data.data[i].title}\ndescription : ${data.data[i].description}`;
    tickets.appendChild(doc);
  }
});

loadTickets();
