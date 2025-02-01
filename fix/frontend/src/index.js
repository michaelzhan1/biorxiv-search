function handleSubmit(e) {
  e.preventDefault();

  const formData = new FormData(e.target);
  const email = formData.get("email");
  const keywords = formData.get("search");
  const categories = formData.get("categories");
  console.log(email, keywords, categories);
}

const form = document.getElementById("main-form");
form.addEventListener("submit", handleSubmit);

const testDiv = document.getElementById("testDiv");
testDiv.innerHTML = process.env.TEST_MESSAGE;
