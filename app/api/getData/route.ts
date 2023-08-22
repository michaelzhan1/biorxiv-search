export async function GET(request: Request) {
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


  // fix types
  let count: number = 0;
  let total: number;
  let response: Response;
  let data: any;
  let articles: any[] = [];

  do {
    console.log(`Fetching articles from https://api.biorxiv.org/details/biorxiv/${start}/${end}/${count}`)
    response = await fetch(`https://api.biorxiv.org/details/biorxiv/${start}/${end}/${count}`);
    data = await response.json();
    count += data.messages[0].count;
    total = data.messages[0].total;
    articles = articles.concat(data.collection);
  } while (count < total)
  console.log('Done fetching')

  return new Response(JSON.stringify(articles), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}