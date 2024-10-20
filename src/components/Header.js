"use client";

import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import './header.css';

const Header = () => {
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
                { y: '0%', duration: 0.5, ease: 'power2.out' }
            );
        } else {
            gsap.to(menuRef.current, {
                y: '-100%',
                duration: 0.5,
                ease: 'power2.in',
                onComplete: () => {
                    menuRef.current.style.visibility = 'hidden';
                }
            });
        }
    };

    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    return (
        <>
            <header className="white" id="header">
                <div className="icon-area2">
                    <Link href="/">
                        KuROEu1
                        {/* <Image src="/images/icon.jpg" className="icon" fill></Image> */}
                    </Link>
                </div>
                <nav>
                    <ul className="navList">
                        <li><Link href="/works" onClick={closeMenu}>Works</Link></li>
                        <li><Link href="/about" onClick={closeMenu}>About</Link></li>
                        <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
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
                    <li><Link href="/works" onClick={closeMenu}>Works</Link></li>
                    <li><Link href="/about" onClick={closeMenu}>About</Link></li>
                    <li><Link href="/contact" onClick={closeMenu}>Contact</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Header;