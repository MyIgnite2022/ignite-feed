import styles from './style.module.css';

import { format, formatDistanceToNow } from 'date-fns';
import { ptBR } from 'date-fns/locale';
import { ThumbsUp, Trash } from 'phosphor-react';
import { CommentProps } from '../../App';

export function Comment({applause, comment, id, author, publishedAt }: CommentProps) {
  const date = new Date(publishedAt);
  const publishedAtFormatted = format(date, "d 'de' LLLL 'às' HH:mm'h'", {
    locale: ptBR
  });

  const publishedDateRelativeToNow = formatDistanceToNow(date, {
    locale: ptBR,
    addSuffix: true
  });

  return (
    <div className={styles.comment}>
      <img src="https://github.com/renan-tsx.png" alt="" />

      <div className={styles.commentBox}>
        <div className={styles.commentContent}>
          <header>
            <div className={styles.authorAndTime}>
              <strong>{author}</strong>
              <time 
                title={publishedAtFormatted}
                dateTime={date.toISOString()}>
                  {publishedDateRelativeToNow}
                </time>
            </div>

            <button title="Deletar comentário">
              <Trash size={24} />
            </button>
          </header>

          <p>{comment}</p>
        </div>

        <footer>
          <button>
            <ThumbsUp />
            Aplaudir <span>20</span>
          </button>
        </footer>
      </div>
    </div>
  )
}