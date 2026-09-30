import { useEffect, useRef, useState } from "react";
import C from "../config.js";
import { useI18n } from "../i18n.jsx";
import { linkHref } from "../lib.js";
import TopBar from "../components/TopBar.jsx";
import Hero from "../components/Hero.jsx";
import { BattleIcon, CheckIcon, QuizIcon, RewardsIcon } from "../components/icons.jsx";

// Copy: i18n keys "benefits.<id>".
const BENEFITS = [["quiz", QuizIcon], ["battle", BattleIcon], ["rewards", RewardsIcon]];

// A link that is still empty in config does nothing when tapped.
function PageLink({ id }) {
  const { t } = useI18n();
  return <a href={linkHref(id)} onClick={ev => { if (!C.links[id]) ev.preventDefault(); }}>{t(`links.${id}`)}</a>;
}

export default function Landing({ pkg, onPick, onSubscribe }) {
  const { lang, t, price, withCode } = useI18n();
  const inlineRef = useRef(null);
  const barRef = useRef(null);
  const [barOff, setBarOff] = useState(true);

  // Show the bottom bar only while the in-page button is out of sight, so the bar never sits on the price or fine print.
  useEffect(() => {
    if (!("IntersectionObserver" in window)) { setBarOff(false); return; }
    const observer = new IntersectionObserver(([e]) => setBarOff(e.isIntersecting),
      { rootMargin: `0px 0px -${barRef.current.offsetHeight || 80}px 0px` });
    observer.observe(inlineRef.current);
    return () => observer.disconnect();
  }, [lang]);

  return (
    <>
      <div className="screen has-bar">
        <TopBar />
        <section className="hero">
          <Hero />
          <h1 tabIndex={-1}>{t("landing.header")}</h1>
          <p className="tagline">{t("landing.tagline")}</p>
        </section>

        <section className="panel plan" aria-labelledby="pkg-label">
          <h2 className="section-title" id="pkg-label">{t("landing.packageLabel")}</h2>
          <fieldset className="pkgs" aria-labelledby="pkg-label">
            {C.packages.map(p => {
              const on = p.id === pkg;
              return (
                <label key={p.id} className={`pkg${on ? " is-selected" : ""}`}>
                  <input type="radio" name="pkg" id={`pkg-${p.id}`} value={p.id} checked={on} onChange={() => onPick(p.id)} />
                  <span className="pkg-top"><span className="pkg-name">{t(`packages.${p.id}.name`)}</span><span className="pkg-dot"><CheckIcon /></span></span>
                  <span className="pkg-price">{price(p)}</span>
                  <span className="pkg-access">{t(`packages.${p.id}.access`)}</span>
                </label>
              );
            })}
          </fieldset>
          <div className="cta">
            <button type="button" className="btn btn-primary btn-lg btn-shine" ref={inlineRef} onClick={onSubscribe}>{t("landing.subscribe")}</button>
            <p className="fine">{withCode("landing.finePrint")} <PageLink id="terms" /></p>
          </div>
        </section>

        <section className="panel plan" aria-labelledby="get-label">
          <h2 className="section-title" id="get-label">{t("landing.whatYouGet")}</h2>
          <ul className="benefits">
            {BENEFITS.map(([id, Icon]) => (
              <li key={id}><span className="benefit-icon"><Icon /></span><span>{t(`benefits.${id}`)}</span></li>
            ))}
          </ul>
        </section>

        <footer className="footer">
          <PageLink id="terms" /><PageLink id="privacy" /><PageLink id="help" />
        </footer>
      </div>
      <div className={`sticky-bar${barOff ? " is-off" : ""}`} ref={barRef}>
        <button type="button" className="btn btn-primary btn-lg btn-shine" tabIndex={barOff ? -1 : 0} onClick={onSubscribe}>{t("landing.subscribe")}</button>
      </div>
    </>
  );
}
