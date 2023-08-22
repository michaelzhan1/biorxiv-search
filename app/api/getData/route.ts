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

  const response: Response = await fetch(`https://api.biorxiv.org/details/biorxiv/${start}/${end}`);
  // fix types
  const data: any = await response.json();
  const articles: any = data.collection;
  return new Response(JSON.stringify(articles), {
    headers: {
      'content-type': 'application/json;charset=UTF-8',
    },
  });
}