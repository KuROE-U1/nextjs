"use client";

import { useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

import './index.css';

export default function Home() {
    useEffect(() => {
        // Lenisのインスタンスを作成
        const lenis = new Lenis({
            duration: 1.2,
            easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            direction: 'vertical',
            gestureDirection: 'vertical',
            smooth: true,
            mouseMultiplier: 1,
            smoothTouch: false,
            touchMultiplier: 2,
            infinite: false,
        });

        // スクロールアニメーションのRAF
        function raf(time) {
            lenis.raf(time);
            requestAnimationFrame(raf);
        }

        // アニメーションを開始
        requestAnimationFrame(raf);

        // コンポーネントのクリーンアップ時にLenisを破棄
        return () => {
            lenis.destroy();
        };
    }, []);

    return (
        <>
            <Head>
                <title>index</title>
                <meta name="description" content="index" />
            </Head>
            <main style={{ height: '200vh' }}>
                <div style={{ height: '100vh', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <div style={{ position: "absolute", top: "-5px", left: "-5px", right: "-5px", bottom: "-5px"}}>
                        {/* <Image src="/images/1.png" style={{ width: "calc(100% + 10px)", height: "calc(100% + 10px)", filter: 'blur(6px)', objectFit:'cover' }} /> */}
                    </div>
                    <div className="text-animation logo">
                        <span className="char">K</span>
                        <span className="char">u</span>
                        <span className="char">R</span>
                        <span className="char">O</span>
                        <span className="char">E</span>
                        <span className="char">u</span>
                        <span className="char">1</span>
                    </div>
                </div>
            </main>
            <script src="https://cdn.jsdelivr.net/gh/studio-freight/lenis@1.0.25/bundled/lenis.min.js"></script>
        </>
    );
}