"use client";

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Home() {
    const videoRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const textRef = useRef(null);

    // 動画のURLはここで定義することができます
    const videoUrl = "https://github.com/KuROE-U1/nextjs/blob/9ea3a574be94a3fba86c94e6b8ff8beb43e469c7/public/videos/ShortReel.mp4";

    useEffect(() => {
        const loadVideo = async () => {
            const isVideoLoaded = localStorage.getItem('videoLoaded');
            if (isVideoLoaded) {
                await new Promise(resolve => setTimeout(resolve, 1000));
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
        };

        loadVideo();
    }, []);

    useEffect(() => {
        if (textRef.current) {
            // 既存のテキストアニメーション
            gsap.to(".text-animation", {
                scale: 2,
                color: "RGB(0, 0, 0)",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "center center",
                    end: "bottom center+50vh",
                    scrub: true,
                    markers: true
                },
                duration: 1
            });
    
            // 新しいアニメーション：first-viewを暗くする
            gsap.to(".test", {
                opacity:"0.2",
                scrollTrigger: {
                    trigger: ".first-view",
                    start: "top top",
                    end: "bottom center",
                    scrub: true
                }
            });
        }
    }, []);



    const handleLinkClick = (e, href) => {
        e.preventDefault();

        if (pathname === href) {
            return;
        }

        if (typeof window !== 'undefined' && window.gsap) {
            const tl = window.gsap.timeline();

            tl.to('.transition-effect-1', {
                duration: 0.4,
                scaleY: 1,
                transformOrigin: 'bottom',
                ease: 'power3.out'
            });

            tl.to('.transition-effect-2', {
                duration: 0.4,
                scaleY: 1,
                transformOrigin: 'bottom',
                ease: 'power3.out'
            }, '-=0.4');

            tl.add(() => {
                router.push(href);
            });
        } else {
            router.push(href);
        }
    };

    return (
        <>
            <Head>
                <title>index</title>
                <meta name="description" content="index" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </Head>
            <article>
                <section id="top">
                    <div className='first-view' ref={textRef}>
                        <video width="320" height="240" className='test' autoPlay loop muted playsInline style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', filter: 'blur(5px) grayscale(50%)', clipPath: 'inset(3px)' }} >
                            <source src={videoUrl} type="video/mp4" /> Your browser does not support the video tag.
                        </video>
                        <div className="text-animation logo">
                            <span className="char">M</span>
                            <span className="char">.</span>
                            <span className="char">H</span>
                        </div>
                    </div>
                </section>

                <section id="works" className=''>
                    <div className='style1'>
                        <h2>Works</h2>
                        <div>主に自主制作</div>
                    </div>
                    <div style={{ textAlign: "center" }}>
                        <Link href="/works" onClick={(e) => handleLinkClick(e, '/works')}>
                            <button>More</button>
                        </Link>
                    </div>
                </section>

                <section id="about">
                    <div className='style1'>
                        <h2>About</h2>
                        <div>自分について</div>
                    </div>
                </section>

                <section id="contact">
                    <div className='style1'>
                        <h2>Contact</h2>
                        <div>お問い合わせ</div>
                    </div>
                    <div className="style3">
                        <a href="https://www.example.com" target="_blank" rel="noopener noreferrer">
                            <div className="style2">
                                <img src="/images/logo-X.png" className='logo-x' />
                            </div>
                        </a>
                    </div>
                </section>
            </article>

            <div className="transition-effect-1"></div>
            <div className="transition-effect-2"></div>
        </>
    );
}
