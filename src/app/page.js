"use client";

import { useEffect, useRef } from "react";
import { useRouter, usePathname } from "next/navigation";
import Head from "next/head";
import Link from "next/link";
import "./index.css";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";
import ThreeCanvas from "./../components/ThreeCanvas";

import { CustomEase } from "gsap/CustomEase";  

gsap.registerPlugin(ScrollTrigger, CustomEase);
CustomEase.create("custom", "0, 0.7, 0.3, 1");

export default function Home() {
    const helloRef = useRef(null);
    const testRef = useRef(null);
    const videoRef = useRef(null);
    const router = useRouter();
    const pathname = usePathname();
    const textRef = useRef(null);

    // 動画のURL
    const videoUrl = "https://github.com/KuROE-U1/nextjs/raw/d0923b36ef84c2adeb372be88f05cabd615c40c1/public/videos/ShortReel.mp4";

    // ビデオのプリロード
    useEffect(() => {
        const loadVideo = async () => {
            const isVideoLoaded = localStorage.getItem("videoLoaded");
            if (isVideoLoaded) {
                await new Promise(resolve => setTimeout(resolve, 1000));
                return;
            }

            const video = document.createElement("video");
            video.src = videoUrl;
            video.preload = "auto";

            const videoLoadPromise = new Promise((resolve) => {
                video.onloadeddata = () => {
                    localStorage.setItem("videoLoaded", "true");
                    resolve();
                };
            });

            const minLoadTime = new Promise(resolve => setTimeout(resolve, 1000));
            await Promise.all([videoLoadPromise, minLoadTime]);
        };

        loadVideo();
    }, []);

    const aboutRef = useRef(null);
    const modelContainerRef = useRef(null);
    // const [isModelVisible, setIsModelVisible] = useState(false);
        // スクロールに応じた`hello`と`modelContainer`の制御
        useEffect(() => {
            const handleScroll = () => {
                if (!aboutRef.current || !modelContainerRef.current || !helloRef.current) return;
    
                const aboutTop = aboutRef.current.offsetTop;
                const aboutHeight = aboutRef.current.offsetHeight;
                const scrollY = window.scrollY;
                const windowHeight = window.innerHeight;
    
                // `hello`の位置を制御
                if (scrollY >= aboutTop) {
                    helloRef.current.style.position = "fixed";
                    helloRef.current.style.top = "50%";
                    helloRef.current.style.left = "50%";
                    helloRef.current.style.transform = "translate(-50%, -50%)";
                } else {
                    helloRef.current.style.position = "relative";
                    helloRef.current.style.left = "0";
                    helloRef.current.style.top = `50vh`;
                    helloRef.current.style.transform = "translateY(-50%)";
                }
    
                // `modelContainer`の位置を制御
                const triggerPoint = aboutTop + (aboutHeight * 0.3);
                if (scrollY + windowHeight < aboutTop + aboutHeight && scrollY > aboutTop) {
                    modelContainerRef.current.style.position = "fixed";
                    modelContainerRef.current.style.top = "50%";
                    modelContainerRef.current.style.transform = "translateY(-50%)";
                } else if (scrollY + windowHeight >= aboutTop + aboutHeight) {
                    modelContainerRef.current.style.position = "absolute";
                    modelContainerRef.current.style.top = "auto";
                    modelContainerRef.current.style.bottom = "0";
                    modelContainerRef.current.style.transform = "none";
                } else {
                    modelContainerRef.current.style.position = "absolute";
                    modelContainerRef.current.style.top = "0";
                    modelContainerRef.current.style.transform = "none";
                }
            };
    
            window.addEventListener("scroll", handleScroll);
            return () => window.removeEventListener("scroll", handleScroll);
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
            // `.hello`の縮小アニメーション
            gsap.to(helloRef.current, {
                filter: "blur(10px)",
                opacity: 0,
                fontSize:"50px",
                scrollTrigger: {
                    trigger: "#about", // #aboutセクションをトリガーに設定
                    start: "top+=100px top", // #aboutのトップが画面のトップに来たとき
                    end: "top+=25% top", // #aboutの下端が画面のトップから100vh下になったとき
                    scrub: true, // スクロールに合わせてアニメーションを調整
                    // markers: true, // 開発時に確認用のマーカーを表示（必要に応じて削除）
                }
            });
        }
    }, []);

    // ページ遷移エフェクト
    const handleLinkClick = (e, href) => {
        e.preventDefault();

        if (pathname === href) return;

        const tl = gsap.timeline();
        tl.to(".transition-effect-1", {
            duration: 0.4,
            scaleY: 1,
            transformOrigin: "bottom",
            ease: "power3.out",
            markers: true,
        })
        .to(".transition-effect-2", {
            duration: 0.4,
            scaleY: 1,
            transformOrigin: "bottom",
            ease: "power3.out"
        }, "-=0.3")
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
                <div className="scroll">
                    <div className="scrollbar"></div>
                    <div className="scrolltext"><p>Scroll</p></div>
                </div>
                <section id="top">
                    <div className="first-view" ref={textRef}>

                        <video width="320" height="240" className="test" autoPlay loop muted playsInline style={{ objectFit: "cover", width: "100%", height: "100%", position: "absolute", filter: "blur(5px) grayscale(50%)", clipPath: "inset(3px)" }}>
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
                <section id="about" ref={aboutRef} style={{ height: "400vh", backgroundColor: "#e0e0e0", position: "relative", overflow: "hidden" }}>
  <div ref={modelContainerRef} style={{ position: "absolute", width: "50%", height: "100vh", top: "0", left: "0" }}>
    <ThreeCanvas modelPath="models/iPhone2.glb" />
  </div>
  <div ref={helloRef} className="hello" style={{ 
    position: "absolute",
    left: "25%",
    top: "50vh",
    transform: "translate(-50%, -50%)",
    zIndex: 10,
    textAlign: "center",
    filter: "blur(0px)",
    opacity: 1,
    fontSize:"100px",
  }}>
    Hello
  </div>
  <div className="about-content" ref={testRef} style={{
    position: "absolute",
    right: "0",
    top: "0",
    width: "50%",
    height: "100%",
    padding: "5%",
    boxSizing: "border-box",
    display: "flex",
    flexDirection: "column",
    backgroundColor: "white"
  }}>
    <h2 style={{ marginBottom: "20px", fontSize: "2.5em" }}>About Us</h2>
    <p style={{ marginBottom: "15px", fontSize: "1.1em", lineHeight: "1.6" }}>
      We are a creative team dedicated to bringing innovative ideas to life. Our passion for technology and design drives us to create unique digital experiences.
    </p>
    <p style={{ fontSize: "1.1em", lineHeight: "1.6" }}>
      With expertise in 3D modeling, web development, and user experience design, we strive to push the boundaries of what s possible in the digital realm.
    </p>
  </div>
</section>




                <section id="works">
                    <div className="works__wrapper">
                        <div className="works__title">
                            <h2 style={{ color: "#333" }}>Works</h2>
                            <div>PICK UP WORKS</div>
                        </div>
                        <div style={{ margin: "20px 0" }}>
                            <a href="#" className="works__item_column">
                                <div style={{ width:"52%" }} ><img src="/images/works/works_1.png" style={{width:"100%"}}></img></div>
                                <div style={{ display: "flex", width: "48%",alignItems: "center",justifyContent:"center" }} >
                                    <div style={{  }}>
                                        Private Work
                                        <h3>CH4NGE</h3>
                                    </div>
                                </div>
                            </a>
                            <a href="#" className="works__item_column-reverse">
                                <div style={{ display: "flex", width: "48%", alignItems: "center",justifyContent:"center" }} >
                                    <div style={{  }}>
                                        Private Work
                                        <h3>エンヴィーベイビー</h3>
                                    </div>
                                </div>
                                <div style={{ width:"52%" }} ><img src="/images/works/works_2.jpg" style={{width:"100%"}}></img></div>
                            </a>
                            <a href="#" className="works__item_column">
                                <div style={{ width:"52%" }} ><img src="/images/works/works_3.jpg" style={{width:"100%"}}></img></div>
                                <div style={{ display: "flex", width: "48%",alignItems: "center", justifyContent:"center" }} >
                                <div style={{  }}>
                                    Client Work
                                    <h3>RAD DOGS</h3>
                                    </div>
                                </div>
                            </a>
                            <Link href="/works" onClick={(e) => handleLinkClick(e, "/works")}>
                                <button className="btn1">VIEW MORE</button>
                            </Link>
                        </div>
                    </div>
                </section>

                <section id="contact">
                    <Link href="/contact" onClick={(e) => handleLinkClick(e, "/contact")}>
                    <div className="style1">
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