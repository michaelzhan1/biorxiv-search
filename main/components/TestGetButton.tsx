'use client'


import { Article } from '@/types/biorxiv'


interface GetDataResponse {
  error: string | null,
  result: Article[] | null
}


async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
  event.preventDefault();
  const res: Response = await fetch('/api/getData', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      email: event.currentTarget.email.value
    })
  })
  const data: GetDataResponse = await res.json();
  if (data.error) {
    console.log(data.error)
  } else {
    console.log(data.result)
  }
}


export default function TestGetButton() {
  return (
    <>
      <form onSubmit={ handleSubmit }>
        <input type="text" placeholder="Email" name="email" />
        <button type="submit">Get and log data</button>
      </form>
      
    </>
  )
}