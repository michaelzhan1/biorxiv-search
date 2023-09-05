'use client'


import { useRouter } from 'next/navigation'
import { DeleteUserResponse } from '@/types/frontend'


export default function DeleteButton ({ id }: { id: string }) {
  const router = useRouter()

  async function handleDelete () {
    if (confirm('Are you sure you want to unsubscribe?')) {
      const res: Response = await fetch('/api/users', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'text/plain'
        },
        body: id
      })
      const data: DeleteUserResponse = await res.json()
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
    <button onClick={handleDelete} type='button' className='bg-red-500 hover:bg-red-600 text-white rounded-md px-3 py-2 font-bold'>Unsubscribe</button>
  )
}