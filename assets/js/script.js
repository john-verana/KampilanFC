const usernameInput = document.getElementById("username");
const registerBtn = document.getElementById("registerBtn");
const message = document.getElementById("message");

function validateUsername(name) {
  const regex = /^[a-zA-Z0-9_.]{3,20}$/;
  return regex.test(name);
}

usernameInput.addEventListener("input", () => {
  registerBtn.disabled = !validateUsername(usernameInput.value);
});

registerBtn.addEventListener("click", async () => {
  const name = usernameInput.value;

  try {
    const response = await fetch("http://localhost:8080/api/users/register", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username: name })
    });

    const text = await response.text();

    if (text.includes("already exists")) {
      message.style.color = "red";
    } else {
      message.style.color = "green";
    }
    message.textContent = text;

  } catch (err) {
    console.error("Error:", err);
    message.style.color = "red";
    message.textContent = "Server error. Try again later.";
  }

  usernameInput.value = "";
  registerBtn.disabled = true;
});
