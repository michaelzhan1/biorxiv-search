import { CronJob } from 'cron'

export async function GET() {
  const job = new CronJob('*/5 * * * * *', () => {
    console.log('You will see this message every second')
  })
  job.start()
  return new Response('hello world')
}