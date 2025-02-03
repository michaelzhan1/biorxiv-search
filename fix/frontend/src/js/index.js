function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const search = formData.get("search");

  fetch(process.env.API_URL + "/users", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      search: search,
      categories: [],
    }),
  }).then((response) => {
    if (response.ok) {
      alert("User created/updated successfully");
    } else {
      alert("An error occurred");
    }
  });
}

const form = document.getElementById("main-form");
form.addEventListener("submit", handleSubmit);
