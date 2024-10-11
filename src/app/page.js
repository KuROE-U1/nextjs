"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';

import './index.css';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
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
                    <video width="320" height="240" controls preload="none">
      <source src="https://github.com/KuROE-U1/nextjs/raw/c0810de61bc80dc5de56afd5d701316780b35cc4/public/videos/1.mp4" type="video/mp4" />
      Your browser does not support the video tag.
    </video>
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
                </section>

                <section id="works">
                    <div style={{display:'flex', justifyContent:'center'}}><h2>Works</h2></div>
                </section>

                <section id="about">
                    <h2>About</h2>
                </section>
                
                <section id="contact">
                    <h2>Contact</h2>
                </section>
            </article>
        </>
    );
}