import { useI18n } from "../i18n.jsx";
import AppLink from "../components/AppLink.jsx";
import { CheckIcon } from "../components/icons.jsx";

const COLORS = ["#FFC629", "#5B21D6", "#38BDF8", "#F0569B", "#34C77B"];

// Shown over the landing page.
export default function SuccessPopup() {
  const { t } = useI18n();
  return (
    <div className="scrim" role="dialog" aria-modal="true" aria-labelledby="ok-title">
      <div className="modal">
        <div className="confetti" aria-hidden="true">
          {Array.from({ length: 18 }, (_, i) => (
            <i key={i} style={{ left: `${(i * 53) % 100}%`, background: COLORS[i % COLORS.length], animationDelay: `${(i % 6) * 0.08}s` }} />
          ))}
        </div>
        <div className="badge"><CheckIcon /></div>
        <h2 id="ok-title">{t("success.title")}</h2>
        <p>{t("success.text")}</p>
        <AppLink id="start-btn">{t("success.button")}</AppLink>
      </div>
    </div>
  );
}
