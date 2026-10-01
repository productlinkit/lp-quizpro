import C from "./config.js";

export const params = new URLSearchParams(location.search);
export const devOn = params.get("dev") === "1" || location.hash === "#dev";
export const SCREENS = ["landing", "offer", "confirm", "success", "blocked", "error", "redirect"];

// The offer screen has its own route (/offer?pkg=daily) so a reload or a shared link opens it again.
export const onOfferPath = () => location.pathname.replace(/\/+$/, "") === C.offerPath;
export const pkgFromQuery = () => C.packages.some(p => p.id === params.get("pkg")) ? params.get("pkg") : null;

export const session = {
  get(k) { try { return JSON.parse(sessionStorage.getItem(k)); } catch { return null; } },
  set(k, v) { try { sessionStorage.setItem(k, JSON.stringify(v)); } catch { /* storage unavailable */ } },
};

// ── Simulation switches (demo panel) ──────────────────────────────────
// Order of precedence: query params (?net=blocked&sub=active&result=error), then this tab's saved choice.
export const SIM_DEFAULTS = { network: "ok", user: "new", result: "success" };
export function initialSim() {
  const sim = { ...SIM_DEFAULTS, ...(session.get("qp-sim") || {}) };
  if (params.get("net")) sim.network = params.get("net") === "blocked" ? "blocked" : "ok";
  if (params.get("sub")) sim.user = params.get("sub") === "active" ? "active" : "new";
  if (params.get("result")) sim.result = params.get("result") === "error" ? "error" : "success";
  return sim;
}

export const pkgById = id => C.packages.find(p => p.id === id) || C.packages[0];

// Query string for outbound links: everything the user arrived with except the prototype's own switches.
export function forwardQuery(url) {
  const q = new URLSearchParams(location.search);
  C.internalParams.forEach(k => q.delete(k));
  const s = q.toString();
  return s ? url + (url.includes("?") ? "&" : "?") + s : url;
}
export const linkHref = key => C.links[key] ? forwardQuery(C.links[key]) : "#";
export const appHref = () => forwardQuery(C.appUrl);
export const leave = () => { location.href = appHref(); };

// Where a user lands once the network is fine: subscribers are handed to the QuizPro app.
export const home = sim => sim.user === "active" ? "redirect" : "landing";
