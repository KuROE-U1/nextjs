"use client";

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Link from 'next/link';
// import Image from 'next/image';
import './index.css';
// import Loading from '../components/Loading';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef(null);

    const videoUrl = "https://github.com/KuROE-U1/nextjs/raw/c0810de61bc80dc5de56afd5d701316780b35cc4/public/videos/1.mp4";

    useEffect(() => {
        const loadVideo = async () => {
            const isVideoLoaded = localStorage.getItem('videoLoaded');
            if (isVideoLoaded) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                setIsLoading(false);
                return;
            }

            const video = document.createElement('video');
            video.src = videoUrl;
            video.preload = "auto";

            const videoLoadPromise = new Promise((resolve) => {
                video.onloadeddata = () => {
                    localStorage.setItem('videoLoaded', 'true');
                    resolve();
                };
            });

            const minLoadTime = new Promise(resolve => setTimeout(resolve, 1000));

            await Promise.all([videoLoadPromise, minLoadTime]);

            setIsLoading(false);
        };

        loadVideo();
    }, []);

    useEffect(() => {
        if (!isLoading && videoRef.current) {
            videoRef.current.play();
        }
    }, [isLoading]);

    // if (isLoading) {
    //     return <Loading />;
    // }

    return (
        <>
            <Head>
                <title>index</title>
                <meta name="description" content="index" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <article>
                <section id="top">
                    <div style={{ height: '100vh', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    {/* <video width="320" height="240" autoPlay loop muted  playsInline style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', filter: 'blur(5px) grayscale(50%)', clipPath: 'inset(3px)'}} >
                        <source src={videoUrl} type="video/mp4" />Your browser does not support the video tag.</video> */}
                        <div className="text-animation logo">
                            <span className="char">M</span>
                            <span className="char">.</span>
                            <span className="char">H</span>
                        </div>
                    </div>
                </section>
                <section id="works">
                    <div className='style1'><h2>Works</h2><div>主に自主制作</div></div>
                    <div style={{ textAlign:"center" }}>
                        <Link href="/works" style={{}}>More</Link>
                    </div>
                </section>
                
                <section id="about">
                    <div className='style1'><h2>About</h2><div>自分について</div></div>
                </section>
                <section id="contact">
                    <div className='style1'><h2>Contact</h2><div>お問い合わせ</div></div>
                    
                    <div className="style3">
                        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                            <div className="style2">
                                <img src="/images/logo-X.png" className='logo-x' />
                            </div>
                        </a>
                    </div>
                </section>
            </article>
        </>
    );
}