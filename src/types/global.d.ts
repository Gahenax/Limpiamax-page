export {};

declare global {
  interface Window {
    gtag: (command: string, ...args: unknown[]) => void;
    dataLayer: unknown[];
    // Consent Manager properties
    __cmp?: unknown;
  }
}
