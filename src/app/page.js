"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';

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
            <article>
                <section id="top">
                    <div style={{ height: '100vh', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                        <div className="text-animation logo">
                            <span className="char">M</span>
                            <span className="char">.</span>
                            <span className="char">H</span>
                            <Image src="/images/1.png" alt="猫は最高に可愛い" width={100} height={100} />
                        </div>
                    </div>
                </section>
                <section id="works">

                </section>
            </article>
        </>
    );
}
