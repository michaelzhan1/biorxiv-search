import dotenv from "dotenv";
dotenv.config();

import express from "express";
import cors from "cors";
import { getUserHandler, postUserHandler, deleteUserHandler } from "./handlers/users.js";
import { getArticleHandler, updateArticleHandler } from "./handlers/data.js";
import { sendEmailHandler } from "./handlers/email.js";


// Express setup
const app = express();
app.use(express.json());

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(corsOptions));

// Routes
app.get('/users', getUserHandler);
app.post('/users', postUserHandler);
app.delete('/users', deleteUserHandler);

app.get('/data', getArticleHandler);
app.post('/data', updateArticleHandler);

app.post('/email', sendEmailHandler);

// Run
app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
