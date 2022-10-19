interface PostPros {
  author: string;
  content: string;
}

export function Post({ author, content }: PostPros) {
  return (
    <div>
      <strong>{author}</strong>
      <p>{content}</p>
    </div>
  )
}