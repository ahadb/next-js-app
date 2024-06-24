interface Post {
  title: string;
  content: string;
  slug: string;
}

interface Props {
  params: { slug: string };
}

export async function generateStaticParams() {
  const posts = await fetch("http://localhost:3000/api/content").then((res) =>
    res.json()
  );

  return posts.map((post: Post) => {
    slug: post.slug;
  });
}

// this is just a regular SSR component making a call to an API, no server actions here
// we could use Prisma here too
export default async function Blog({ params }: Props) {
  const posts = await fetch("http://localhost:3000/api/content").then((res) =>
    res.json()
  );

  const post = posts.find((post: Post) => post.slug === params.slug)!;

  return (
    <main>
      <h1>{post.title}</h1>
      {post.content}
    </main>
  );
}
