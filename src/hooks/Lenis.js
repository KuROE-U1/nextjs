// src/hooks/Lenis.js
"use client"; // クライアントコンポーネントとしてマーク

import { useEffect } from 'react';
import Lenis from '@studio-freight/lenis'; // Lenisをインポート

const useLenis = () => {
    useEffect(() => {
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            smoothWheel: true,
            smoothTouch: false
        });

        const animate = (time) => {
            lenis.raf(time);
            requestAnimationFrame(animate);
        };

        requestAnimationFrame(animate);

        // クリーンアップ
        return () => {
            lenis.destroy();
        };
    }, []);
};

export default useLenis;
