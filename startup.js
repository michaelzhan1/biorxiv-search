import fetch from 'node-fetch';
import dotenv from 'dotenv';
dotenv.config();


const url = process.env.API_URL + '/api/test';

async function callApi() {
  const response = await fetch(url);
  const data = await response.text();
  console.log(data);
}

callApi();