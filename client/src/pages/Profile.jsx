import { useEffect, useMemo, useState } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import { useTheme } from '../context/ThemeContext.jsx';
import styles from '../styles/Profile.module.css';

function listToString(value) {
  return (value ?? []).join(', ');
}

function stringToList(value) {
  return value
    .split(',')
    .map((item) => item.trim())
    .filter(Boolean);
}

function Profile() {
  const { user, saveProfile } = useAuth();
  const { theme } = useTheme();
  const initialData = useMemo(
    () => ({
      colors: listToString(user?.preferences?.colors),
      styles: listToString(user?.preferences?.styles),
      music: listToString(user?.preferences?.music),
      culture: listToString(user?.preferences?.culture),
      bodyType: user?.bodyProfile?.type ?? '',
      measurements: user?.bodyProfile?.measurements ?? '',
    }),
    [user],
  );
  const [formData, setFormData] = useState(initialData);
  const [status, setStatus] = useState('');
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    setFormData(initialData);
  }, [initialData]);

  const handleChange = (key, value) => {
    setFormData((current) => ({ ...current, [key]: value }));
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError('');
    setStatus('');
    setIsSubmitting(true);

    try {
      await saveProfile({
        preferences: {
          colors: stringToList(formData.colors),
          styles: stringToList(formData.styles),
          music: stringToList(formData.music),
          culture: stringToList(formData.culture),
        },
        bodyProfile: {
          type: formData.bodyType,
          measurements: formData.measurements,
        },
        theme,
      });
      setStatus('Perfil salvo com sucesso.');
    } catch (requestError) {
      setError(requestError.response?.data?.message ?? 'Nao foi possivel salvar o perfil.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section className={styles.wrapper}>
      <div className={`glass-panel ${styles.card}`}>
        <span className="eyebrow">Perfil</span>
        <h1>Preferencias pessoais</h1>
        <p className={styles.subtitle}>
          Salve gostos e medidas para que a recomendacao possa ficar personalizada nas proximas fases.
        </p>

        {status ? <div className="status-card success">{status}</div> : null}
        {error ? <div className="status-card error">{error}</div> : null}

        <form className={styles.form} onSubmit={handleSubmit}>
          <label className="field">
            <span>Cores favoritas</span>
            <input
              type="text"
              value={formData.colors}
              onChange={(event) => handleChange('colors', event.target.value)}
              placeholder="preto, bege, azul"
            />
          </label>

          <label className="field">
            <span>Estilos</span>
            <input
              type="text"
              value={formData.styles}
              onChange={(event) => handleChange('styles', event.target.value)}
              placeholder="casual, formal, streetwear"
            />
          </label>

          <label className="field">
            <span>Musica</span>
            <input
              type="text"
              value={formData.music}
              onChange={(event) => handleChange('music', event.target.value)}
              placeholder="indie, rap, pop"
            />
          </label>

          <label className="field">
            <span>Cultura</span>
            <input
              type="text"
              value={formData.culture}
              onChange={(event) => handleChange('culture', event.target.value)}
              placeholder="minimalista, vintage"
            />
          </label>

          <label className="field">
            <span>Tipo de corpo</span>
            <input
              type="text"
              value={formData.bodyType}
              onChange={(event) => handleChange('bodyType', event.target.value)}
              placeholder="retangular, ampulheta"
            />
          </label>

          <label className="field">
            <span>Medidas</span>
            <textarea
              value={formData.measurements}
              onChange={(event) => handleChange('measurements', event.target.value)}
              placeholder="altura: 1,70 | manequim: 40"
              rows="4"
            />
          </label>

          <button type="submit" className="primary-button" disabled={isSubmitting}>
            {isSubmitting ? 'Salvando...' : 'Salvar preferencias'}
          </button>
        </form>
      </div>
    </section>
  );
}

export default Profile;
