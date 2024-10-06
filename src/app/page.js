"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';

import './index.css';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // コンポーネントがマウントされた後、すぐに loading ステータスを false に設定
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Loading...
            </div>
        );
    }

    return (
        <>
            <Head>
                <title>index</title>
                <meta name="description" content="index" />
            </Head>
            <main style={{ height: '200vh' }}>
                <div style={{ height: '100vh', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    {/* <div style={{ position: "absolute", top: "-5px", left: "-5px", right: "-5px", bottom: "-5px"}}>
                        <video src="./videos/1.mp4" autoPlay loop muted playsInline style={{ width: "calc(100% + 10px)", height: "calc(100% + 10px)", filter: 'blur(6px)', objectFit:'cover' }}></video>
                    </div> */}
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
        </>
    );
}
