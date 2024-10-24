"use client";

import Head from 'next/head';
import './works.css';

export default function Works() {
    return (
        <>
        <Head>
            <title>works</title>
            <meta name="description" content="works" />
        </Head>
        <main style={{ height: '200vh' }}>
            <div style={{ height: '100vh', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                <div className="text-animation logo">
                    <span className="char">W</span>
                    <span className="char">o</span>
                    <span className="char">r</span>
                    <span className="char">k</span>
                    <span className="char">s</span>
                </div>
            </div>
        </main>
        </>
    );
}