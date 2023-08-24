import { Article, Biorxiv } from '@/types/biorxiv'
import { pool } from '@/utils/database'
import { PoolClient, QueryResult } from 'pg'


interface RequestBody {
  search: string;
  categories: string[];
}

interface FilterBody {
  email: string;
}

interface Filter {
  id: number;
  query: string;
  categories: string;
}

async function getAllArticles(): Promise<Article[]> {
  const endDay: Date = new Date();
  const startDay: Date = new Date();
  startDay.setDate(endDay.getDate() - 7);

  const startYear: number = startDay.getFullYear();
  const startMonth: number = startDay.getMonth() + 1;
  const startDayOfMonth: number = startDay.getDate();

  const endYear: number = endDay.getFullYear();
  const endMonth: number = endDay.getMonth() + 1;
  const endDayOfMonth: number = endDay.getDate();

  const start: string = `${startYear}-${startMonth < 10 ? '0' + startMonth.toString() : startMonth}-${startDayOfMonth < 10 ? '0' + startDayOfMonth.toString : startDayOfMonth}`;
  const end: string = `${endYear}-${endMonth < 10 ? '0' + endMonth.toString() : endMonth}-${endDayOfMonth < 10 ? '0' + endDayOfMonth.toString : endDayOfMonth}`;

  let count: number = 0;
  let total: number;
  let response: Response;
  let data: Biorxiv;
  let articles: Article[] = [];

  do {
    console.log(`Fetching articles from https://api.biorxiv.org/details/biorxiv/${start}/${end}/${count}`)
    response = await fetch(`https://api.biorxiv.org/details/biorxiv/${start}/${end}/${count}`);
    data = await response.json();
    count += data.messages[0].count;
    total = data.messages[0].total;
    articles = articles.concat(data.collection);
  } while (count < total)
  console.log(`Fetched ${articles.length} articles`)
  return articles
}

let allArticles: Article[];

export async function GET(request: Request) {
  getAllArticles().then((data) => {
    allArticles = data;
  })
  return new Response(JSON.stringify({ error: null, result: 'Fetching articles' }), {
    status: 200,
    headers: { 'Content-Type': 'application/json' },
  });
}

export async function POST(request: Request) {
  const body: FilterBody = await request.json();

  const client: PoolClient = await pool.connect();
  try {
    const idRows: QueryResult = await client.query('SELECT id FROM users WHERE email = $1', [body.email]);
    if (idRows.rowCount === 0) {
      throw new Error('User not found');
    }
    const id: number = idRows.rows[0].id;
    const filterRows: QueryResult = await client.query('SELECT * FROM filters WHERE id = $1', [id]);
    if (filterRows.rowCount === 0) {
      throw new Error('Filter not found');
    }
    client.release();
    const result: Article[] = [];
    const filter: Filter = filterRows.rows[0];
    const search: string[] = filter.query.toLowerCase().trim().split(' ');
    const rawCategories: string[] = filter.categories.split(';');
    const categories: string[] = rawCategories.filter((category) => category !== '');
    console.log(`Searching for ${search} in ${categories}`)

    for (let article of allArticles) {
      if (categories.includes(article.category) || categories.length === 0) {
        let wordCount: number = 0;
        for (let word of search) {
          if (article.title.toLowerCase().includes(word) || article.abstract.toLowerCase().includes(word)) {
            wordCount += 1;
          }
        }
        if (wordCount >= search.length) {
          result.push(article);
        }
      }
    }
    return new Response(JSON.stringify({ error: null, result: result}), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error(err);
    client.release();
    return new Response(JSON.stringify({ error: err.message, result: null }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}





//   let result: Article[] = [];
//   let body: RequestBody = await request.json();
//   let search: string[] = body.search.toLowerCase().trim().split(' ');
//   let categories: string[] = body.categories;

//   console.log(`Searching for ${search} in ${categories}`)

//   for (let article of articles) {
//     let valid: boolean = true;
//     if (categories.includes(article.category) || categories.length === 0) {
//       for (let word of search) {
//         if (word === '') {
//           continue;
//         } else if (!(article.title.toLowerCase().includes(word) || article.abstract.toLowerCase().includes(word))) {
//           valid = false;
//         }
//       }
//       if (valid) {
//         result.push(article);
//       }
//     }
//   }

//   return new Response(JSON.stringify(result), {
//     headers: {
//       'content-type': 'application/json;charset=UTF-8',
//     },
//   });
// }