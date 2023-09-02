export async function GET() {
  console.log('test called')
  return new Response('hello world', {
    headers: {
      'content-type': 'text/plain',
      'Access-Control-Allow-Origin': '*',
    },
  })
}