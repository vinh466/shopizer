import { Spin } from 'antd';
import React from 'react';

export function ASpinLoadingPage() {
  return (
    <Spin
      spinning
      style={{
        position: 'fixed',
        top: '50%',
        left: '50%',
        transform: 'translateX(-50%)',
      }}
    />
  );
}
