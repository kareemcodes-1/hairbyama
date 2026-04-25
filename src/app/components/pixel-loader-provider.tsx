'use client';
import PixelTransition from './pixel-loader';

import { Suspense } from 'react';

export default function PixelTransitionProvider() {
  return (
    <Suspense fallback={null}>
      <PixelTransition />
    </Suspense>
  );
}