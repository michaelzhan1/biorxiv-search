'use client'


import { useRouter } from 'next/navigation'


export default function DeleteButton ({ id }: { id: string}) {
  const router = useRouter()

  async function handleDelete () {
    if (confirm('Are you sure you want to unsubscribe?')) {
      let apiUrl: string = '/api/users/'
      if (process.env.API_URL) {
        apiUrl = process.env.API_URL + apiUrl
      }
      const res: Response = await fetch(apiUrl, {
        method: 'DELETE',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: id
      })
      const data: { error: string | null } = await res.json()
      if (data.error) {
        console.log(data.error)
        alert(data.error)
      } else {
        console.log(data)
        alert('Unsubscribed')
        router.push('/edit')
      }
    }
  }


  return (
    <button onClick={handleDelete}>Unsubscribe</button>
  )
}