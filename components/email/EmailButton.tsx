'use client'


export default function EmailButton() {
  const sendEmail = async () => {
    const res = await fetch('/api/email');
    console.log(res.text())
  }

  return (
    <>
      <button onClick={sendEmail}>Send Email</button>
    </>
  )
}