"use client";

import Head from 'next/head';
import Header from './components/Header';

import './index.css'

export default function Home() {
    return (
        <>
        
        <Head>
            <title>index</title>
            <meta name="description" content="index" />
        </Head>
        <Header />
        <main style={{ height: '200vh'}}>
            <div style={{ height: '100vh', backgroundColor: '#ccc', display:'flex', alignItems:'center', justifyContent:'center', position:'relative', overflow:'hidden' }}>
            <div className="text-animation logo">
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
