"use client";

import { useState, useEffect } from 'react';
import Head from 'next/head';

import './index.css';

export default function Home() {
    const [videoLoaded, setVideoLoaded] = useState(false);
    const [loading, setLoading] = useState(true);
    const circles = Array.from({ length: 9 });

    const videoUrl = "https://github.com/KuROE-U1/nextjs/raw/c0810de61bc80dc5de56afd5d701316780b35cc4/public/videos/1.mp4";

    useEffect(() => {
        // localStorageから動画のロード状態を確認
        const isVideoLoaded = localStorage.getItem('videoLoaded');
        if (isVideoLoaded) {
            setVideoLoaded(true);
            setLoading(false);
        } else {
            const video = document.createElement('video');
            video.src = videoUrl;
            video.preload = "auto";

            video.onloadeddata = () => {
                setVideoLoaded(true);
                localStorage.setItem('videoLoaded', 'true'); // 初回読み込み時にlocalStorageに保存
            };

            return () => {
                video.onloadeddata = null;
            };
        }
    }, []);

    useEffect(() => {
        if (videoLoaded) {
            setLoading(false);
        }
    }, [videoLoaded]);

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
                        <div className='container2'>
                            {circles.map((_, index) => (
                                <div key={index} className="circle"></div>
                            ))}
                        </div>
                        <video width="320" height="240" autoPlay loop muted playsInline style={{objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', filter: 'blur(5px) grayscale(50%)' }} >
                        <source src={videoUrl} type="video/mp4" />
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
                <section id="works" >
                    <div style={{ fontSize: '100px', display: 'flex', justifyContent: 'center' }}>Works</div>
                </section>
                <section id="about">
                    <div style={{ fontSize: '100px', display: 'flex', justifyContent: 'center' }} >About</div>
                </section>
                <section id="contact">
                    <div style={{ fontSize: '100px', display: 'flex', justifyContent: 'center' }}>Contact</div>
                    
                </section>
            </article>
        </>
    );
}
