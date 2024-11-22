"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";

const ThreeCanvas = ({ modelPath }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    // カメラの作成
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 0, 5); // 正面からモデルを見る位置

    // レンダラーの設定
    const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setClearColor(0x000000, 0); // 背景を透明に設定

    // レンダラーをマウント
    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    // 環境光
    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    // モデルグループ
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // モデルの読み込み
    const loader = new GLTFLoader();
    loader.load(
      modelPath,
      (gltf) => {
        const model = gltf.scene;

        // モデルの中心を原点に移動
        const box = new THREE.Box3().setFromObject(model);
        const center = box.getCenter(new THREE.Vector3());
        const size = box.getSize(new THREE.Vector3());
        model.position.sub(center);

        // モデルのスケールを調整
        const maxDimension = Math.max(size.x, size.y, size.z);
        const scale = 3 / maxDimension; // モデルの目標サイズを2に設定
        model.scale.set(scale, scale, scale);

        modelGroup.add(model);
      },
      undefined,
      (error) => console.error("モデルの読み込みに失敗しました", error)
    );

    // マウスによる回転
    const mouse = new THREE.Vector2();
    const rotationSpeed = 0.05;

    const onMouseMove = (event) => {
      // マウス位置を正規化
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    };
    window.addEventListener("mousemove", onMouseMove);

    // アニメーションループ
    const tick = () => {
      // マウス位置に基づいてモデルを回転
      const targetRotationX = THREE.MathUtils.degToRad(mouse.y * -20);
      const targetRotationY = THREE.MathUtils.degToRad(mouse.x * 40);

      modelGroup.rotation.x += (targetRotationX - modelGroup.rotation.x) * rotationSpeed;
      modelGroup.rotation.y += (targetRotationY - modelGroup.rotation.y) * rotationSpeed;

      // レンダリング
      renderer.render(scene, camera);

      requestAnimationFrame(tick);
    };
    tick();

    // リサイズ対応
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };
    window.addEventListener("resize", handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("resize", handleResize);
      if (mountRef.current) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelPath]);

  return <div ref={mountRef} style={{ position: "fixed", top: 0, left: 0, width: "100%", height: "100%" }} />;
};

export default ThreeCanvas;
