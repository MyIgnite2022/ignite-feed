import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { Header } from "./Components/Header"
import { Post } from './Components/Post'
import { Sidebar } from './Components/Sidebar'

export interface ContentProps {
  content: string;
  type: "paragraph" | "link";
}

export interface CommentProps {
  publishedAt: string;
  author: string;
  applause: number;
  comment: string;
  id: number;
}

export interface PostsProps {
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  },
  content: ContentProps[],
  id: number;
  publishedAt: string;
  comments: CommentProps[]
}

function App() {
  const [posts, setPosts] = useState<PostsProps[]>([])

  useEffect(() => {
    const getPosts = async () => {
      await fetch('./db.JSON')
        .then(response => response.json())
        .then((json) => setPosts(json))
    }

    getPosts()
  },[])

  return (
    <div>
      <Header />

      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {posts.map(post => {
            return (
              <Post
                id={post.id}
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
                comments={post.comments}
              />
            )
          })}
        </main>
      </div>
    </div>
  )
}

export default App
