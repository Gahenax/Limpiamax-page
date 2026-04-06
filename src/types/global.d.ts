export {};

declare global {
  interface Window {
    gtag: (command: string, ...args: any[]) => void;
    dataLayer: any[];
    // Consent Manager properties
    __cmp?: any;
  }
}
