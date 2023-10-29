'use client';

import React from 'react';

interface TContainerProps {
  children: React.ReactNode;
}

export function TContainer({ children }: TContainerProps) {
  return (
    <div
      className="container"
      style={{
        width: 'var(--max-width)',
        padding: '0 15px',
        margin: '0 auto',
      }}
    >
      {children}
      <style jsx>{``}</style>
    </div>
  );
}
