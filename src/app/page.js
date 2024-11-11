"use client";

import { useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import Head from 'next/head';
import Link from 'next/link';
import './index.css';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import Image from 'next/image';

import { CustomEase } from "gsap/CustomEase";  

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("custom", "0, 0.7, 0.3, 1");

export default function Home() {
    const videoRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const textRef = useRef(null);

    // 動画のURL
    const videoUrl = "https://github.com/KuROE-U1/nextjs/raw/d0923b36ef84c2adeb372be88f05cabd615c40c1/public/videos/ShortReel.mp4";

    // ビデオのプリロード
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

    // テキストと背景のアニメーション
    useEffect(() => {
        if (textRef.current) {
            // `.text-animation`のテキストカラー変更
            gsap.to(".text-animation", {
                color: "RGB(0, 0, 0)",
                scrollTrigger: {
                    trigger: textRef.current,
                    start: "center center",
                    end: "bottom center+50vh",
                    scrub: true,
                    // markers: true,
                },
                duration: 1,
            });
    
            // `.test`の背景不透明度変更
            gsap.to(".test", {
                opacity: "0.2",
                scrollTrigger: {
                    trigger: ".first-view",
                    start: "top top",
                    end: "bottom center",
                    scrub: true,
                    // markers: true,
                }
            });

            // `.about`のクリップパスアニメーション
            gsap.to("#about", {
                clipPath: "polygon(0% 0px, 100% 0vh, 100% 100%, 0px 100%)",
                scrollTrigger: {
                    trigger: ".first-view",  // トリガーを`.about`に設定
                    start: "top top", // ページ下部からスクロール開始
                    end: "bottom center",
                    scrub: true,
                    // markers: true,
                }
            });

        }
    }, []);

    // `.about-title`の文字アニメーション
    useEffect(() => {
        const tl = gsap.timeline({
            // delay: 0.6,                                 // 表示遅延
            scrollTrigger: {
                trigger: "#top",
                start: "top+=15% top",
                end: "center top",
                toggleActions: "none play none reset",
                markers: true,
            }
        });
    
        tl.to(".about-title span", {
            opacity: 1,
            y: 0,
            duration: 0.8,                              // 全文字表示が終わるまで 0.8s
            ease: "custom",                             // カスタムイージング 上部に記載
            stagger: 0.05,                              // 各文字に遅延 0.05s
        });
    }, []);

    // ページ遷移エフェクト
    const handleLinkClick = (e, href) => {
        e.preventDefault();

        if (pathname === href) return;

        const tl = gsap.timeline();
        tl.to('.transition-effect-1', {
            duration: 0.4,
            scaleY: 1,
            transformOrigin: 'bottom',
            ease: 'power3.out',
            markers: true,
        })
        .to('.transition-effect-2', {
            duration: 0.4,
            scaleY: 1,
            transformOrigin: 'bottom',
            ease: 'power3.out'
        }, '-=0.3')
        .add(() => router.push(href));
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
                        <video width="320" height="240" className='test' autoPlay loop muted playsInline style={{ objectFit: 'cover', width: '100%', height: '100%', position: 'absolute', filter: 'blur(5px) grayscale(50%)', clipPath: 'inset(3px)' }}>
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

                <section id="about">
                    <div className="about__wrapper">
                        <h2 className="about-title">
                            <span>A</span><span>b</span><span>o</span><span>u</span><span>t</span>
                        </h2>
                        <div>私について</div>
                        <div className='style1'>
                            <div className="style3">
                                <div className='style4'>
                                    <img src="/images/icon.jpg" className='icon'></img>
                                    <h4 style={{ marginTop: "10px", color: "#0AF" }}>KuROEu1</h4>
                                </div>
                                <div className='style5'>テキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキストテキスト</div>
                            </div>
                        </div>
                        <div style={{ textAlign: "center", margin: "20px 0" }}>
                            <Link href="/about" onClick={(e) => handleLinkClick(e, '/about')}>
                                <button className="btn1">VIEW MORE</button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="works">
                    <div className="works__wrapper">
                        <div className='style1'>
                            <h2 style={{ color: "#333" }}>Works</h2>
                            <div>PICK UP WORKS</div>
                        </div>
                        <div style={{ textAlign: "center", margin: "20px 0" }}>
                            <img src="/images/works/works_1.png" style={{width:"100%"}}></img>
                            <img src="/images/works/works_2.jpg" style={{width:"100%"}}></img>
                            <img src="/images/works/works_3.jpg" style={{width:"100%"}}></img>
                            <Link href="/works" onClick={(e) => handleLinkClick(e, '/works')}>
                                <button className="btn1">VIEW MORE</button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="contact">
                    <Link href="/contact" onClick={(e) => handleLinkClick(e, '/contact')}>
                    <div className='style1'>
                        <h2>Contact</h2>
                    </div>
                    </Link>
                </section>
            </article>

            <div className="transition-effect-1"></div>
            <div className="transition-effect-2"></div>
        </>
    );
}
