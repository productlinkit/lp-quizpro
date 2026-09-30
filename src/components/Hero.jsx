import { useEffect, useRef, useState } from "react";

const COINS = 9;

// One piece of the illustration. Each piece floats on its own rhythm (dur, delay, lift in px, tilt in deg)
// and shifts with the mouse by its own depth, so the paper, trophy and coins never move as one block.
function Piece({ depth, dur, delay = 0, lift, tilt = 0, children }) {
  return (
    <g className="hero-par" style={{ "--d": depth }}>
      <g className="hero-float" style={{ "--lift": `${lift}px`, "--tilt": `${tilt}deg`, animationDuration: `${dur}s`, animationDelay: `${delay}s` }}>{children}</g>
    </g>
  );
}

// Hero illustration: question paper, trophy and coins. A tap throws a handful of coins.
export default function Hero() {
  const stage = useRef(null);
  const [burst, setBurst] = useState(0);

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
  }, []);

  return (
    <div className="hero-stage" ref={stage} aria-hidden="true" onPointerDown={() => setBurst(n => n + 1)}>
      <div className={burst ? "hero-bump" : undefined} key={burst}>
        <svg className="hero-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 224" fill="none">
          <defs>
            <linearGradient id="hero-gold" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#FFE680" /><stop offset="1" stopColor="#FFB300" /></linearGradient>
            <linearGradient id="hero-purple" x1="0" y1="0" x2="1" y2="1"><stop stopColor="#9B6BFF" /><stop offset="1" stopColor="#4A1BC9" /></linearGradient>
          </defs>
          <ellipse cx="180" cy="210" rx="140" ry="11" fill="#1E0A66" opacity=".3" />

          {/* Paper behind */}
          <Piece depth={4} dur={5.2} delay={-1.4} lift={-4} tilt={1.5}>
            <rect x="106" y="24" width="152" height="176" rx="22" transform="rotate(8 182 112)" fill="#D9C8FF" />
          </Piece>

          {/* Question paper */}
          <Piece depth={8} dur={4.4} lift={-7} tilt={-1.5}>
            <g transform="rotate(-5 180 112)">
              <rect x="102" y="18" width="156" height="182" rx="22" fill="#fff" />
              <circle cx="180" cy="68" r="31" fill="url(#hero-purple)" />
              <path d="M169 61c0-6.5 5-11 11-11s11 4.5 11 10.500c0 8-11 8-11 16" stroke="#fff" strokeWidth="7" strokeLinecap="round" strokeLinejoin="round" />
              <circle cx="180" cy="87.5" r="4.3" fill="#fff" />
              <rect x="118" y="114" width="124" height="21" rx="10.5" fill="#EEE6FF" /><circle cx="130" cy="124.5" r="5" fill="#B9A0F5" /><rect x="142" y="121" width="52" height="7" rx="3.5" fill="#CDBBF8" />
              <rect x="118" y="141" width="124" height="21" rx="10.5" fill="url(#hero-gold)" /><circle cx="130" cy="151.5" r="5" fill="#fff" /><rect x="142" y="148" width="64" height="7" rx="3.5" fill="#fff" opacity=".85" /><path d="M222 151.5l4 4 8-9" stroke="#4A1BC9" strokeWidth="3.2" strokeLinecap="round" strokeLinejoin="round" />
              <rect x="118" y="168" width="124" height="21" rx="10.5" fill="#EEE6FF" /><circle cx="130" cy="178.5" r="5" fill="#B9A0F5" /><rect x="142" y="175" width="40" height="7" rx="3.5" fill="#CDBBF8" />
            </g>
          </Piece>

          {/* Trophy */}
          <Piece depth={14} dur={3.4} delay={-0.9} lift={-6} tilt={3}>
            <g transform="rotate(6 298 150)">
              <path d="M272 112h-9c-2.5 0-4 1.5-4 4 0 12 7 20 17 22M324 112h9c2.500 0 4 1.500 4 4 0 12-7 20-17 22" stroke="#FFB300" strokeWidth="7" strokeLinecap="round" />
              <rect x="291" y="152" width="14" height="22" fill="#E08A00" />
              <path d="M270 102h56v24c0 17-12.5 30-28 30s-28-13-28-30z" fill="url(#hero-gold)" />
              <path d="M279 110v16" stroke="#fff" strokeOpacity=".7" strokeWidth="5" strokeLinecap="round" />
              <path d="M298.0 116.0L300.9 123.0L308.5 123.6L302.7 128.5L304.5 135.9L298.0 131.9L291.5 135.9L293.3 128.5L287.5 123.6L295.1 123.0z" fill="#fff" />
              <rect x="278" y="172" width="40" height="12" rx="4" fill="#FFB300" />
              <rect x="268" y="182" width="60" height="16" rx="6" fill="#E08A00" />
            </g>
          </Piece>

          {/* Coin stack */}
          <Piece depth={12} dur={5} delay={-2.2} lift={-3}>
          <ellipse cx="60" cy="196" rx="30" ry="10" fill="#E08A00" /><ellipse cx="60" cy="191" rx="30" ry="10" fill="url(#hero-gold)" /><ellipse cx="60" cy="191" rx="19" ry="5.5" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
          <ellipse cx="60" cy="185" rx="30" ry="10" fill="#E08A00" /><ellipse cx="60" cy="180" rx="30" ry="10" fill="url(#hero-gold)" /><ellipse cx="60" cy="180" rx="19" ry="5.5" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
          <ellipse cx="60" cy="174" rx="30" ry="10" fill="#E08A00" /><ellipse cx="60" cy="169" rx="30" ry="10" fill="url(#hero-gold)" /><ellipse cx="60" cy="169" rx="19" ry="5.5" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
          <ellipse cx="60" cy="163" rx="30" ry="10" fill="#E08A00" /><ellipse cx="60" cy="158" rx="30" ry="10" fill="url(#hero-gold)" /><ellipse cx="60" cy="158" rx="19" ry="5.5" stroke="#fff" strokeOpacity=".55" strokeWidth="2" />
          </Piece>

          {/* Loose coins */}
          <Piece depth={22} dur={2.8} delay={-0.4} lift={-11} tilt={-10}>
            <g transform="rotate(-14 52 86)"><circle cx="52" cy="86" r="21" fill="url(#hero-gold)" stroke="#E08A00" strokeWidth="3" /><circle cx="52" cy="86" r="14" stroke="#fff" strokeOpacity=".6" strokeWidth="2" /><path d="M52.0 78.0L54.1 83.1L59.6 83.5L55.4 87.1L56.7 92.5L52.0 89.6L47.3 92.5L48.6 87.1L44.4 83.5L49.9 83.1z" fill="#E08A00" /></g>
          </Piece>
          <Piece depth={26} dur={3.3} delay={-1.7} lift={-9} tilt={12}>
            <g transform="rotate(12 318 52)"><circle cx="318" cy="52" r="15" fill="url(#hero-gold)" stroke="#E08A00" strokeWidth="2.5" /><path d="M318.0 46.0L319.6 49.8L323.7 50.1L320.6 52.8L321.5 56.9L318.0 54.7L314.5 56.9L315.4 52.8L312.3 50.1L316.4 49.8z" fill="#E08A00" /></g>
          </Piece>
          <Piece depth={18} dur={2.4} delay={-1.1} lift={-8}>
            <circle cx="98" cy="40" r="9" fill="url(#hero-gold)" stroke="#E08A00" strokeWidth="2" />
          </Piece>

          {/* Sparkles */}
        <g transform="translate(28 38) scale(1.1)"><path className="hero-twinkle" style={{ animationDelay: "-0.00s" }} fill="#fff" d="M0-9C0-3 3 0 9 0 3 0 0 3 0 9 0 3-3 0-9 0-3 0 0-3 0-9z" /></g>
        <g transform="translate(342 104) scale(0.8)"><path className="hero-twinkle" style={{ animationDelay: "-0.45s" }} fill="#fff" d="M0-9C0-3 3 0 9 0 3 0 0 3 0 9 0 3-3 0-9 0-3 0 0-3 0-9z" /></g>
        <g transform="translate(274 22) scale(1)"><path className="hero-twinkle" style={{ animationDelay: "-0.90s" }} fill="#fff" d="M0-9C0-3 3 0 9 0 3 0 0 3 0 9 0 3-3 0-9 0-3 0 0-3 0-9z" /></g>
        <g transform="translate(20 140) scale(0.7)"><path className="hero-twinkle" style={{ animationDelay: "-1.35s" }} fill="#fff" d="M0-9C0-3 3 0 9 0 3 0 0 3 0 9 0 3-3 0-9 0-3 0 0-3 0-9z" /></g>
        <g transform="translate(236 8) scale(0.6)"><path className="hero-twinkle" style={{ animationDelay: "-1.80s" }} fill="#fff" d="M0-9C0-3 3 0 9 0 3 0 0 3 0 9 0 3-3 0-9 0-3 0 0-3 0-9z" /></g>
        </svg>
        {burst > 0 && Array.from({ length: COINS }, (_, i) => {
          const angle = (-160 + (140 / (COINS - 1)) * i + ((burst * 37 + i * 53) % 24) - 12) * Math.PI / 180;
          const reach = 90 + ((burst * 29 + i * 41) % 50);
          return <i key={i} className="coin" style={{ "--dx": `${Math.cos(angle) * reach}px`, "--dy": `${Math.sin(angle) * reach}px`, animationDelay: `${(i % 3) * 40}ms` }} />;
        })}
      </div>
    </div>
  );
}
