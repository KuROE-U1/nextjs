"use client";

import Head from 'next/head';
import './contact.css';

export default function Contact() {
    return (
        <>
        <Head>
            <title>contact</title>
            <meta name="description" content="contact" />
        </Head>
        <main style={{ height: '200vh' }}>
            <div style={{ height: '100vh', backgroundColor: '#ccc' }}>
            <div className="text-animation">
                <span className="char">c</span>
                <span className="char">o</span>
                <span className="char">n</span>
                <span className="char">t</span>
                <span className="char">a</span>
            </div>
            </div>
        </main>
        </>
    );
}
