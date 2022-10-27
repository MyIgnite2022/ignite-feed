import { format, formatDistanceToNow } from 'date-fns';
import ptBR from 'date-fns/locale/pt-BR';
import { ChangeEvent, FormEvent, InvalidEvent, useState } from 'react';
import { CommentProps, PostsProps } from '../../types';
import { Comment } from '../Comment';
import { ContentPost } from '../ContentPost/indext';
import { HeaderPost } from '../HeaderPost';
import styles from './style.module.css';

export function Post({
  author, 
  content, 
  comments,
  publishedAt }: PostsProps) {

  const date = new Date(publishedAt);
  const [newCommentText, setNewCommentsText] = useState('')
  const [newComments, setNewComments] =  useState<CommentProps[]>([...comments])

  const isNewCommentEmpty = newCommentText.length === 0

  const publishedAtFormatted = format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true
  });

  function handleCrateNewChange(event: ChangeEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity('')
    setNewCommentsText(event.target.value)
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event?.target?.setCustomValidity('Esse campo é obrigatório')
  }

  function deleteComment(idtoDelete: number) {
    const commentsWithoutDeletedOne = newComments.filter(({id}) => {
      return id !== idtoDelete
    })
    
    setNewComments(commentsWithoutDeletedOne)
  }

  function handleCrateNewComment(event: FormEvent) {
    event?.preventDefault()
    
    const newComment = {
      "applause": 4,
      "author": "Renan Moreira",
      "comment": newCommentText,
      "id": new Date().getTime(),
      "publishedAt": format(new Date(), "yyyy'-'LL'-'dd hh':'mm':'ss")
    }

    setNewComments([...newComments, newComment ])
    setNewCommentsText('')
  }

  return (
    <article className={styles.post}>
      
      <HeaderPost
        date={date}
        author={author}
        publishedAtFormatted={publishedAtFormatted}
        publishedDateRelativeToNow={publishedDateRelativeToNow}
      />

      <ContentPost content={content}/>

      <form onSubmit={handleCrateNewComment}  className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>

        <textarea
          name='comment'
          placeholder="Deixe um comentário"
          value={newCommentText}
          onChange={handleCrateNewChange}
          onInvalid={handleNewCommentInvalid}
          required
        />

        <footer>
          <button type="submit" disabled={isNewCommentEmpty}>Publicar</button>
        </footer>
      </form>

      <div className={styles.commentList}>
        {newComments.map((comment, id) => {
          return (
            <Comment
              key={id}
              content={comment}
              onDeleteComment={deleteComment}
            />)
        })}
      </div>
    </article>
  )
}