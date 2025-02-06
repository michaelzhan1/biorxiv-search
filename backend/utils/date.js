// Gets date range for past week in YYYY-MM-DD format
function getDateRange() {
  const today = new Date();
  const lastWeek = new Date();
  lastWeek.setDate(today.getDate() - 7);

  const startYear = today.getFullYear().toString();
  let startMonth = (today.getMonth() + 1).toString();
  let startDay = today.getDate().toString();
  if (startMonth.length === 1) {
    startMonth = `0${startMonth}`;
  }
  if (startDay.length === 1) {
    startDay = `0${startDay}`;
  }

  const endYear = lastWeek.getFullYear().toString();
  let endMonth = (lastWeek.getMonth() + 1).toString();
  let endDay = lastWeek.getDate().toString();
  if (endMonth.length === 1) {
    endMonth = `0${endMonth}`;
  }
  if (endDay.length === 1) {
    endDay = `0${endDay}`;
  }

  const todayString = `${startYear}-${startMonth}-${startDay}`;
  const lastWeekString = `${endYear}-${endMonth}-${endDay}`;

  return [lastWeekString, todayString];
}

// Pretty format the date from YYYY-MM-DD to MM/DD/YYYY
function prettyFormat(date) {
  const [year, month, day] = date.split("-");
  return `${month}/${day}/${year}`;
}

export { getDateRange, prettyFormat };