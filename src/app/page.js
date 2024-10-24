"use client";

import Head from 'next/head';
import './index.css';

export default function Works() {
    return (
        <>
        <Head>
            <title>test</title>
            <meta name="description" content="works" />
        </Head>
        <main style={{ height: '200vh' }}>
            <div style={{ height: '100vh', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div className="text-animation logo">
                    <span className="char">T</span>
                    <span className="char">e</span>
                    <span className="char">s</span>
                    <span className="char">t</span>
                </div>
            </div>
        </main>
        </>
    );
}
