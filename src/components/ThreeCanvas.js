"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ThreeCanvas = ({ modelPath }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    // シーンの作成
    const scene = new THREE.Scene();

    // カメラの作成
    const camera = new THREE.PerspectiveCamera(45, window.innerWidth / window.innerHeight, 0.1, 1000);
    camera.position.set(0, 2, 4);
    camera.lookAt(new THREE.Vector3(0, 1, 0));

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

        // モデルを中心に移動
        model.position.sub(center);

        // グループにモデルを追加
        modelGroup.add(model);
      },
      undefined,
      (error) => {
        console.error('モデルの読み込みに失敗しました', error);
      }
    );

    // マウスの位置を追跡
    const mouse = new THREE.Vector2();
    function onMouseMove(event) {
      mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
      mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
    }
    window.addEventListener('mousemove', onMouseMove);

    // アニメーションループ
    function tick() {
      requestAnimationFrame(tick);

      // モデルの回転を真ん中の軸で行う
      if (modelGroup) {
        const targetRotationX = THREE.MathUtils.degToRad(mouse.y * -20);
        const targetRotationY = THREE.MathUtils.degToRad(mouse.x * 40);

        // 現在の回転と目標の回転の差を計算
        const diffX = targetRotationX - modelGroup.rotation.x;
        const diffY = targetRotationY - modelGroup.rotation.y;

        // 緩やかに回転を適用
        modelGroup.rotation.x += diffX * 0.05;
        modelGroup.rotation.y += diffY * 0.05;

        // 回転を-45度から45度に制限
        modelGroup.rotation.x = THREE.MathUtils.clamp(modelGroup.rotation.x, -Math.PI / 4, Math.PI / 4);
        modelGroup.rotation.y = THREE.MathUtils.clamp(modelGroup.rotation.y, -Math.PI / 4, Math.PI / 4);
      }
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

    window.addEventListener('resize', handleResize);

    // クリーンアップ
    return () => {
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', onMouseMove);

      // mountRef.current の存在を確認してから削除
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelPath]);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ThreeCanvas;
