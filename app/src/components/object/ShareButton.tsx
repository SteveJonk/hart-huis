'use client';

import { useState } from 'react';

type ShareButtonProps = {
  title: string;
  className?: string;
  children: React.ReactNode;
};

/** Native share sheet where available, copy-to-clipboard everywhere else. */
export function ShareButton({ title, className, children }: ShareButtonProps) {
  const [copied, setCopied] = useState(false);

  const share = async () => {
    const url = window.location.href;

    if (navigator.share) {
      try {
        await navigator.share({ title, url });
        return;
      } catch {
        // Cancelled or unavailable — fall through to the clipboard.
      }
    }

    await navigator.clipboard?.writeText(url);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <button type='button' onClick={share} className={className}>
      {copied ? 'Link gekopieerd' : children}
    </button>
  );
}
