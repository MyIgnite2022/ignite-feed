
import { ContentProps } from '../../types';
import styles from './style.module.css';

interface ContentPostProps {
  content: ContentProps[]
}

export function ContentPost({ content }: ContentPostProps) {
  return (
    <div className={styles.content}>
      {content.map(line => {
        if (line.type === 'paragraph') {
          return <p key={line.content}>{line.content}</p>;
        } else if (line.type === 'link') {
          return <p key={line.content}><a href="#">{line.content}</a></p>
        }
      })}
    </div>
  )
}