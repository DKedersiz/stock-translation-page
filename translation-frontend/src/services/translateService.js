import axios from "axios";

const API_KEY = "XXYY";
const TRANSLATE_URL =
  "https://translation.googleapis.com/language/translate/v2";

const cleanText = (text) => {
  return text.replace(/[^\x00-\x7F]/g, "");
};

const translateText = async (text, targetLanguage) => {
  const cleanedText = cleanText(text);
  const CHUNK_SIZE = 5000;
  const chunks = cleanedText.match(new RegExp(".{1," + CHUNK_SIZE + "}", "g"));

  let translatedText = "";

  for (const chunk of chunks) {
    try {
      const response = await axios.post(
        TRANSLATE_URL,
        {},
        {
          params: {
            q: chunk,
            target: targetLanguage,
            key: API_KEY,
          },
        }
      );
      translatedText += response.data.data.translations[0].translatedText;
    } catch (error) {
      console.error(
        `Çeviri yapılırken hata oluştu: ${error.message}, Parça: ${chunk}`,
        error.response ? error.response.data : error.message
      );
      throw error;
    }
  }

  return translatedText;
};

const translateService = {
  translateText,
};

export default translateService;
