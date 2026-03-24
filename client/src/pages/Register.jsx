import { useState } from 'react';
import { Link, Navigate, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import styles from '../styles/AuthPage.module.css';

function Register() {
  const navigate = useNavigate();
  const { isAuthenticated, register } = useAuth();
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  if (isAuthenticated) {
    return <Navigate to="/dashboard" replace />;
  }

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      setError('As senhas precisam ser iguais.');
      return;
    }

    setError('');
    setIsSubmitting(true);

    try {
      await register({
        name: formData.name,
        email: formData.email,
        password: formData.password,
      });
      navigate('/dashboard', { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'Nao foi possivel criar a conta.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={`glass-panel ${styles.card}`}>
        <span className="eyebrow">Cadastro</span>
        <h1 className={styles.title}>Crie sua conta</h1>
        <p className={styles.subtitle}>
          O MVP comeca aqui: autenticacao JWT, perfil salvo e dashboard protegido.
        </p>

        {error ? <div className="status-card error">{error}</div> : null}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className="field">
            <span>Nome</span>
            <input
              type="text"
              value={formData.name}
              onChange={(event) => setFormData((current) => ({ ...current, name: event.target.value }))}
              placeholder="Seu nome"
              required
            />
          </label>

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

          <label className="field">
            <span>Confirmar senha</span>
            <input
              type="password"
              value={formData.confirmPassword}
              onChange={(event) =>
                setFormData((current) => ({ ...current, confirmPassword: event.target.value }))
              }
              placeholder="Repita a senha"
              minLength={6}
              required
            />
          </label>

          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? 'Criando conta...' : 'Criar conta'}
          </button>
        </form>

        <p className={styles.switchText}>
          Ja possui conta? <Link to="/login">Entrar</Link>
        </p>
      </div>
    </section>
  );
}

export default Register;
