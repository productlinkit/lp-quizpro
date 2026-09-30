import { SCREENS } from "../lib.js";

const SWITCHES = [
  ["network", "Network", [["ok", "OK"], ["blocked", "Blocked"]]],
  ["user", "User", [["new", "New"], ["active", "Subscribed"]]],
  ["result", "Confirm result", [["success", "Success"], ["error", "Error"]]],
];

// Hidden demo panel (?dev=1).
export default function DevPanel({ open, onToggle, sim, onSet, screen, onGo, onReset }) {
  return (
    <div id="dev">
      <button type="button" className="dev-fab" aria-expanded={open} onClick={onToggle}>DEMO</button>
      {open && (
        <div className="dev-panel" lang="en" role="region" aria-label="Demo controls">
          {SWITCHES.map(([key, label, opts]) => (
            <div key={key}>
              <h3>{label}</h3>
              <div className="dev-seg">
                {opts.map(([val, txt]) => (
                  <button key={val} type="button" aria-pressed={sim[key] === val} onClick={() => onSet({ [key]: val })}>{txt}</button>
                ))}
              </div>
            </div>
          ))}
          <div>
            <h3>Jump to screen</h3>
            <div className="dev-jump">
              {SCREENS.map(s => <button key={s} type="button" aria-current={screen === s} onClick={() => onGo(s)}>{s}</button>)}
            </div>
          </div>
          <button type="button" className="btn btn-ghost" style={{ fontFamily: "inherit", fontSize: ".8125rem", minHeight: 44 }} onClick={onReset}>Reset &amp; reload entry</button>
          <p className="dev-note">Switches apply on the next step (Subscribe, Confirm, Try Again). "Reset" re-runs the entry check: blocked → network page, subscribed → redirect to QuizPro. While this panel is on, the redirect waits for a tap.</p>
        </div>
      )}
    </div>
  );
}
