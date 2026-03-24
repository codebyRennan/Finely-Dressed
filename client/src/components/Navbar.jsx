import { NavLink } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from '../styles/Navbar.module.css';
import ThemeToggle from './ThemeToggle.jsx';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <header className={styles.header}>
      <nav className={styles.navbar}>
        <NavLink to={isAuthenticated ? '/dashboard' : '/login'} className={styles.logo}>
          <span className="gradient-text">Finely Dressed</span>
        </NavLink>

        <div className={styles.actions}>
          {isAuthenticated ? (
            <>
              <div className={styles.links}>
                <NavLink
                  to="/dashboard"
                  className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                >
                  Dashboard
                </NavLink>
                <NavLink
                  to="/profile"
                  className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
                >
                  Perfil
                </NavLink>
              </div>
              <span className={styles.userName}>{user?.name ?? 'Conta'}</span>
              <button type="button" className={styles.logoutButton} onClick={logout}>
                Sair
              </button>
            </>
          ) : (
            <div className={styles.links}>
              <NavLink
                to="/login"
                className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
              >
                Entrar
              </NavLink>
              <NavLink
                to="/register"
                className={({ isActive }) => (isActive ? styles.activeLink : styles.link)}
              >
                Criar conta
              </NavLink>
            </div>
          )}
          <ThemeToggle />
        </div>
      </nav>
    </header>
  );
}

export default Navbar;
