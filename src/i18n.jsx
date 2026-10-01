import { createContext, useContext, useEffect, useMemo, useState } from "react";
import C from "./config.js";
import { params } from "./lib.js";

const MY_DIGITS = "၀၁၂၃၄၅၆၇၈၉";
const I18n = createContext(null);
export const useI18n = () => useContext(I18n);
export const initialLang = params.get("lang") === "en" ? "en" : params.get("lang") === "my" ? "my" : C.defaultLang;

// Copy is fetched from public/i18n/my.json and en.json, so it can be edited without touching the code.
export function I18nProvider({ initialLang, children }) {
  const [lang, setLang] = useState(initialLang);
  const [dict, setDict] = useState(null);
  const [failed, setFailed] = useState(false);

  useEffect(() => {
    Promise.all(["en", "my"].map(l => fetch(`/i18n/${l}.json`).then(r => r.json())))
      .then(([en, my]) => setDict({ en, my }))
      .catch(() => setFailed(true));
  }, []);
  useEffect(() => { document.documentElement.lang = lang; }, [lang]);

  const value = useMemo(() => {
    if (!dict) return null;
    const num = n => lang === "my" ? String(n).replace(/\d/g, d => MY_DIGITS[d]) : String(n);
    function t(key, vars = {}) {
      let s = dict[lang][key] ?? dict.en[key] ?? key;
      for (const [k, v] of Object.entries(vars)) s = s.split(`{${k}}`).join(v);
      return s;
    }
    // Copy with the cancel code highlighted.
    function withCode(key) {
      const [before, after = ""] = t(key).split("{cancelCode}");
      return <>{before}<span className="code">{C.cancelCode}</span>{after}</>;
    }
    const price = p => t("price", { amount: num(p.price) });
    return { lang, setLang, t, num, withCode, price };
  }, [lang, dict]);

  if (failed) {
    return <div className="phone"><div className="screen"><div className="panel">Could not load i18n/my.json and i18n/en.json. Run the dev server (npm run dev).</div></div></div>;
  }
  if (!value) return null;
  return <I18n.Provider value={value}>{children}</I18n.Provider>;
}
