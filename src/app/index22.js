import Head from 'next/head';
import Header from '../components/Header';
import useLenis from '../hooks/useLenis'; // フックのインポート

export default function Home() {
  useLenis(); // フックを呼び出してLenisを設定

  return (
    <>
      <Head>
        <title>シンプルなヘッダー</title>
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      </Head>
      <Header />
      <main style={{ height: '200vh', paddingTop: '80px' }}>
        <div style={{ height: 'calc(100vh - 80px)', backgroundColor: '#ccc' }}>
          <div className="text-animation" style={{ position: 'absolute', left: '50px', bottom: '50px', fontWeight: 'bold', fontSize: '60px' }}>
            <span className="char">K</span>
            <span className="char">u</span>
            <span className="char">R</span>
            <span className="char">O</span>
            <span className="char">E</span>
            <span className="char white"><div className=''>u</div></span>
            <span className="char white">1</span>
          </div>
        </div>
      </main>
      <footer style={{ padding: '30px' }}>
        <div>© 2024 KuROEu1</div>
      </footer>
      <script src="https://cdn.jsdelivr.net/npm/@studio-freight/lenis@1.0.5/bundled/lenis.js"></script>

      <style jsx>{`
        .text-animation {
          display: flex;
          gap: 0px;
          align-items: flex-end;
        }

        .char {
          display: inline-block;
          opacity: 0;
          transform: translateY(50px);
          animation: title-animation 0.8s cubic-bezier(0, 0.7, 0.3, 1) both;
        }

        .rotated-u {
          transform: rotate(30deg);
          transformorigin: 100% 100%;
        }

        .white {
          color: white;
        }

        .char:nth-child(1) { animation-delay: 0.25s; }
        .char:nth-child(2) { animation-delay: 0.3s; }
        .char:nth-child(3) { animation-delay: 0.34s; }
        .char:nth-child(4) { animation-delay: 0.37s; }
        .char:nth-child(5) { animation-delay: 0.39s; }
        .char:nth-child(6) { animation-delay: 0.9s; }
        .char:nth-child(7) { animation-delay: 0.9s; }

        @keyframes title-animation {
          0% {
            opacity: 0;
            transform: translateY(50px);
          }
          100% {
            opacity: 1;
            transform: translateY(0);
          }
        }
      `}</style>
    </>
  );
}
