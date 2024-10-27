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
            <div className='first-view'>
                <div className="text-animation logo">
                    <span className="char">C</span>
                    <span className="char">o</span>
                    <span className="char">n</span>
                    <span className="char">t</span>
                    <span className="char">a</span>
                    <span className="char">c</span>
                    <span className="char">t</span>
                </div>
            </div>
        </main>
        </>
    );
}
