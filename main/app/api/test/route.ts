export async function POST() {
  console.log('test called')
  return new Response('hello world 3', {
    headers: {
      'content-type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
    },
  })
}