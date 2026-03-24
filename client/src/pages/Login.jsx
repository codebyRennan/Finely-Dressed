import { useState } from 'react';
import { Link, Navigate, useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from '../styles/AuthPage.module.css';

function Login() {
  const navigate = useNavigate();
  const location = useLocation();
  const { isAuthenticated, login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await login(formData);
      const nextPath = location.state?.from?.pathname ?? '/dashboard';
      navigate(nextPath, { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'Nao foi possivel entrar.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={`glass-panel ${styles.card}`}>
        <span className="eyebrow">Fase 1</span>
        <h1 className={styles.title}>Acesse sua conta</h1>
        <p className={styles.subtitle}>
          Entre com um cadastro real para continuar montando seus looks.
        </p>

        {error ? <div className="status-card error">{error}</div> : null}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className="field">
            <span>E-mail</span>
            <input
              type="email"
              value={formData.email}
              onChange={(event) => setFormData((current) => ({ ...current, email: event.target.value }))}
              placeholder="voce@email.com"
              required
            />
          </label>

          <label className="field">
            <span>Senha</span>
            <input
              type="password"
              value={formData.password}
              onChange={(event) =>
                setFormData((current) => ({ ...current, password: event.target.value }))
              }
              placeholder="Minimo de 6 caracteres"
              minLength={6}
              required
            />
          </label>

          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? 'Entrando...' : 'Entrar'}
          </button>
        </form>

        <p className={styles.switchText}>
          Ainda nao tem conta? <Link to="/register">Criar cadastro</Link>
        </p>
      </div>
    </section>
  );
}

export default Login;
