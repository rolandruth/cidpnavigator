interface Window {
  gtag: (
    command: 'config' | 'event' | 'consent' | 'js' | 'set',
    targetId: string | Date,
    params?: Record<string, unknown>
  ) => void;
  dataLayer: unknown[];
}
