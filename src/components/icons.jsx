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

export const Spinner = () => <span className="spinner" aria-hidden="true" />;
