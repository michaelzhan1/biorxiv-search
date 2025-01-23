import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { getUsers, postUsers, deleteUsers } from "./handlers/users.js";

dotenv.config();

// Express setup
const app = express();
app.use(express.json());

// CORS setup
const corsOptions = {
  origin: process.env.FRONTEND_URL,
};
app.use(cors(corsOptions));

// Routes
app.get('/users', getUsers);
app.post('/users', postUsers);
app.delete('/users', deleteUsers);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
