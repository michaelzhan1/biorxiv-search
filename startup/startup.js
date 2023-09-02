import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();


const url = process.env.API_URL + '/api/test';
console.log(url)

async function callApi() {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  const data = await response.text();
  console.log(data);
}

callApi();