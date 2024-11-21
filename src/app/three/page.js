"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelPage = () => {
  const mountRef = useRef(null);

  useEffect(() => {
    // シーン、カメラ、レンダラーの作成
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // 照明の追加
    const light = new THREE.AmbientLight(0xffffff, 0.8);
    scene.add(light);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 1);
    directionalLight.position.set(10, 10, 10);
    scene.add(directionalLight);

    // モデルの読み込み
    const loader = new GLTFLoader();
    let model; // モデルを外部で参照できるようにする

    // GLBファイルを取得
    fetch('/models/iphone.glb')
      .then(response => response.blob())
      .then(blob => {
        const url = URL.createObjectURL(blob);
        
        loader.load(
          url,
          (gltf) => {
            model = gltf.scene;
            scene.add(model);

            // モデルの位置やスケールの調整
            model.position.set(0, -1, 0);
            model.scale.set(1, 1, 1);

            // URLオブジェクトの解放
            URL.revokeObjectURL(url);
          },
          undefined,
          (error) => {
            console.error('モデルの読み込みに失敗しました', error);
          }
        );
      })
      .catch(error => {
        console.error('GLBファイルの取得に失敗しました', error);
      });

    // カメラの位置を調整
    camera.position.z = 2;

    // アニメーションループ
    const animate = () => {
      requestAnimationFrame(animate);

      // モデルの回転
      if (model) {
        model.rotation.y += 0.005; // Y軸回転
        // model.rotation.x += 0.005; // X軸回転
      }

      renderer.render(scene, camera);
    };

    animate();

    // クリーンアップ
    return () => {
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  // JSXを正しく返す
  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ModelPage;