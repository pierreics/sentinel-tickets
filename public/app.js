const signUpForm = document.getElementById("signup-form");
const signInForm = document.getElementById("signin-form");
const message = document.getElementById("message");

if (localStorage.getItem("token")) {
  window.location.href = "/dashboard.html";
}

signUpForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const signUpUsername = document.getElementById("signup-username");
  const signUpPassword = document.getElementById("signup-password");
  const response = await fetch("/api/auth/register", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: signUpUsername.value,
      password: signUpPassword.value,
    }),
  });
  const data = await response.json();
  if (response.ok) {
    message.textContent = "User successfully registered";
  } else {
    message.textContent = data.error || "Internal Error";
  }
});

signInForm.addEventListener("submit", async (event) => {
  event.preventDefault();
  const signInUsername = document.getElementById("signin-username");
  const signInPassword = document.getElementById("signin-password");
  const response = await fetch("/api/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      username: signInUsername.value,
      password: signInPassword.value,
    }),
  });
  const data = await response.json();
  if (!response.ok) {
    message.textContent = data.error || "Internal Error";
  } else {
    localStorage.setItem("token", data.data.token);
    message.textContent = "User successfully logged in";
    window.location.href = "/dashboard.html";
  }
});
