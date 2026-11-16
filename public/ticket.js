const token = localStorage.getItem("token");
if (!token) {
  window.location.href = "/index.html";
}

const header = { authorization: "Bearer " + token };
const params = new URLSearchParams(window.location.search);
const id = params.get("id");
const ticket = document.getElementById("ticket-div");

const takeTicket = async () => {
  const resp = await fetch(`/api/tickets/${id}`, {
    headers: header,
  });
  const data = await resp.json();
  if (!resp.ok) {
    ticket.textContent = "No note found";
    return;
  }
  ticket.textContent = `id : ${data.data.id} | title : ${data.data.title} | description : ${data.data.description} | is confidential : ${data.data.is_confidential}`;
};

takeTicket();
