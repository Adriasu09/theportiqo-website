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

const language = localStorage.getItem("device");

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    fallbackLng: "es", // use en if detected lng is not available
    lng:
      language && JSON.parse(language).state.deviceLanguage.includes("es")
        ? "es-ES"
        : "en-US",
    // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    // you can use the i18n.changeLanguage function to change the language manually: https://www.i18next.com/overview/api#changelanguage
    // if you're using a language detector, do not define the lng option

    interpolation: {
      escapeValue: false, // react already safes from xss
    },
  });

export default i18n;
