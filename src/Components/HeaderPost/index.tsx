import { Avatar } from "../Avatar";
import styles from './style.module.css';

type authorType = {
  name: string;
  role: string;
}

interface HeaderPostProps {
  date: Date;
  author: authorType;
  publishedAtFormatted: string;
  publishedDateRelativeToNow: string;
}

export function HeaderPost({
  date,
  author,
  publishedAtFormatted,
  publishedDateRelativeToNow
}: HeaderPostProps ) {

  return (
    <header>
      <div className={styles.author}>
        <Avatar 
          src="https://github.com/renan-tsx.png" 
          title={author.name}
          alt={author.name}
        />

        <div className={styles.authorInfo}>
          <strong>{ author.name}</strong>
          <span>{ author.role}</span>
        </div>
      </div>

      <time 
        title={publishedAtFormatted} 
        dateTime={date.toISOString()}>
        {publishedDateRelativeToNow}
      </time>
    </header>
  )
}