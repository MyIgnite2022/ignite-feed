import styles from './style.module.css';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ThumbsUp, Trash } from 'phosphor-react';

interface CommentProps {
    content: {
      id: number;
      author: string;
      comment: string;
      applause: number;
      publishedAt: string;
    },
    onDeleteComment: (comment: string) => void;
}

export function Comment({ content, onDeleteComment }: CommentProps) {

  const date = new Date(content.publishedAt);
  
  const publishedAtFormatted = format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true
  });

  function handleDeleteComment() {
    onDeleteComment(content.comment)
  }

  return (
    <div className={styles.comment}>
      <img src="https://github.com/renan-tsx.png" alt="" />

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
          <button>
            <ThumbsUp />
            Aplaudir <span>{content.applause}</span>
          </button>
        </footer>
      </div>
    </div>
  )
}