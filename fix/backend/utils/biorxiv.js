import { getAllUserInfo } from "./db.js";
import { getDateRange } from "./date.js"
import fs from "fs";

// Object: key (user id) -> value (array of articles)
let userArticles = {};

// Getter for object containing all user articles
function getUserArticles() {
  return userArticles;
}

// Fetch all articles from the last week from bioRxiv via API
async function fetchAllArticles() {
  const [start, end] = getDateRange();

  const articles = [];

  let count = 0;
  let total;
  let upperBound;
  do {
    const response = await fetch(
      `https://api.biorxiv.org/details/biorxiv/${start}/${end}/${count}`
    );
    const data = await response.json();
    articles.push(...data.collection);

    total = parseInt(data.messages[0].total);

    upperBound = count + data.messages[0].count - 1;
    console.log(`Fetched articles ${count + 1} to ${upperBound + 1} of ${total}`);

    count += data.messages[0].count;
  } while (count < total);

  return articles;
}

// Fetch all articles and filter them by user search terms and categories
// for each user. Uses above function.
async function fetchUserArticlesInPlace() {
  if (process.env.NODE_ENV === 'development' && fs.existsSync('articles.json')) {
    const articles = JSON.parse(fs.readFileSync('articles.json', 'utf8'));
    userArticles = articles;
    return
  } else {
    const allArticles = await fetchAllArticles();
    const allUsers = await getAllUserInfo();

    userArticles = {};
    for (let user of allUsers) {
      userArticles[user.id] = [];
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
            userArticles[user.id].push(article);
          }
        }
      }
    }

    if (process.env.NODE_ENV === 'development') {
      fs.writeFileSync('articles.json', JSON.stringify(userArticles));
    }
  }

}

export { getUserArticles, fetchUserArticlesInPlace };