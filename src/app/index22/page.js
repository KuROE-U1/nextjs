"use client"; // Client Componentであることを宣言

import { useEffect } from 'react';
import Head from 'next/head';
import Header from '../../components/Header';

import './index22.css'

export default function Home() {
  // Lenisのスムーススクロール設定を直書き
  useEffect(() => {
    // CDNからLenisを読み込むために、スクリプトを作成
    const script = document.createElement('script');
    script.src = 'https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.5/bundled/lenis.js';
    script.async = true;
    script.onload = () => {
      // Lenisが読み込まれたら実行
      const lenis = new window.Lenis({
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
    };

    document.body.appendChild(script);

    // クリーンアップ: コンポーネントがアンマウントされた際にスクリプトを削除
    return () => {
      document.body.removeChild(script);
    };
  }, []); // 空の依存配列で初回マウント時にのみ実行

  return (
    <>
      <Head>
        <title>シンプルなヘッダー</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main style={{ height: '200vh', paddingTop: '80px' }}>
        <div style={{ height: 'calc(100vh - 80px)', backgroundColor: '#ccc' }}>
          <div className="text-animation" style={{ position: 'absolute', left: '50px', bottom: '50px', fontWeight: 'bold', fontSize: '60px' }}>
            <span className="char">K</span>
            <span className="char">u</span>
            <span className="char">R</span>
            <span className="char">O</span>
            <span className="char">E</span>
            <span className="char white"><div className=''>u</div></span>
            <span className="char white">1</span>
          </div>
        </div>
      </main>
      <footer style={{ padding: '30px' }}>
        <div>© 2024 KuROEu1</div>
      </footer>

      
    </>
  );
}
