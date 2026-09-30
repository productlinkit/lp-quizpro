import { useI18n } from "../i18n.jsx";
import TopBar from "../components/TopBar.jsx";
import AppLink from "../components/AppLink.jsx";
import { AlertIcon, CheckIcon, Spinner, WifiOffIcon } from "../components/icons.jsx";

function Status({ icon, titleKey, textKey, shake = 0, children }) {
  const { t } = useI18n();
  return (
    <div className="screen">
      <TopBar />
      {/* The key restarts the shake each time a retry fails. */}
      <section className={`panel status${shake ? " shake" : ""}`} key={shake}>
        <div className="status-icon">{icon}</div>
        <h1 tabIndex={-1}>{t(titleKey)}</h1>
        <p>{t(textKey)}</p>
        <div className="actions">{children}</div>
      </section>
    </div>
  );
}

export function Blocked({ busy, shake, onRetry }) {
  const { t } = useI18n();
  return (
    <Status icon={<WifiOffIcon />} titleKey="blocked.title" textKey="blocked.text" shake={shake}>
      <button type="button" className="btn btn-primary btn-lg" disabled={busy} aria-busy={busy || undefined} onClick={onRetry}>{busy && <Spinner />}{t("blocked.button")}</button>
    </Status>
  );
}

export function ErrorScreen({ onRetry, onBack }) {
  const { t } = useI18n();
  return (
    <Status icon={<AlertIcon />} titleKey="error.title" textKey="error.text">
      <button type="button" className="btn btn-primary btn-lg" onClick={onRetry}>{t("error.retry")}</button>
      <button type="button" className="btn btn-ghost" onClick={onBack}>{t("error.back")}</button>
    </Status>
  );
}

// Already subscribed: the link hands the user straight to the QuizPro app. The button is the fallback
// when the browser holds the automatic redirect (and the only way out while the demo panel is on).
export function Redirect() {
  const { t } = useI18n();
  return (
    <Status icon={<CheckIcon />} titleKey="redirect.title" textKey="redirect.text">
      <AppLink>{t("redirect.button")}</AppLink>
    </Status>
  );
}
