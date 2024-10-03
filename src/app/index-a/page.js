"use client";

import Head from 'next/head';
import Header from '../../components/Header';

import './index-a.css'

export default function Home() {
    return (
        <>
        
        <Head>
            <title>シンプルなヘッダー</title>
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        </Head>
        <Header />
        <main style={{ height: '200vh'}}>
            <div style={{ height: '100vh', backgroundColor: '#ccc' }}>
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
