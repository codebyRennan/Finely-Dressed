import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from '../styles/Dashboard.module.css';

const looks = [
  {
    title: 'Summer Casual',
    tags: ['casual', 'quente', 'leve'],
    description: 'Base enxuta para dias quentes com conforto e leitura visual limpa.',
  },
  {
    title: 'Office Layers',
    tags: ['trabalho', 'frio', 'elegante'],
    description: 'Camadas formais para uso diario no escritorio durante o inverno.',
  },
  {
    title: 'Night Out',
    tags: ['festa', 'ameno', 'urbano'],
    description: 'Mistura de streetwear com brilho para uma sugestao noturna.',
  },
];

function Dashboard() {
  const { user } = useAuth();

  return (
    <section className={styles.layout}>
      <div className={`glass-panel ${styles.hero}`}>
        <span className="eyebrow">Dashboard</span>
        <h1 className={styles.title}>Ola, {user?.name?.split(' ')[0] ?? 'usuaria(o)'}</h1>
        <p className={styles.subtitle}>
          A base da migracao ja esta pronta: login real, protecao por JWT e perfil conectado ao banco.
        </p>
        <div className={styles.heroActions}>
          <Link to="/profile" className="primary-button">
            Ajustar preferencias
          </Link>
          <span className="status-card">
            Tema atual: <strong>{user?.theme ?? 'light'}</strong>
          </span>
        </div>
      </div>

      <div className={styles.grid}>
        <article className={`glass-panel ${styles.panel}`}>
          <h2>Sugestao diaria</h2>
          <p>
            Na Fase 2 este bloco cruza clima + humor. Por enquanto ele exibe a estrutura pronta
            para receber os looks filtrados pela API.
          </p>
        </article>

        <article className={`glass-panel ${styles.panel}`}>
          <h2>Resumo do perfil</h2>
          <ul className={styles.list}>
            <li>Cores favoritas: {(user?.preferences?.colors ?? []).join(', ') || 'Nao definido'}</li>
            <li>Estilos: {(user?.preferences?.styles ?? []).join(', ') || 'Nao definido'}</li>
            <li>Musicas: {(user?.preferences?.music ?? []).join(', ') || 'Nao definido'}</li>
            <li>Cultura: {(user?.preferences?.culture ?? []).join(', ') || 'Nao definido'}</li>
          </ul>
        </article>
      </div>

      <section className={styles.looks}>
        {looks.map((look) => (
          <article key={look.title} className={`glass-panel ${styles.lookCard}`}>
            <div className={styles.cardTop}>
              <h3>{look.title}</h3>
              <div className={styles.tags}>
                {look.tags.map((tag) => (
                  <span key={tag}>{tag}</span>
                ))}
              </div>
            </div>
            <p>{look.description}</p>
            <div className={styles.feedbackRow}>
              <button type="button" className={styles.feedbackButton}>
                Like
              </button>
              <button type="button" className={styles.feedbackButton}>
                Dislike
              </button>
            </div>
          </article>
        ))}
      </section>
    </section>
  );
}

export default Dashboard;
