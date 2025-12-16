import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import enLang from "./en/common.json";
import esLang from "./es/common.json";

// the translations
// (tip move them in a JSON file and import them,
// or even better, manage them separated from your code: https://react.i18next.com/guides/multiple-translation-files)
const resources = {
  "en-US": {
    translation: enLang,
  },
  "es-ES": {
    translation: esLang,
  },
};

const getInitialLanguage = (): string => {
  try {
    const language = localStorage.getItem("device");
    if (!language) return "en-US";
    
    const parsed = JSON.parse(language);
    const deviceLanguage = parsed?.state?.deviceLanguage;
    
    if (typeof deviceLanguage === "string" && deviceLanguage.includes("es")) {
      return "es-ES";
    }
    return "en-US";
  } catch (error) {
    // If localStorage is corrupted or unavailable, default to English
    console.warn("Failed to parse language from localStorage:", error);
    return "en-US";
  }
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "es-ES", // use en if detected lng is not available
    lng: getInitialLanguage(),
    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
