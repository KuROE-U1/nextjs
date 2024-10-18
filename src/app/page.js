"use client";

import { useState, useEffect, useRef } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import './index.css';
import Loading from '../components/Loading';

export default function Home() {
    const [isLoading, setIsLoading] = useState(true);
    const videoRef = useRef(null);
    const circles = Array.from({ length: 9 });

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

    if (isLoading) {
        return <Loading />;
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
                    <div className='style1'><h2>Works</h2></div>
                </section>
                <section id="about">
                    <div className='style1'><h2>About</h2></div>
                </section>
                <section id="contact">
                    <div className='style1'><h2>Contact</h2></div>
                    
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