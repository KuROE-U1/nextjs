// src/utils/handleLinkClick.js
import { useRouter } from 'next/router';

const handleLinkClick = (e, href, pathname) => {
    e.preventDefault(); // デフォルトのリンク動作をキャンセル

    if (pathname === href) {
        return; // 現在のパスと同じ場合は何もしない
    }

    const router = useRouter(); // useRouterをここで呼び出す

    // GSAPが利用できる場合にアニメーションを適用
    if (typeof window !== 'undefined' && window.gsap) {
        const tl = window.gsap.timeline();

        // 1つ目のワイプ
        tl.to('.transition-effect-1', {
            duration: 0.5,
            scaleY: 1,
            transformOrigin: 'bottom', // 下から上へ
            ease: 'power3.out'
        });

        // 2つ目のワイプ
        tl.to('.transition-effect-2', {
            duration: 0.5,
            scaleY: 1,
            transformOrigin: 'bottom', // 下から上へ
            ease: 'power3.out'
        }, '-=0.4');

        // ページ遷移
        tl.add(() => {
            router.push(href);
        });
    } else {
        router.push(href); // GSAPが利用できない場合は直接ルーティング
    }
};

export default handleLinkClick;
