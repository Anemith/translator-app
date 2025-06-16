import axios from 'axios';

export const translateText = async (text, sourceLang, targetLang, setLoading, setError) => {
  if (!text) return '';
  setLoading(true);
  try {
    const response = await axios.get(
      'https://api.mymemory.translated.net/get',
      {
        params: {
          q: text.trim(),
          langpair: `${sourceLang}|${targetLang}`,
        },
        timeout: 5000
      }
    );
    const { translatedText, match } = response.data.responseData;
    console.log('Відповідь MyMemory:', response.data);

    if (!translatedText || translatedText.toLowerCase() === text.toLowerCase() || match < 0.5) {
      setError('Слово не знайдено або не перекладено');
      return '???';
    }

    setError('');
    return translatedText;
  } catch (error) {
    const errorMessage = error.response
      ? `Код ${error.response.status}: ${error.response.data.error || 'Невідома помилка API'}`
      : `Помилка: ${error.message}`;
    console.error('Помилка перекладу:', errorMessage);
    setError(errorMessage);
    return '???';
  } finally {
    setLoading(false);
  }
};