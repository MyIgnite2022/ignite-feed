import igniteLogoSvg from '../../assets/ignite-logo.svg';
import styles from './style.module.css';

export function Header() {
  return (
    <header className={styles.header}>
      <img src={igniteLogoSvg} alt="Logotipo do Ignite" />
    </header>
  );
}
