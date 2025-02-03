const numRegex = /^\d+$/;

function getId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (!urlParams.get("id")) {
    alert("Missing id");
    window.location.href = "/index.html";
    return;
  }

  if (!numRegex.test(urlParams.get("id"))) {
    alert("Invalid id");
    window.location.href = "/index.html";
    return;
  }

  const id = parseInt(urlParams.get("id"));
  return id;
}

function updatePreferences(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const search = formData.get("search");

  fetch(`${process.env.API_URL}/users?id=${id}`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      email: email,
      search: search,
      categories: [],
    }),
  }).then((response) => response.json())
    .then(() => {
      alert("Preferences updated");
    });
}

function deleteUser(e) {
  e.preventDefault();

  if (!confirm("Are you sure you want to delete your account?")) {
    return;
  }

  fetch(`${process.env.API_URL}/users?id=${id}`, {
    method: "DELETE",
  }).then(() => {
    alert("User deleted");
    window.location.href = "/index.html";
  });
}

const id = getId();

// fetch user data
fetch(`${process.env.API_URL}/users?id=${id}`)
  .then((response) => response.json())
  .then((userInfo) => {
    if (userInfo.length === 0) {
      alert("No user found");
      window.location.href = "/index.html";
      return;
    }

    const user = userInfo[0];

    document.getElementById("email").value = user.email;
    document.getElementById("search").value = user.search.split(";").join(" ");
  });

document.getElementById("main-form").addEventListener("submit", updatePreferences);
document.getElementById("unsubscribe").addEventListener("click", deleteUser);