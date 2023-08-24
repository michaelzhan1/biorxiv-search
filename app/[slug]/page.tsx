export default function Page({ params }: { params: { slug: string } }) {
  return <div>My {params.slug} page</div>
}