import { Article, Biorxiv } from '@/types/biorxiv'


interface RequestBody {
  search: string;
  categories: string[];
}


export async function POST(request: Request) {
  // Returns all bioRxiv articles from the last week
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
  console.log('Done fetching')

  let result: Article[] = [];
  let body: RequestBody = await request.json();
  let search: string[] = body.search.toLowerCase().trim().split(' ');
  let categories: string[] = body.categories;

  console.log(`Searching for ${search} in ${categories}`)

  for (let article of articles) {
    let valid: boolean = true;
    if (categories.includes(article.category) || categories.length === 0) {
      for (let word of search) {
        if (word === '') {
          continue;
        } else if (!(article.title.toLowerCase().includes(word) || article.abstract.toLowerCase().includes(word))) {
          valid = false;
        }
      }
      if (valid) {
        result.push(article);
      }
    }
  }

  return new Response(JSON.stringify(result), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}