import { useTheme } from '../context/ThemeContext.jsx';
import styles from '../styles/ThemeToggle.module.css';

function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      className={styles.toggle}
      onClick={toggleTheme}
      aria-label="Alternar tema"
      title="Alternar tema"
    >
      {theme === 'dark' ? '☀' : '☾'}
    </button>
  );
}

export default ThemeToggle;
