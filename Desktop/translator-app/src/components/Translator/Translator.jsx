import { useState } from 'react';
import { translateText } from '../../utils/api.js';
import './Translator.css';

function Translator() {
  const [germanText, setGermanText] = useState('');
  const [ukrainianText, setUkrainianText] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleTranslate = async (direction) => {
    setError('');
    if (direction === 'de-to-uk' && germanText) {
      const translation = await translateText(germanText, 'de', 'uk', setLoading, setError);
      setUkrainianText(translation);
    } else if (direction === 'uk-to-de' && ukrainianText) {
      const translation = await translateText(ukrainianText, 'uk', 'de', setLoading, setError);
      setGermanText(translation);
    } else {
      setError('Введіть текст для перекладу');
    }
  };

  return (
    <div className="container">
      <h1>Перекладач з використанням API MyMemory</h1>
      <div className="input-container">
        <div className="input-box">
          <label>Німецька</label>
          <textarea
            className="german-input"
            value={germanText}
            onChange={(e) => setGermanText(e.target.value)}
            placeholder="Введіть текст німецькою"
          />
          <button
            className="translate-button"
            onClick={() => handleTranslate('de-to-uk')}
            disabled={loading || !germanText}
          >
            Перекласти з німецької на українську
          </button>
        </div>
        <div className="input-box">
          <label>Українська</label>
          <textarea
            className="ukrainian-input"
            value={ukrainianText}
            onChange={(e) => setUkrainianText(e.target.value)}
            placeholder="Введіть текст українською"
          />
          <button
            className="translate-button"
            onClick={() => handleTranslate('uk-to-de')}
            disabled={loading || !ukrainianText}
          >
            Перекласти з української на німецьку
          </button>
        </div>
      </div>
      {loading && <div className="loading">Завантаження...</div>}
      {error && <div className="error-message">{error}</div>}
    </div>
  );
}

export default Translator;