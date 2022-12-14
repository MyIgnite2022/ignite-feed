import styles from './style.module.css';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ThumbsUp, Trash } from 'phosphor-react';
import { useState } from 'react';
import { Avatar } from '../Avatar';

interface CommentProps {
    content: {
      id: number;
      author: string;
      comment: string;
      applause: number;
      publishedAt: string;
    },
    onDeleteComment: (id: number) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {

  const date = new Date(content.publishedAt);

  const [likes, setNewLike] = useState(content.applause)
  
  const publishedAtFormatted = format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true
  });

  function handleDeleteComment() {
    onDeleteComment(content.id)
  }

  return (
    <div className={styles.comment}>
      <Avatar 
        src="https://github.com/renan-tsx.png" 
        hasBorder={false}
        title={content.author}
        alt={content.author}
      />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{content.author}</strong>
              <time 
                title={publishedAtFormatted}
                dateTime={date.toISOString()}>
                  {publishedDateRelativeToNow}
                </time>
            </div>

            <button title="Deletar comentário" onClick={handleDeleteComment}>
              <Trash size={24} />
            </button>
          </header>

          <p>{content.comment}</p>
        </div>

        <footer>
          <button onClick={() => setNewLike(likes + 1)}>
            <ThumbsUp />
            Aplaudir <span>{likes}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}