import { getUserArticles, fetchUserArticlesInPlace } from "../utils/biorxiv.js";

// GET: Retrieve article data for a specific user
async function getArticleHandler(req, res) {
  const { id } = req.query;
  if (!id) {
    res.status(400).json({ message: "Missing user id" });
    return;
  }

  const allArticles = getUserArticles();
  const specificArticles = allArticles[id];
  if (!specificArticles) {
    res.status(404).json({ message: `User id ${id} not found` });
  } else {
    res.status(200).json(specificArticles);
  }
}

// POST: Call function to update articles for all users from bioRxiv API
async function updateArticleHandler(req, res) {
  await fetchUserArticlesInPlace();
  res.status(200).json({ message: "Articles updated" });
}

export { getArticleHandler, updateArticleHandler };