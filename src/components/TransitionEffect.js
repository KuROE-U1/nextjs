// components/TransitionEffect.js
"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TransitionEffect = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline();
      
      tl.to('.transition-effect', {
        duration: 0.5,
        scaleY: 1,
        transformOrigin: 'top',
        ease: 'power3.inOut'
      })
      .to('.transition-effect', {
        duration: 0.5,
        scaleY: 0,
        transformOrigin: 'bottom',
        ease: 'power3.inOut'
      });
    }
  }, [pathname]);

  return <div className="transition-effect"></div>;
};

export default TransitionEffect;