import { useRef } from "react";
import { BackPaper, BigCoin, CoinStack, HeroDefs, Piece, QuestionPaper, SmallCoin, Sparkle, TinyCoin, Trophy, useParallax } from "./heroParts.jsx";

// Moves a drawing whose centre in the drawings' own space is (ox, oy) to (x, y) in this space, at scale s.
const at = (x, y, s, ox, oy) => `translate(${x - ox * s} ${y - oy * s}) scale(${s})`;
const SPARKLES = [[24, 40, 1], [338, 30, 0.9], [330, 230, 0.7], [22, 250, 0.8], [250, 8, 0.6], [110, 14, 0.6]];

// Offer screen visual: a phone showing QuizPro in the middle, with the quiz paper, trophy, coins and
// the Q icon floating around it.
export default function OfferHero() {
  const stage = useRef(null);
  useParallax(stage);
  return (
    <div className="offer-stage" ref={stage} aria-hidden="true">
      <svg className="offer-art" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 320" fill="none" preserveAspectRatio="xMidYMid meet">
        <HeroDefs />
        <defs>
          <radialGradient id="offer-glow" cx="0.5" cy="0.5" r="0.5"><stop stopColor="#FFE9A8" stopOpacity=".55" /><stop offset=".55" stopColor="#B78CFF" stopOpacity=".25" /><stop offset="1" stopColor="#B78CFF" stopOpacity="0" /></radialGradient>
          <linearGradient id="offer-screen" x1="0" y1="0" x2="0" y2="1"><stop stopColor="#7C4DFF" /><stop offset="1" stopColor="#3A1299" /></linearGradient>
        </defs>

        <circle cx="180" cy="160" r="160" fill="url(#offer-glow)" />
        <ellipse cx="180" cy="160" rx="150" ry="52" stroke="#fff" strokeOpacity=".22" strokeWidth="2" strokeDasharray="4 8" transform="rotate(-12 180 160)" />
        <ellipse cx="180" cy="300" rx="110" ry="10" fill="#1E0A66" opacity=".35" />

        {/* Phone */}
        <Piece depth={5} dur={4.8} lift={-5}>
          <g transform="rotate(-4 180 165)">
            <rect x="113" y="32" width="134" height="262" rx="26" fill="#1E0A66" />
            <rect x="120" y="39" width="120" height="248" rx="20" fill="url(#offer-screen)" />
            <rect x="160" y="46" width="40" height="7" rx="3.5" fill="#1E0A66" />
            <circle cx="180" cy="104" r="34" fill="#fff" opacity=".14" />
            <image href="/assets/quizpro.png" x="152" y="76" width="56" height="56" />
            <rect x="136" y="150" width="88" height="9" rx="4.5" fill="#fff" opacity=".9" />
            <rect x="148" y="166" width="64" height="7" rx="3.5" fill="#fff" opacity=".5" />
            <rect x="134" y="188" width="92" height="20" rx="10" fill="#fff" opacity=".22" />
            <rect x="134" y="214" width="92" height="20" rx="10" fill="url(#hero-gold)" />
            <path d="M206 224l4 4 7-8" stroke="#3A1299" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
            <rect x="134" y="240" width="92" height="20" rx="10" fill="#fff" opacity=".22" />
          </g>
        </Piece>

        <Piece depth={12} dur={4.2} delay={-1.2} lift={-8} tilt={-3}>
          <g transform={at(58, 104, 0.5, 181, 110)}><BackPaper /><QuestionPaper /></g>
        </Piece>
        <Piece depth={16} dur={3.4} delay={-0.6} lift={-7} tilt={4}>
          <g transform={at(304, 250, 0.82, 298, 150)}><Trophy /></g>
        </Piece>
        <Piece depth={14} dur={5} delay={-2.2} lift={-4}>
          <g transform={at(62, 262, 0.82, 60, 175)}><CoinStack /></g>
        </Piece>
        <Piece depth={20} dur={3.1} delay={-1.6} lift={-10} tilt={6}>
          <g transform="translate(306 112)">
            <circle r="27" fill="#fff" />
            <image href="/assets/quizpro.png" x="-20" y="-20" width="40" height="40" />
          </g>
        </Piece>
        <Piece depth={24} dur={2.8} delay={-0.4} lift={-11} tilt={-10}>
          <g transform={at(290, 40, 0.9, 52, 86)}><BigCoin /></g>
        </Piece>
        <Piece depth={26} dur={3.3} delay={-1.7} lift={-9} tilt={12}>
          <g transform={at(46, 188, 1, 318, 52)}><SmallCoin /></g>
        </Piece>
        <Piece depth={18} dur={2.4} delay={-1.1} lift={-8}>
          <g transform={at(92, 30, 1, 98, 40)}><TinyCoin /></g>
        </Piece>
        {SPARKLES.map(([x, y, s], i) => <Sparkle key={i} x={x} y={y} s={s} i={i} />)}
      </svg>
    </div>
  );
}
