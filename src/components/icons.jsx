const Svg = ({ sw = 2.4, children }) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={sw} strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{children}</svg>
);

export const CheckIcon = () => <Svg sw={3.4}><path d="M5 12.5l4.5 4.5L19 7.5" /></Svg>;
export const WifiOffIcon = () => (
  <Svg>
    <path d="M3 3l18 18" /><path d="M8.5 16.4a5 5 0 0 1 7 0" /><path d="M5 12.9a10 10 0 0 1 5.2-2.7" />
    <path d="M14.7 10.4A10 10 0 0 1 19 12.9" /><path d="M2 9.2a15 15 0 0 1 4.3-2.6" /><path d="M10.7 5.1A15 15 0 0 1 22 9.2" />
    <circle cx="12" cy="20" r="1.1" fill="currentColor" />
  </Svg>
);
export const AlertIcon = () => <Svg><circle cx="12" cy="12" r="9.5" /><path d="M12 7v6" /><circle cx="12" cy="16.6" r="1.1" fill="currentColor" /></Svg>;
export const InfoIcon = () => <Svg sw={2}><circle cx="12" cy="12" r="9.5" /><path d="M12 11v5.5" /><circle cx="12" cy="7.8" r="1" fill="currentColor" /></Svg>;
export const QuizIcon = () => <Svg><path d="M9 18h6" /><path d="M10 21h4" /><path d="M12 3a6 6 0 0 0-3.6 10.8c.7.6 1.1 1.3 1.1 2.2h5c0-.9.4-1.6 1.1-2.2A6 6 0 0 0 12 3z" /></Svg>;
export const BattleIcon = () => <Svg><path d="M13 2L4.5 13.5H11L10 22l8.5-11.500H12z" /></Svg>;
export const RewardsIcon = () => (
  <Svg>
    <rect x="3.5" y="8" width="17" height="4.5" rx="1.2" /><path d="M5 12.5V20h14v-7.500" /><path d="M12 8v12" />
    <path d="M12 8c-1.5-4-6-4-6-1.500C6 8 9 8 12 8zM12 8c1.500-4 6-4 6-1.500C18 8 15 8 12 8z" />
  </Svg>
);

export const Spinner = () => <span className="spinner" aria-hidden="true" />;
