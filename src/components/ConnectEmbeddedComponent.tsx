'use client';

import React, { useEffect, useRef } from 'react';
import { useStripeConnect } from './StripeConnectProvider';

interface ConnectEmbeddedComponentProps {
  componentName: 'onboarding' | 'payments' | 'payouts';
  _options?: Record<string, unknown>;
}

export const ConnectEmbeddedComponent: React.FC<ConnectEmbeddedComponentProps> = ({ componentName, _options = {} }) => {
  const { stripeConnectInstance } = useStripeConnect();
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (stripeConnectInstance && containerRef.current) {
      let component: any;

      switch (componentName) {
        case 'onboarding':
          component = stripeConnectInstance.create('account-onboarding');
          break;
        case 'payments':
          component = stripeConnectInstance.create('payments');
          break;
        case 'payouts':
          component = stripeConnectInstance.create('payouts');
          break;
      }

      if (component) {
        component.mount(containerRef.current);
      }

      return () => {
        if (component) {
          component.unmount();
        }
      };
    }
  }, [stripeConnectInstance, componentName]);

  return <div ref={containerRef} className="w-full min-h-[600px] bg-white rounded-3xl border border-border overflow-hidden" />;
};
