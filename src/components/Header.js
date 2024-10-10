"use client";

import Link from 'next/link';
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
        const script = document.createElement('script');
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.11.5/gsap.min.js";
        script.async = true;

        script.onload = () => {
            const gsap = window.gsap;

            if (isMenuOpen) {
                gsap.fromTo(menuRef.current, 
                    { y: '-100%', display: 'flex' }, 
                    { y: '0%', duration: 0.5, ease: 'power2.out' }
                );
            } else {
                gsap.to(menuRef.current, {
                    y: '-100%',
                    duration: 0.5,
                    ease: 'power2.in',
                    onComplete: () => {
                        menuRef.current.style.display = 'none';
                    }
                });
            }
        };

        document.body.appendChild(script);

        return () => {
            document.body.removeChild(script);
        };
    }, [isMenuOpen]);

    return (
        <>
            <header className="white">
                <div className="siteTitle">
                    <Link href="/">KuROEu1</Link>
                </div>
                <nav>
                    <ul className="navList">
                        <li><Link href="works">Works</Link></li>
                        <li><Link href="about">About</Link></li>
                        <li><Link href="contact">Contact</Link></li>
                    </ul>
                </nav>
                <div className={`hamburger hamburger--collapse ${isMenuOpen ? 'is-active' : ''}`}>
                    <div className="hamburger-box">
                        <div className="hamburger-inner"></div>
                    </div>
                </div>
            </header>
            <div ref={menuRef} className="fullscreenMenu" style={{ display: 'none' }}>
                <ul>
                    <li><Link href="works">Works</Link></li>
                    <li><Link href="about">About</Link></li>
                    <li><Link href="contact">Contact</Link></li>
                </ul>
            </div>
        </>
    );
};

export default Header;