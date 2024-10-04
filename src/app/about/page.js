"use client";

import Head from 'next/head';
import Header from './../components/Header';
import './about.css';

export default function About() {
    return (
        <>
        <Head>
            <title>About</title>
            <meta name="description" content="About" />
        </Head>
        <Header />
        <main style={{ height: '200vh' }}>
            <div style={{ height: '100vh', backgroundColor: '#ccc' }}>
            <div className="text-animation">
                <span className="char">a</span>
                <span className="char">b</span>
                <span className="char">o</span>
                <span className="char">u</span>
                <span className="char">t</span>
            </div>
            </div>
        </main>
        <footer style={{ padding: '30px' }}>
            <div>© 2024 KuROE_U1</div>
        </footer>
        </>
    );
}
