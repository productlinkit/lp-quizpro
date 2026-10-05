import C from "../config.js";
import { useI18n } from "../i18n.jsx";
import { InfoIcon, Spinner } from "../components/icons.jsx";

// Stand-in for U9's own consent page: deliberately plain, no U9 branding.
// The service line is one translated string ("QuizPro · Daily"); it is shown as title + package tag.
export default function Confirm({ busy, onConfirm, onNotNow }) {
  const { t, price, withCode } = useI18n();
  const p = C.pkg;
  const service = t("confirm.service", { name: t(`packages.${p.id}.name`) });
  const cut = service.indexOf(" · ");
  const [svc, plan] = cut < 0 ? [service, ""] : [service.slice(0, cut), service.slice(cut + 3)];
  return (
    <div className="op">
      <div className="op-body">
        <div className="op-summary">
          <div className="op-head">
            <img className="op-app" src="/assets/quizpro.png" alt="" width="48" height="48" />
            <h1 className="op-service" tabIndex={-1} aria-label={service}>
              <span>{svc}</span>{plan && <span className="op-plan">{plan}</span>}
            </h1>
          </div>
          <p className="op-price">{price(p)}</p>
        </div>
        <p className="op-cancel"><InfoIcon /><span>{withCode("confirm.cancel")}</span></p>
      </div>
      <div className="op-actions">
        <button type="button" className="btn btn-dark" disabled={busy} aria-busy={busy || undefined} onClick={onConfirm}>{busy && <Spinner />}{t("confirm.confirm")}</button>
        <button type="button" className="btn btn-plain" disabled={busy} onClick={onNotNow}>{t("confirm.notNow")}</button>
      </div>
    </div>
  );
}
