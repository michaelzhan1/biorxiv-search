import { Article, User } from '@/types/backend'
import { ArticleResponse, UserResponse } from '@/types/frontend'
import { redirect } from 'next/navigation'


async function getUsers() {
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


async function getArticles(user: User): Promise<Article[] | null> {
  const res: Response = await fetch(process.env.API_URL + '/api/data', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  });
  const data: ArticleResponse = await res.json()
  if (data.error) {
    console.error(data.error)
    return null
  } else {
    return data.result
  }
}


export default async function Page({ params }: { params: { slug: string } }): Promise<JSX.Element> {
  const users: User[] | null = await getUsers()
  if (!users) {
    console.log('Error fetching data')
    redirect('/results')
  }
  const user: User | undefined = users?.find((user: User) => user.id.toString() === params.slug)
  if (!user) {
    redirect('/results')
  }

  const articles: Article[] | null = await getArticles(user)
  if (!articles) {
    console.log('Error fetching data')
    redirect('/results')
  }
  
  // results page, call to POST on /api/data
  return (
    <>
      <h1 className='font-bold text-xl'>Articles for {user.email}</h1>
      <p className='mb-3'>{articles.length} articles found</p>
    {articles.map((article: Article, id: number) => {
      return (
        <div key={id}>
          { id !== 0 && <hr className='h-px bg-gray-200 mb-3' />}
          <h1 className='font-bold text-lg'>{article.title}</h1>
          <p className='italic'>{article.authors}</p>
          <a href={`https://doi.org/${article.doi}`} className='text-blue-500 hover:text-blue-700 hover:underline'>{article.doi}</a>
          <p className='text-sm mb-3'>{article.abstract}</p>
        </div>
      )
      })}
    </>
  )
}