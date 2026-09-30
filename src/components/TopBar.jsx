import { useI18n } from "../i18n.jsx";

export default function TopBar() {
  const { lang, setLang, t } = useI18n();
  return (
    <header className="topbar">
      <div className="brand"><img src="assets/quizpro.png" alt="" width="40" height="40" /><span>{t("brand")}</span></div>
      <div className="lang" data-lang={lang} role="group" aria-label={t("lang.group")}>
        <button type="button" lang="en" aria-pressed={lang === "my"} title="မြန်မာ" onClick={() => setLang("my")}>MY</button>
        <button type="button" lang="en" aria-pressed={lang === "en"} title="English" onClick={() => setLang("en")}>EN</button>
      </div>
    </header>
  );
}
