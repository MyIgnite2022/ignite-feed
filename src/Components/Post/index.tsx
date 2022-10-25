import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { useState } from 'react';
import { CommentProps, PostsProps } from '../../App';
import { Avatar } from '../Avatar';
import { Comment } from '../Comment';
import styles from './style.module.css';

type PostProps = Pick<PostsProps, 'author' | 'content' | 'publishedAt' | 'comments'>

export function Post({ author, content, publishedAt, comments }: PostProps) {
  const [newComments, setNewComments] =  useState<CommentProps[]>([...comments])

  const date = new Date(publishedAt);
  const publishedAtFormatted = format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true
  });

  const [newCommentText, setNewCommentsText] = useState('')

  function handleCrateNewChange() {
    setNewCommentsText(event.target.value)
  }

  function handleCrateNewComment() {
    event?.preventDefault()
    
    const newComment = {
      "applause": 4,
      "author": "Renan Moreira",
      "comment": newCommentText,
      "id": 1,
      "publishedAt": format(new Date(), "yyyy'-'LL'-'dd hh':'mm':'ss")
    }

    setNewComments([...newComments, newComment ])
    setNewCommentsText('')
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar src="https://github.com/renan-tsx.png"/>
          <div className={styles.authorInfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>

        <time 
          title={publishedAtFormatted} 
          dateTime={date.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>

      <div className={styles.content}>
        {content.map(line => {
          if (line.type === 'paragraph') {
            return <p>{line.content}</p>;
          } else if (line.type === 'link') {
            return <p><a href="#">{line.content}</a></p>
          }
        })}
      </div>

      <form onSubmit={handleCrateNewComment}  className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleCrateNewChange}
        />

        <footer>
          <button type="submit">Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {newComments.map(comment => {
          return (
            <Comment
              key={comment.id}
              publishedAt={comment.publishedAt}
              author={comment.author}
              applause={comment.applause} 
              comment={comment.comment} 
              id={comment.id}
            />)
        })}
      </div>
    </article>
  )
}