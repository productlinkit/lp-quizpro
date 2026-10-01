import { useRef, useState } from "react";
import { BackPaper, BigCoin, CoinStack, HeroDefs, Piece, QuestionPaper, SmallCoin, Sparkle, TinyCoin, Trophy, useParallax } from "./heroParts.jsx";

const COINS = 9;
const SPARKLES = [[28, 38, 1.1], [342, 104, 0.8], [274, 22, 1], [20, 140, 0.7], [236, 8, 0.6]];

// Landing hero: question paper, trophy and coins. A tap throws a handful of coins.
export default function Hero() {
  const stage = useRef(null);
  const [burst, setBurst] = useState(0);
  useParallax(stage);

  return (
    <div className="hero-stage" ref={stage} aria-hidden="true" onPointerDown={() => setBurst(n => n + 1)}>
      <div className={burst ? "hero-bump" : undefined} key={burst}>
        <svg className="hero-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 224" fill="none">
          <HeroDefs />
          <ellipse cx="180" cy="210" rx="140" ry="11" fill="#1E0A66" opacity=".3" />
          <Piece depth={4} dur={5.2} delay={-1.4} lift={-4} tilt={1.5}><BackPaper /></Piece>
          <Piece depth={8} dur={4.4} lift={-7} tilt={-1.5}><QuestionPaper /></Piece>
          <Piece depth={14} dur={3.4} delay={-0.9} lift={-6} tilt={3}><Trophy /></Piece>
          <Piece depth={12} dur={5} delay={-2.2} lift={-3}><CoinStack /></Piece>
          <Piece depth={22} dur={2.8} delay={-0.4} lift={-11} tilt={-10}><BigCoin /></Piece>
          <Piece depth={26} dur={3.3} delay={-1.7} lift={-9} tilt={12}><SmallCoin /></Piece>
          <Piece depth={18} dur={2.4} delay={-1.1} lift={-8}><TinyCoin /></Piece>
          {SPARKLES.map(([x, y, s], i) => <Sparkle key={i} x={x} y={y} s={s} i={i} />)}
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
