// hooks/useLenis.js
import { useEffect } from 'react';

export default function useLenis() {
  useEffect(() => {
    // Lenisのスムーススクロール設定
    const lenis = new Lenis({
      duration: 1.5, // スクロール速度を早くする
      smooth: true,  // スムーススクロールの有効化
      direction: 'vertical',  // 垂直スクロール
    });

    function raf(time) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // コンポーネントのアンマウント時にクリーンアップ
    return () => {
      lenis.destroy();
    };
  }, []);
}
