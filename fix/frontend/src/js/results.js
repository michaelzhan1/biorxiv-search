import '../css/style.css';

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

function getDateRange() {
  const today = new Date();
  const lastWeek = new Date(today);
  lastWeek.setDate(lastWeek.getDate() - 7);

  const todayDay = today.getDate();
  const todayMonth = today.getMonth() + 1;
  const todayYear = today.getFullYear();

  const lastWeekDay = lastWeek.getDate();
  const lastWeekMonth = lastWeek.getMonth() + 1;
  const lastWeekYear = lastWeek.getFullYear();

  return [`${lastWeekMonth}/${lastWeekDay}/${lastWeekYear}`, `${todayMonth}/${todayDay}/${todayYear}`];
}

const id = getId();

// header
const [today, lastWeek] = getDateRange();
document.getElementById("header").innerHTML = `Results for ${today} to ${lastWeek}`;

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