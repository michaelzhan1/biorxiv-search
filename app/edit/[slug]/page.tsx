import { UserResponse } from '@/types/frontend'
import { User } from '@/types/backend'
import { redirect } from 'next/navigation'
import UpdateForm from '@/components/edit/UpdateForm'
import DeleteButton from '@/components/edit/DeleteButton'


async function getData(): Promise<User[] | null> {
  const res: Response = await fetch(process.env.API_URL + '/api/users', {
    method: 'GET',
    cache: 'no-cache',
  })
  const data: UserResponse = await res.json()
  if (data.error) {
    throw new Error(data.error)
  }
  return data.result
}


export default async function Page({ params }: { params: { slug: string } }): Promise<JSX.Element> {
  const users: User[] | null = await getData()
  if (!users) {
    alert('Error fetching data')
    redirect('/edit')
  }
  const user: User | undefined = users?.find((user: User) => user.id.toString() === params.slug)
  if (!user) {
    redirect('/edit')
  }
  return (
    <div>
      <h1>Welcome, {user.email}</h1>
      <UpdateForm email={user.email} search={user.search} defaultCategories={user.categories} />
      <DeleteButton id={user.id.toString()} />
    </div>
  )
}