import { appHref, leave } from "../lib.js";

// Link to the QuizPro app. Inside an embedded preview the frame cannot navigate away, so the link opens by itself there.
export default function AppLink({ children, ...props }) {
  const onClick = ev => { if (self !== top) return; ev.preventDefault(); leave(); };
  return <a className="btn btn-primary btn-lg" href={appHref()} onClick={onClick} {...props}>{children}</a>;
}
