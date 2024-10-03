"use client";

import Head from 'next/head';
import Header from '../../components/Header';

import './about.css';

export default function Home() {
  return (
    <>
      <Head>
        <title>シンプルなヘッダー</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main style={{ height: '200vh'}}>
        <div style={{ height:'100vh',backgroundColor:'#ccc' }}>
        {/* <Image src="/rin.png" alt="Sample Image" width={500} height={500} objectFit="contain" /> */}
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
