"use client";

import Link from 'next/link';
import { useState, useEffect, useRef } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import './header.css';

const Header = () => {
    const router = useRouter();
    const pathname = usePathname();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [scrollPosition, setScrollPosition] = useState(0);
    const menuRef = useRef(null);

    useEffect(() => {
        const hamburger = document.querySelector(".hamburger");

        const toggleMenu = () => {
            setIsMenuOpen((prev) => !prev);
        };

        hamburger.addEventListener("click", toggleMenu);

        return () => {
            hamburger.removeEventListener("click", toggleMenu);
        };
    }, []);

    useEffect(() => {
        const body = document.body;
        const preventDefault = (e) => e.preventDefault();

        if (isMenuOpen) {
            setScrollPosition(window.pageYOffset);
            body.style.overflow = 'hidden';
            document.addEventListener('touchmove', preventDefault, { passive: false });
        } else {
            body.style.overflow = 'auto';
            window.scrollTo(0, scrollPosition);
            document.removeEventListener('touchmove', preventDefault);
        }

        return () => {
            document.removeEventListener('touchmove', preventDefault);
        };
    }, [isMenuOpen, scrollPosition]);

    useEffect(() => {
        if (!window.gsap) {
            const script = document.createElement('script');
            script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js";
            script.async = true;

            script.onload = () => {
                toggleMenuAnimation();
            };

            document.body.appendChild(script);

            return () => {
                document.body.removeChild(script);
            };
        } else {
            toggleMenuAnimation();
        }
    }, [isMenuOpen]);

    const toggleMenuAnimation = () => {
        const gsap = window.gsap;

        if (isMenuOpen) {
            gsap.fromTo(menuRef.current, 
                { y: '-100%', visibility: 'visible' }, 
                { y: '0%', duration: 0.4, ease: 'power3.out' }
            );
        } else {
            gsap.to(menuRef.current, {
                y: '-100%',
                duration: 0.4,
                ease: 'power2.in',
                onComplete: () => {
                    menuRef.current.style.visibility = 'hidden';
                }
            });
        }
    };

    const handleLinkClick = (e, href) => {
        e.preventDefault(); // デフォルトのリンク動作をキャンセル
        setIsMenuOpen(false); // メニューを閉じる

        if (pathname === href) {
            console.log("何もしない")
            return; // 現在のパスと同じ場合は何もしない
        }

        if (typeof window !== 'undefined' && window.gsap) {
            const tl = window.gsap.timeline();
            
            // 1つ目のワイプ
            tl.to('.transition-effect-1', {
                duration: 0.4,
                scaleY: 1,
                transformOrigin: 'bottom', // 下から上へ
                ease: 'power3.out'
            });

            // 2つ目のワイプ
            tl.to('.transition-effect-2', {
                duration: 0.4,
                scaleY: 1,
                transformOrigin: 'bottom', // 下から上へ
                ease: 'power3.out'
            }, '-=0.3');
    
            // ページ遷移
            tl.add(() => {
                router.push(href);
            });
        } else {
            router.push(href); // GSAPが利用できない場合は直接ルーティング
        }
    };

    return (
        <>
            <header className="white" id="header">
                <div className="icon-area2">
                    <Link href="/" onClick={(e) => handleLinkClick(e, '/')}>
                        {/* M.H */}
                        KuROEu1
                    </Link>
                </div>
                <nav>
                    <ul className="navList">
                        <li><Link href="/works" onClick={(e) => handleLinkClick(e, '/works')}>Works</Link></li>
                        <li><Link href="/about" onClick={(e) => handleLinkClick(e, '/about')}>About</Link></li>
                        <li><Link href="/contact" onClick={(e) => handleLinkClick(e, '/contact')}>Contact</Link></li>
                    </ul>
                </nav>
                <div className={`hamburger hamburger--collapse ${isMenuOpen ? 'is-active' : ''}`}>
                    <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                    </div>
                </div>
            </header>
            <div ref={menuRef} className="fullscreenMenu">
                <ul>
                    <li><Link href="/works" onClick={(e) => handleLinkClick(e, '/works')}>Works</Link></li>
                    <li><Link href="/about" onClick={(e) => handleLinkClick(e, '/about')}>About</Link></li>
                    <li><Link href="/contact" onClick={(e) => handleLinkClick(e, '/contact')}>Contact</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Header;
