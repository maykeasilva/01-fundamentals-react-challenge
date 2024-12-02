import logo from '../assets/logo.svg'
import styles from './header.module.css'

export function Header() {
  return (
    <header className={styles.header}>
      <img src={logo} alt='' />

      <strong>
        <span>to</span>
        <span>do</span>
      </strong>
    </header>
  )
}
