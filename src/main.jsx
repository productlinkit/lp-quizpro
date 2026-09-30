import { createRoot } from "react-dom/client";
import "./styles.css";
import App from "./App.jsx";
import { I18nProvider, initialLang } from "./i18n.jsx";

createRoot(document.getElementById("root")).render(
  <I18nProvider initialLang={initialLang}>
    <App />
  </I18nProvider>
);
