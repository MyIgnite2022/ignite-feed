import { useEffect, useState } from 'react'
import styles from './App.module.css'
import { Header } from "./Components/Header"
import { Post } from './Components/Post'
import { Sidebar } from './Components/Sidebar'
import { api } from './services/api'
import { PostsProps } from './types'

function App() {
  const [posts, setPosts] = useState<PostsProps[]>([])

  useEffect(() => {
    const getPosts = async () => {
      const res = await api.get('/posts')
      setPosts(res.data)
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
