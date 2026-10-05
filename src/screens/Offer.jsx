import C from "../config.js";
import { useI18n } from "../i18n.jsx";
import TopBar from "../components/TopBar.jsx";
import OfferHero from "../components/OfferHero.jsx";

// The landing page, ahead of U9's confirmation: one screen, no scrolling,
// big visual on top and the offer card with the button at the bottom.
export default function Offer({ onSubscribe }) {
  const { t, num } = useI18n();
  const p = C.pkg;
  const price = t("offer.price", { amount: num(p.price) });
  // Copy with the price highlighted.
  const withPrice = key => {
    const [before, after = ""] = t(key).split("{price}");
    return <>{before}<span className="offer-price">{price}</span>{after}</>;
  };
  return (
    <div className="screen offer">
      <TopBar />
      <OfferHero />
      <section className="offer-card" aria-labelledby="offer-title">
        <h1 id="offer-title" tabIndex={-1}><span>{t("offer.headline1")}</span> <span className="offer-gold">{t("offer.headline2")}</span></h1>
        <button type="button" className="btn btn-gold btn-lg btn-shine" onClick={onSubscribe}>{t("offer.cta")}</button>
        <p className="offer-fine">{withPrice(`offer.line1.${p.id}`)}<br />{t(`offer.line2.${p.id}`)}</p>
      </section>
    </div>
  );
}
