export function emailTemplate(id: number): string {
  const today: Date = new Date();
  const sevenDaysAgo: Date = new Date();
  sevenDaysAgo.setDate(today.getDate() - 7);

  const startYear: number = sevenDaysAgo.getFullYear();
  const startMonth: number = sevenDaysAgo.getMonth() + 1;
  const startDayOfMonth: number = sevenDaysAgo.getDate();

  const endYear: number = today.getFullYear();
  const endMonth: number = today.getMonth() + 1;
  const endDayOfMonth: number = today.getDate();

  const start: string = `${startYear}-${startMonth < 10 ? '0' + startMonth.toString() : startMonth}-${startDayOfMonth < 10 ? '0' + startDayOfMonth.toString() : startDayOfMonth}`;
  const end: string = `${endYear}-${endMonth < 10 ? '0' + endMonth.toString() : endMonth}-${endDayOfMonth < 10 ? '0' + endDayOfMonth.toString() : endDayOfMonth}`;

  return `
  <!DOCTYPE html>
  <html>
    <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <style>
        * {
          box-sizing: border-box;
        }
        html {
          line-height: 1.5;
          /* 1 */
          -webkit-text-size-adjust: 100%;
          /* 2 */
          -moz-tab-size: 4;
          /* 3 */
          tab-size: 4;
          /* 3 */
          font-family: ui-sans-serif, system-ui, -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
          /* 4 */
          font-feature-settings: normal;
          /* 5 */
          font-variation-settings: normal;
          /* 6 */
          padding: 0;
        }
  
        h1 {
          margin-top: 0;
        }
  
        .flex {
          display: flex;
        }
  
        .flex-col {
          flex-direction: column;
        }

        .font-bold {
          font-weight: 700;
        }
  
        .text-4xl {
          font-size: 2.25rem;
        }
  
        .mb-3 {
          margin-bottom: 0.75rem;
        }
  
        .text-blue-500 {
          color: rgb(59, 130, 246);
        }
  
        .hover\:underline:hover {
          text-decoration: underline;
        }
  
        .text-sm {
          font-size: 0.875rem;
        }
  
        .text-slate-400 {
          color: rgb(148, 163, 184);
        }
  
      </style>
    </head>
    <body>
      <div class="flex flex-col">
        <div>
          <h1 class="font-bold text-4xl mb-3">
            New BioRxiv Articles
          </h1>
          <div class="mb-3">
            ${start} - ${end}
          </div>
          <div>
            Click <a class="hover:underline text-blue-500" href=${process.env.API_URL + '/results/' + id}>here</a> for last week's BioRxiv articles
          </div>
          <div class="text-sm text-slate-400 hover:underline">
            <a href="${process.env.API_URL + '/edit/' + id}">Edit search preferences or unsubscribe</a>
          </div>
        </div>
      </div>
    </body>
  </html>
  `
}