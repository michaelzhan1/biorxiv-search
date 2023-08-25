import { User } from '@/types/biorxiv'
import { redirect } from 'next/navigation'


interface UserData {
  error: string;
  result: User[];
}


async function getData(): Promise<User[]> {
  const res: Response = await fetch(process.env.API_URL + '/api/getUsers')
  const data: UserData = await res.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data.result
}


export default async function Page({ params }: { params: { slug: string } }) {
  const users: User[] = await getData()
  const user: User | undefined = users.find((user: User) => user.id.toString() === params.slug)
  if (!user) {
    redirect('/edit')
  }
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
    </div>
  )
}