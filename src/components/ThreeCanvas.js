"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

// ScrollTriggerを登録
gsap.registerPlugin(ScrollTrigger);

const ThreeCanvas = ({ modelPath }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // シーンの作成
    const scene = new THREE.Scene();

    // カメラの作成
    const camera = new THREE.PerspectiveCamera(
      45,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
// カメラの位置を調整
camera.position.set(0, 0, 2);  // 必要に応じて調整
camera.lookAt(new THREE.Vector3(0, 0, 0));  // モデルの中心を見つめる


    // 環境光
    const ambientLight = new THREE.AmbientLight(0xFFFFFF, 2);
    scene.add(ambientLight);

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);

    // マウントされたDOM要素にレンダラーを追加
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // グループを作成して、モデルを中心に配置
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // GLTFファイルの読み込み
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // モデルのバウンディングボックスを計算
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());

        // モデルをシーンの中心に配置
        model.position.set(-center.x, -center.y, -center.z);

        // グループ全体の位置を右半分の中央に調整
        modelGroup.position.set(0.5, 0, 0); // x=0.5で右に移動（必要に応じて調整）

        // モデルのスケールを調整
        const desiredSize = 1; // モデルの目標サイズ（任意の値に調整可能）
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = desiredSize / maxDimension;

        model.scale.set(scale, scale, scale); // X, Y, Z軸全てにスケールを適用

        // グループにモデルを追加
        modelGroup.add(model);

        gsap.fromTo(modelGroup.position,
            { x: -2.5 }, // Start
            {
                x: -1, // End
                scrollTrigger: {
                    trigger: mountRef.current,
                    start: "top+=50% center", // アニメーション開始位置
                    end: "bottom+=50% center", // アニメーション終了位置
                    scrub: true,
                    // markers: true,
                },
                duration: 1,
                ease: "power2.out", // イージング（滑らかな減速）
            }
        );
        gsap.fromTo(modelGroup.scale,
            { x: 1, y: 1, z: 1 }, // Start
            {
                x: 1, y: 1, z: 1, // End
                scrollTrigger: {
                    trigger: mountRef.current,
                    start: "top+=50% center", // アニメーション開始位置
                    end: "bottom+=50% center", // アニメーション終了位置
                    scrub: true,
                    // markers: true,
                },
                duration: 1, // アニメーションの持続時間（秒）
                ease: "power2.out", // イージング（滑らかな減速）
            }
        );
        gsap.fromTo(modelGroup.rotation,
            { 
                // x: Math.PI / 1,
                // y: Math.PI / 2,
                // z: Math.PI / 2
            },
            {
                x: 0, y: 0, z: 0,
                scrollTrigger: {
                    trigger: mountRef.current,
                    start: "top+=50% center", // アニメーション開始位置
                    end: "bottom+=50% center", // アニメーション終了位置
                    scrub: true,
                    // markers: true,
                },
                duration: 1, // アニメーションの持続時間（秒）
                ease: "power2.out", // イージング（滑らかな減速）
            }
        );

        // モデルの回転をスクロールに合わせてアニメーションさせる
        gsap.to(model.rotation, {
        scrollTrigger: {
            trigger: mountRef.current,
            start: "bottom+=50% center", // 3Dモデルが表示される開始位置（Aboutセクションが表示される位置）
            end: "bottom+=150% top", // 終了位置（Aboutセクションがスクロールされていなくなる位置）
            scrub: true, // スクロールに合わせてアニメーションを同期
            markers: true, // マーカーを表示してデバッグ
        },
          x: Math.PI * -0.1, // X軸の回転
          y: Math.PI * -0.1, // y軸の回転
          z: Math.PI * -0.1, // z軸の回転
        });
    },
    undefined,
    (error) => {
        console.error("モデルの読み込みに失敗しました", error);
    }
    );

    // アニメーションループ
    function tick() {
      requestAnimationFrame(tick);
      renderer.render(scene, camera);
    }
    tick();

    // ウィンドウのリサイズ対応
    const handleResize = () => {
      const width = window.innerWidth;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelPath]);

  return <div ref={mountRef} style={{ position: "absolute", width: "100%", height: "100%" }} />;
};

export default ThreeCanvas;