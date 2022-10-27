import { ImgHTMLAttributes } from 'react';
import styles from './style.module.css';

interface AvatarProps extends ImgHTMLAttributes<HTMLImageElement> {
  hasBorder?: boolean;
  src: string;
}

export function Avatar({ hasBorder = true, src, ...rest }: AvatarProps) {
  return (
    <img
      className={hasBorder ? styles.avatarWithBorder : styles.avatar}
      src={src}
      {...rest}
    />
  );
}