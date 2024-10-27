"use client";

import Head from 'next/head';
import './about.css';

export default function About() {
    return (
        <>
        <Head>
            <title>About</title>
            <meta name="description" content="About" />
        </Head>
        <main style={{ height: '200vh' }}>
            <div className='first-view'>
                <div className="text-animation logo">
                    <span className="char">a</span>
                    <span className="char">b</span>
                    <span className="char">o</span>
                    <span className="char">u</span>
                    <span className="char">t</span>
                </div>
            </div>
        </main>
        </>
    );
}
