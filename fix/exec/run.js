import dotenv from 'dotenv';

dotenv.config();

await fetch(`${process.env.BACKEND_URL}/data`, {
  method: 'POST',
});

await fetch(`${process.env.BACKEND_URL}/email`, {
  method: 'POST',
});