import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { flushSync } from "react-dom";
import { useI18n } from "./i18n.jsx";
import C from "./config.js";
import { requestConfirmation } from "./operator.js";
import { SCREENS, SIM_DEFAULTS, devOn, home, initialSim, leave, onOfferPath, pkgById, pkgFromQuery, session } from "./lib.js";
import Landing from "./screens/Landing.jsx";
import Offer from "./screens/Offer.jsx";
import Confirm from "./screens/Confirm.jsx";
import SuccessPopup from "./screens/SuccessPopup.jsx";
import { Blocked, ErrorScreen, Redirect } from "./screens/Status.jsx";
import DevPanel from "./components/DevPanel.jsx";

// The URL keeps its query string (and #dev) on every step; the screen lives in history state.
// The offer and confirm steps also carry the chosen package, and the offer screen has its own path.
function urlFor(screen, pkg) {
  const q = new URLSearchParams(location.search);
  q.delete("pkg");
  if (screen === "offer" || screen === "confirm") q.set("pkg", pkg);
  const s = q.toString();
  return (screen === "offer" ? C.offerPath : "/") + (s ? `?${s}` : "") + (devOn ? "#dev" : "");
}
const calm = () => matchMedia("(prefers-reduced-motion: reduce)").matches;
const start = () => onOfferPath() ? "offer" : "landing";   // the page the link points at
const entry = sim => sim.network === "blocked" ? "blocked" : home(sim) === "redirect" ? "redirect" : start();

export default function App() {
  const [sim, setSimState] = useState(initialSim);
  const simRef = useRef(sim);                 // latest switches, for the delayed checks below
  const [nav, setNav] = useState(() => ({ screen: entry(sim), from: null, step: 0 }));
  const [pkg, setPkg] = useState(() => pkgFromQuery() || C.defaultPackage);
  const pkgRef = useRef(pkg);
  pkgRef.current = pkg;
  const [busy, setBusy] = useState(false);
  const [shake, setShake] = useState(0);
  const [devOpen, setDevOpen] = useState(false);
  const mainRef = useRef(null);
  const screenRef = useRef(nav.screen);
  const resume = useRef(start());           // where "Try Again" on the blocked screen continues to
  const landingScroll = useRef(0);
  const { screen } = nav;

  function setSim(patch) {
    simRef.current = { ...simRef.current, ...patch };
    session.set("qp-sim", simRef.current);
    setSimState(simRef.current);
  }

  function go(next, { replace = false, push = true, pkg = pkgRef.current } = {}) {
    const from = screenRef.current;
    if (from === "landing" && next !== "landing" && next !== "success") landingScroll.current = scrollY;
    screenRef.current = next;
    if (push) {
      try { history[replace ? "replaceState" : "pushState"]({ screen: next, pkg }, "", urlFor(next, pkg)); } catch { /* sandboxed history */ }
    }
    const apply = () => {
      setBusy(false);
      setShake(0);
      setNav(n => ({ screen: next, from, step: n.step + 1 }));
    };
    // Screens cross-fade where the browser can do it; elsewhere they simply swap.
    if (document.startViewTransition && !calm()) document.startViewTransition(() => flushSync(apply));
    else apply();
  }

  // After each step: move focus to the new screen's heading and restore or reset the scroll position.
  useLayoutEffect(() => {
    document.body.classList.toggle("is-op", nav.screen === "confirm");
    if (nav.step === 0) return;
    const target = nav.screen === "success" ? document.getElementById("start-btn") : mainRef.current.querySelector("h1[tabindex]");
    target?.focus({ preventScroll: true });
    const restore = nav.screen === "landing" && ["offer", "confirm", "error"].includes(nav.from);
    if (nav.screen !== "success") scrollTo(0, restore ? landingScroll.current : 0);
  }, [nav]);

  useEffect(() => {
    try { history.replaceState({ screen: screenRef.current, pkg: pkgRef.current }, "", urlFor(screenRef.current, pkgRef.current)); } catch { /* sandboxed history */ }
    // Back/forward: the offer and confirm steps bring back the package they were opened with;
    // the landing page keeps whatever the user has selected.
    const onPop = ev => {
      const s = ev.state?.screen;
      if (!SCREENS.includes(s)) return;
      if ((s === "offer" || s === "confirm") && ev.state.pkg) setPkg(ev.state.pkg);
      go(s, { push: false });
    };
    addEventListener("popstate", onPop);
    return () => removeEventListener("popstate", onPop);
  }, []);

  // A short fade when the language changes, so the new copy does not just snap in.
  const { lang } = useI18n();
  const firstLang = useRef(true);
  useEffect(() => {
    if (firstLang.current) { firstLang.current = false; return; }
    if (!calm()) mainRef.current?.animate?.([{ opacity: 0.35 }, { opacity: 1 }], { duration: 240, easing: "ease-out" });
  }, [lang]);

  // Already subscribed: hand over to the QuizPro app. While the demo panel is on, the redirect waits for a tap.
  useEffect(() => {
    if (screen !== "redirect" || devOn) return;
    const timer = setTimeout(leave, C.redirectDelayMs);
    return () => clearTimeout(timer);
  }, [screen]);

  function subscribe() {
    if (simRef.current.network === "blocked") { resume.current = "confirm"; go("blocked"); return; }
    go("confirm");
  }
  function confirm() {
    setBusy(true);
    requestConfirmation({ pkg: pkgById(pkg), sim: simRef.current }).then(result => {
      if (screenRef.current !== "confirm") return;
      if (result === "blocked") { resume.current = "confirm"; go("blocked", { replace: true }); return; }
      if (result === "error") { go("error", { replace: true }); return; }
      setSim({ user: "active" });
      go("success", { replace: true });
    });
  }
  function retryBlocked() {
    setBusy(true);
    setTimeout(() => {
      if (screenRef.current !== "blocked") return;
      if (simRef.current.network === "ok") {
        const r = resume.current;
        go(r === "confirm" ? "confirm" : home(simRef.current) === "redirect" ? "redirect" : r, { replace: true });
        return;
      }
      setBusy(false);
      setShake(n => n + 1);
    }, 700);
  }
  function reset() {
    setSim(SIM_DEFAULTS);
    setPkg(C.defaultPackage);
    resume.current = "landing";
    go(entry(SIM_DEFAULTS));
  }

  const landing = <Landing pkg={pkg} onPick={setPkg} onSubscribe={() => go("offer")} />;
  const views = {
    landing,
    offer: <Offer pkg={pkg} onSubscribe={subscribe} />,
    confirm: <Confirm pkg={pkg} busy={busy} onConfirm={confirm} onNotNow={() => go("landing")} />,
    success: <>{landing}<SuccessPopup /></>,
    blocked: <Blocked busy={busy} shake={shake} onRetry={retryBlocked} />,
    error: <ErrorScreen onRetry={() => go("confirm")} onBack={() => go("landing")} />,
    redirect: <Redirect />,
  };

  return (
    <>
      <div className="backdrop" aria-hidden="true" />
      <div className="phone"><main id="app" ref={mainRef} key={nav.step}>{views[screen]}</main></div>
      {devOn && <DevPanel open={devOpen} onToggle={() => setDevOpen(o => !o)} sim={sim} onSet={setSim} screen={screen} onGo={go} onReset={reset} />}
    </>
  );
}
