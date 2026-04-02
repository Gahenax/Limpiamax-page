'use client';

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { loadConnectAndInitialize, StripeConnectInstance } from '@stripe/connect-js';

interface StripeConnectContextType {
  stripeConnectInstance: StripeConnectInstance | null;
  isLoading: boolean;
  error: string | null;
}

const StripeConnectContext = createContext<StripeConnectContextType | undefined>(undefined);

export const useStripeConnect = () => {
  const context = useContext(StripeConnectContext);
  if (!context) {
    throw new Error('useStripeConnect must be used within a StripeConnectProvider');
  }
  return context;
};

interface StripeConnectProviderProps {
  children: ReactNode;
  accountId: string;
}

export const StripeConnectProvider: React.FC<StripeConnectProviderProps> = ({ children, accountId }) => {
  const [instance, setInstance] = useState<StripeConnectInstance | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const initStripe = async () => {
      try {
        const fetchClientSecret = async () => {
          const response = await fetch('/api/stripe/account-session', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ accountId }),
          });
          const { client_secret, error } = await response.json();
          if (error) throw new Error(error);
          return client_secret;
        };

        const stripeConnectInstance = loadConnectAndInitialize({
          publishableKey: process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY!,
          fetchClientSecret: fetchClientSecret,
          appearance: {
            variables: {
              colorPrimary: '#0F172A', // text-primary (slate-900)
            },
          },
        });

        setInstance(stripeConnectInstance);
        setIsLoading(false);
      } catch (err: unknown) {
        setError(err instanceof Error ? err.message : String(err));
        setIsLoading(false);
      }
    };

    if (accountId) {
      initStripe();
    }
  }, [accountId]);

  return (
    <StripeConnectContext.Provider value={{ stripeConnectInstance: instance, isLoading, error }}>
      {children}
    </StripeConnectContext.Provider>
  );
};
