"use client";

import Link from 'next/link';
import { useState, useEffect } from 'react';
import './header.css';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const hamburger = document.querySelector(".hamburger");

        const toggleMenu = () => {
            setIsMenuOpen(!isMenuOpen);
        };

        hamburger.addEventListener("click", toggleMenu);

        // クリーンアップ
        return () => {
            hamburger.removeEventListener("click", toggleMenu);
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
            {isMenuOpen && (
                <div className="fullscreenMenu">
                    <ul>
                        <li><Link href="works">Works</Link></li>
                        <li><Link href="about">About</Link></li>
                        <li><Link href="contact">Contact</Link></li>
                    </ul>
                </div>
            )}
        </>
    );
};

export default Header;