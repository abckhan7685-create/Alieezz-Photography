'use client';

import { useFormStatus } from 'react-dom';
import { ReactNode } from 'react';

type SubmitButtonProps = {
  defaultText: ReactNode;
  loadingText: ReactNode;
  className: string;
  style?: React.CSSProperties;
};

export function SubmitButton({ defaultText, loadingText, className, style }: SubmitButtonProps) {
  const { pending } = useFormStatus();
  
  return (
    <button 
      type="submit" 
      className={className} 
      style={{
        ...style,
        opacity: pending ? 0.7 : 1,
        cursor: pending ? 'not-allowed' : 'pointer'
      }} 
      disabled={pending}
    >
      {pending ? (
        <span style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center' }}>
          <svg className="admin-spinner" viewBox="0 0 24 24" width="16" height="16" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" style={{ animation: 'spin 1s linear infinite' }}>
            <line x1="12" y1="2" x2="12" y2="6"></line>
            <line x1="12" y1="18" x2="12" y2="22"></line>
            <line x1="4.93" y1="4.93" x2="7.76" y2="7.76"></line>
            <line x1="16.24" y1="16.24" x2="19.07" y2="19.07"></line>
            <line x1="2" y1="12" x2="6" y2="12"></line>
            <line x1="18" y1="12" x2="22" y2="12"></line>
            <line x1="4.93" y1="19.07" x2="7.76" y2="16.24"></line>
            <line x1="16.24" y1="7.76" x2="19.07" y2="4.93"></line>
          </svg>
          {loadingText}
        </span>
      ) : defaultText}
    </button>
  );
}
