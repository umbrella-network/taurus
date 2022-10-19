import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import resources from "translations";

i18n.use(initReactI18next).init({
  lng: "en",
  interpolation: {
    escapeValue: false,
  },
  resources,
});

export default i18n;
