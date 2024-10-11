"use client";

import { useState, useEffect } from 'react';

export default function Home() {
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        setLoading(false);
    }, []);

    if (loading) {
        return (
            <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                Loading...
            </div>
        );
    }

    return (
        <article>
            <section id="top">
                <div style={{ height: '100vh', backgroundColor: '#ccc', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', overflow: 'hidden' }}>
                    <video src="./videos/1.mp4" controls autoPlay muted playsInline />
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

            {/* 他のセクション... */}
        </article>
    );
}