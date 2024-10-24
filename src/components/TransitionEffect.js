"use client";

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

const TransitionEffect = () => {
  const pathname = usePathname();

  useEffect(() => {
    if (typeof window !== 'undefined' && window.gsap) {
      const tl = window.gsap.timeline();
      
      tl.to('.transition-effect-1', {
        duration: 0,
        scaleY: 1,
        transformOrigin: 'bottom',
        ease: 'power3.out'
      })
      .to('.transition-effect-1', {
        duration: 0.5,
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'power3.out'
      }) 
      .to('.transition-effect-2', {
        duration: 0,
        scaleY: 1,
        transformOrigin: 'bottom',
        ease: 'power3.out'
      })
      .to('.transition-effect-2', {
        duration: 0.5,
        scaleY: 0,
        transformOrigin: 'top',
        ease: 'power3.out'
      });
    }
  }, [pathname]);

  return (
    <>
      <div className="transition-effect-1"></div>
      <div className="transition-effect-2"></div>
    </>
  );
};

export default TransitionEffect;
