const numRegex = /^\d+$/;

function getId() {
  const queryString = window.location.search;
  const urlParams = new URLSearchParams(queryString);

  if (!urlParams.get("id")) {
    alert("Missing id");
    return;
  }

  if (!numRegex.test(urlParams.get("id"))) {
    alert("Invalid id");
    return;
  }

  const id = parseInt(urlParams.get("id"));
  return id;
}

const id = getId();

// fetch user data
fetch(`${process.env.API_URL}/users?id=${id}`)
  .then((response) => response.json())
  .then((userInfo) => {
    if (userInfo.length === 0) {
      alert("No user found");
    }

    const user = userInfo[0];
    document.getElementById("email").innerHTML = user.email;
    document.getElementById("search").innerHTML = user.search;
    document.getElementById("categories").innerHTML = user.categories;
  });


// fetch articles
fetch(`${process.env.API_URL}/data?id=${id}`)
  .then((response) => response.json())
  .then((articles) => {
    if (articles.length === 0) {
      alert("No articles found");
    }

    console.log(articles)

    const articleContainer = document.getElementById("article-container");
    articles.forEach((article) => {
      const articleElement = document.createElement("div");
      articleElement.innerHTML = `
        <h2>${article.title}</h2>
        <p>${article.authors}</p>
        <a href="https://doi.org/${article.doi}">https://doi.org/${article.doi}</a>
        <p>${article.abstract}</p>
      `;
      articleContainer.appendChild(articleElement);
    });
  });