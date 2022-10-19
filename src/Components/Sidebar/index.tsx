import { PencilLine } from 'phosphor-react'
import bgAsideImg from '../../assets/bg-aside.avif'
import styles from './style.module.css'

export function Sidebar() {
  return (
    <aside className={styles.sidebar}>
      <img className={styles.cover} src={bgAsideImg} />

      <div className={styles.profile}>
        <img className={styles.avatar} src="https://github.com/renan-tsx.png" />
        <strong>Renan Moreira</strong>
        <span>Web Developer</span>
      </div>

      <footer>
        
        <a href="#">
          <PencilLine size={'1.2rem'}/>
          Editar perfil
        </a>
      </footer>

    </aside>
  )
}