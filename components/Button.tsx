'use client'


const handleClick = async () => {
  await fetch('/api/getData', {
    method: 'POST',
  })
}


export default function Button () {
  return (
    <div>
      <a href="/newslug">Go to slug</a>
      <button onClick={ handleClick }>Get Data</button>
    </div>
  )
}