import { getAllUserInfo } from "./db.js";
import { getDateRange } from "./date.js"
import fs from "fs"; // TODO: remove

const userArticles = new Map();

// function use case:
// on weekly email call, first call all articles, then comb through based on
// user's search and categories, then store those in a dict
async function fetchAllArticles() {
  const [start, end] = getDateRange();

  // fetch articles
  const articles = [];

  let count = 0;
  let total;
  do {
    const response = await fetch(
      `https://api.biorxiv.org/details/biorxiv/${start}/${end}/${count}`
    );
    const data = await response.json();
    articles.push(...data.collection);

    total = parseInt(data.messages[0].total);
    count += data.messages[0].count;
  } while (count < total);

  return articles;
}

async function fetchUserArticlesInPlace() {
  // const allArticles = await fetchAllArticles(); // TODO: swap back
  const allArticles = loadArticles();
  const allUsers = await getAllUserInfo();

  userArticles.clear();
  for (let user of allUsers) {
    userArticles.set(user.id, []);
  }

  for (let article of allArticles) {
    for (let user of allUsers) {
      if (user.categories === null || user.categories.split(';').includes(article.category)) {
        let wordCount = 0;
        for (let word of user.search.split(';')) {
          if (article.title.toLowerCase().includes(word.toLowerCase()) || article.abstract.toLowerCase().includes(word.toLowerCase())) {
            wordCount++;
          }
        }

        if (wordCount >= user.search.split(';').length) {
          userArticles.get(user.id).push(article);
        }
      }
    }
  }
}



// TODO: remove
function loadArticles() {
  const data = fs.readFileSync("./utils/articles.json");
  return JSON.parse(data);
}

export { userArticles, fetchUserArticlesInPlace };