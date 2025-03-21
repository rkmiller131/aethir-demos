import Play from "./Play";

export default async function PlaySlug({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params
  const slugConverted = slug ? Number(slug) : null;

  return (
    <Play slug={slugConverted}/>
  );
}

