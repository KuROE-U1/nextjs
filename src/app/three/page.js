"use client";

import { useEffect, useRef, useState } from 'react';
import ThreeCanvas from '../../components/ThreeCanvas';

const ThreePage = () => {
  const aboutRef = useRef(null);
  const modelContainerRef = useRef(null);
  const [isModelVisible, setIsModelVisible] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (!aboutRef.current || !modelContainerRef.current) return;

      const aboutTop = aboutRef.current.offsetTop;
      const aboutHeight = aboutRef.current.offsetHeight;
      const scrollY = window.scrollY;
      const windowHeight = window.innerHeight;
      const triggerPoint = aboutTop + (aboutHeight * 0.3);

      // モデルを表示する条件
      if (scrollY + windowHeight > triggerPoint && scrollY < aboutTop + aboutHeight) {
        setIsModelVisible(true);
        console.log(scrollY);
        if (scrollY + windowHeight < aboutTop + aboutHeight && scrollY > aboutTop) {
          // aboutセクション内でスクロール中
          modelContainerRef.current.style.position = 'fixed';
          modelContainerRef.current.style.top = '50%';
          modelContainerRef.current.style.transform = 'translateY(-50%)';
        } else if (scrollY + windowHeight >= aboutTop + aboutHeight) {
          // aboutセクションの終わりに達した
          modelContainerRef.current.style.position = 'absolute';
          modelContainerRef.current.style.top = 'auto';
          modelContainerRef.current.style.bottom = '0';
          modelContainerRef.current.style.transform = 'none';
        } else {
          // aboutセクションの始まりに達した
          modelContainerRef.current.style.position = 'absolute';
          modelContainerRef.current.style.top = '0';
          modelContainerRef.current.style.transform = 'none';
        }
      } else {
        setIsModelVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      <section style={{ height: '100vh', backgroundColor: '#f0f0f0' }}>
        <h1>Top Section</h1>
      </section>

      <section ref={aboutRef} style={{ height: '300vh', backgroundColor: '#e0e0e0', position: 'relative', overflow: 'hidden' }}>
        <div ref={modelContainerRef} style={{ 
          position: 'absolute', 
          width: '100%', 
          height: '100vh',
          top: '0',
        //   visibility: isModelVisible ? 'visible' : 'hidden'
        }}>
          <ThreeCanvas modelPath="models/iPhone2.glb" />
        </div>
        <h1 style={{ position: 'absolute', top: '10px', left: '10px' }}>About Section</h1>
      </section>

      <section style={{ height: '100vh', backgroundColor: '#d0d0d0' }}>
        <h1>Works Section</h1>
      </section>
    </div>
  );
};

export default ThreePage;