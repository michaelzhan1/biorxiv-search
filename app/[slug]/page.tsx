export default function Page({ params }: { params: { slug: string } }) {
  return <div>My {params.slug} page</div>
}

// in slug, use the slug as the id of the person.