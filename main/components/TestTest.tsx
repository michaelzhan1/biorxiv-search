'use client'


export default function TestTest() {
  async function handleClick() {
    await fetch('/api/test', {
      cache: 'no-cache',
    })
  }
  return (
    <>
      <button onClick={handleClick}>Test click</button>
    </>
  )
}