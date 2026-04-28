'use client';

import { Spinner } from '@/components/ui/spinner';


export default function Loading() {
  return (
    <div className="fixed inset-0 z-[9999] bg-pink-400 flex items-center justify-center">
      <Spinner className="w-10 h-10 text-white animate-spin" strokeWidth={2} />
    </div>
  );
}