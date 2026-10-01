import { useEffect, useRef } from "react";

// Drawings shared by the landing hero and the offer screen. Each one is drawn in the landing hero's
// 360 × 224 coordinate space; the offer screen moves and scales them with a wrapping transform.

export const HeroDefs = () => (
  <defs>
    <linearGradient id="hero-gold" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FFE680" /><stop offset="1" stopColor="#FFB300" /></linearGradient>
    <linearGradient id="hero-purple" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9B6BFF" /><stop offset="1" stopColor="#4A1BC9" /></linearGradient>
  </defs>
);

// One piece of an illustration. Each piece floats on its own rhythm (dur, delay, lift in px, tilt in deg)
// and shifts with the mouse by its own depth, so the pieces never move as one block.
export function Piece({ depth, dur, delay = 0, lift, tilt = 0, children }) {
  return (
    <g className="hero-par" style={{ "--d": depth }}>
      <g className="hero-float" style={{ "--lift": `${lift}px`, "--tilt": `${tilt}deg`, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>{children}</g>
    </g>
  );
}

// Mouse parallax for a stage element: sets --px / --py between -1 and 1.
export function useParallax(stage) {
  useEffect(() => {
    const onMove = ev => {
      if (ev.pointerType !== "mouse" || !stage.current) return;
      const r = stage.current.getBoundingClientRect();
      const clamp = v => Math.max(-1, Math.min(1, v));
      stage.current.style.setProperty("--px", clamp((ev.clientX - (r.left + r.width / 2)) / 320));
      stage.current.style.setProperty("--py", clamp((ev.clientY - (r.top + r.height / 2)) / 320));
    };
    addEventListener("pointermove", onMove);
    return () => removeEventListener("pointermove", onMove);
  }, [stage]);
}

export const BackPaper = () => <rect x="106" y="24" width="152" height="176" rx="22" transform="rotate(8 182 112)" fill="#D9C8FF" />;

export const QuestionPaper = () => (
  <g transform="rotate(-5 180 112)">
    <rect x="102" y="18" width="156" height="182" rx="22" fill="#fff" />
    <circle cx="180" cy="68" r="31" fill="url(#hero-purple)" />
    <path d="M169 61c0-6.5 5-11 11-11s11 4.5 11 10.5c0 8-11 8-11 16" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
    <circle cx="180" cy="87.5" r="4.3" fill="#fff" />
    <rect x="118" y="114" width="124" height="21" rx="10.5" fill="#EEE6FF" /><circle cx="130" cy="124.5" r="5" fill="#B9A0F5" /><rect x="142" y="121" width="52" height="7" rx="3.5" fill="#CDBBF8" />
    <rect x="118" y="141" width="124" height="21" rx="10.5" fill="url(#hero-gold)" /><circle cx="130" cy="151.5" r="5" fill="#fff" /><rect x="142" y="148" width="64" height="7" rx="3.5" fill="#fff" opacity=".85" /><path d="M222 151.5l4 4 8-9" stroke="#4A1BC9" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
    <rect x="118" y="168" width="124" height="21" rx="10.5" fill="#EEE6FF" /><circle cx="130" cy="178.5" r="5" fill="#B9A0F5" /><rect x="142" y="175" width="40" height="7" rx="3.5" fill="#CDBBF8" />
  </g>
);

export const Trophy = () => (
  <g transform="rotate(6 298 150)">
    <path d="M272 112h-9c-2.5 0-4 1.5-4 4 0 12 7 20 17 22M324 112h9c2.5 0 4 1.5 4 4 0 12-7 20-17 22" stroke="#FFB300" strokeWidth="7" strokeLinecap="round" />
    <rect x="291" y="152" width="14" height="22" fill="#E08A00" />
    <path d="M270 102h56v24c0 17-12.5 30-28 30s-28-13-28-30z" fill="url(#hero-gold)" />
    <path d="M279 110v16" stroke="#fff" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round" />
    <path d="M298.0 116.0L300.9 123.0L308.5 123.6L302.7 128.5L304.5 135.9L298.0 131.9L291.5 135.9L293.3 128.5L287.5 123.6L295.1 123.0z" fill="#fff" />
    <rect x="278" y="172" width="40" height="12" rx="4" fill="#FFB300" />
    <rect x="268" y="182" width="60" height="16" rx="6" fill="#E08A00" />
  </g>
);

export const CoinStack = () => (
  <g>
    <ellipse cx="60" cy="196" rx="30" ry="10" fill="#E08A00" /><ellipse cx="60" cy="191" rx="30" ry="10" fill="url(#hero-gold)" /><ellipse cx="60" cy="191" rx="19" ry="5.5" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
    <ellipse cx="60" cy="185" rx="30" ry="10" fill="#E08A00" /><ellipse cx="60" cy="180" rx="30" ry="10" fill="url(#hero-gold)" /><ellipse cx="60" cy="180" rx="19" ry="5.5" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
    <ellipse cx="60" cy="174" rx="30" ry="10" fill="#E08A00" /><ellipse cx="60" cy="169" rx="30" ry="10" fill="url(#hero-gold)" /><ellipse cx="60" cy="169" rx="19" ry="5.5" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
    <ellipse cx="60" cy="163" rx="30" ry="10" fill="#E08A00" /><ellipse cx="60" cy="158" rx="30" ry="10" fill="url(#hero-gold)" /><ellipse cx="60" cy="158" rx="19" ry="5.5" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
  </g>
);

export const BigCoin = () => (
  <g transform="rotate(-14 52 86)"><circle cx="52" cy="86" r="21" fill="url(#hero-gold)" stroke="#E08A00" strokeWidth="3" /><circle cx="52" cy="86" r="14" stroke="#fff" strokeOpacity=".6" strokeWidth="2" /><path d="M52.0 78.0L54.1 83.1L59.6 83.5L55.4 87.1L56.7 92.5L52.0 89.6L47.3 92.5L48.6 87.1L44.4 83.5L49.9 83.1z" fill="#E08A00" /></g>
);
export const SmallCoin = () => (
  <g transform="rotate(12 318 52)"><circle cx="318" cy="52" r="15" fill="url(#hero-gold)" stroke="#E08A00" strokeWidth="2.5" /><path d="M318.0 46.0L319.6 49.8L323.7 50.1L320.6 52.8L321.5 56.9L318.0 54.7L314.5 56.9L315.4 52.8L312.3 50.1L316.4 49.8z" fill="#E08A00" /></g>
);
export const TinyCoin = () => <circle cx="98" cy="40" r="9" fill="url(#hero-gold)" stroke="#E08A00" strokeWidth="2" />;

export const Sparkle = ({ x, y, s = 1, i = 0 }) => (
  <g transform={`translate(${x} ${y}) scale(${s})`}>
    <path className="hero-twinkle" style={{ animationDelay: `${-0.45 * i}s` }} fill="#fff" d="M0-9C0-3 3 0 9 0 3 0 0 3 0 9 0 3-3 0-9 0-3 0 0-3 0-9z" />
  </g>
);
