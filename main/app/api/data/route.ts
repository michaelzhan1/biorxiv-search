import { User, Article, Biorxiv } from '@/types/backend'


let allArticles: Article[] = [];

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

  const start: string = `${startYear}-${startMonth < 10 ? '0' + startMonth.toString() : startMonth}-${startDayOfMonth < 10 ? '0' + startDayOfMonth.toString() : startDayOfMonth}`;
  const end: string = `${endYear}-${endMonth < 10 ? '0' + endMonth.toString() : endMonth}-${endDayOfMonth < 10 ? '0' + endDayOfMonth.toString() : endDayOfMonth}`;

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

export async function GET() {
  try {
    await getAllArticles().then((data) => {
      allArticles = data;
    })
    return new Response(JSON.stringify({ error: null, result: 'Fetching articles' }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message, result: null }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}


export async function POST(request: Request) {
  try {
    const body: User = await request.json();
    const email: string = body.email;
    const search: string[] = body.search.split(' ');
    const categories: string[] = body.categories.split(';').filter((category) => category !== '');
    console.log(`Searching articles for user ${email} with search "${search}" in categories "${categories}"`)
    const result: Article[] = [];

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
    return new Response(JSON.stringify({ error: null, result: result }), {
      status: 200,
      headers: { 'Content-Type': 'application/json' },
    });
  } catch (err: any) {
    console.error(err);
    return new Response(JSON.stringify({ error: err.message, result: null }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
}