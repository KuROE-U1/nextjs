"use client";

import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader';

const ModelPage = () => {
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

    // 光源
    const spotLight = new THREE.SpotLight(0x00FFFF, 10);
    spotLight.position.set(2, 1, 2);
    scene.add(spotLight);

    const spotLight2 = new THREE.SpotLight(0xFFFFFF, 10);
    spotLight2.position.set(-2, 1, 2);
    scene.add(spotLight2);

    // レンダラー
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth, window.innerHeight);
    mountRef.current.appendChild(renderer.domElement);

    // グループを作成して、モデルを中心に配置
    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    // 環境変数からベースURLを取得
    const baseUrl = process.env.REACT_APP_BASE_URL || '';

    // GLTFファイルの絶対パスを構築
    const modelPath = `${baseUrl}/models/iPhone.glb`;

    // GLTFファイルの読み込み
    const loader = new GLTFLoader();
    loader.load(modelPath, (gltf) => {
      const model = gltf.scene;

      // モデルのバウンディングボックスを計算
      const box = new THREE.Box3().setFromObject(model);
      const center = box.getCenter(new THREE.Vector3());

      // モデルを中心に移動
      model.position.sub(center);

      // グループにモデルを追加
      modelGroup.add(model);
    }, undefined, (error) => {
      console.error('モデルの読み込みに失敗しました', error);
    });

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

      if (modelGroup) {
        const targetRotationX = THREE.MathUtils.degToRad(mouse.y * 10);
        const targetRotationY = THREE.MathUtils.degToRad(mouse.x * 20);

        const diffX = targetRotationX - modelGroup.rotation.x;
        const diffY = targetRotationY - modelGroup.rotation.y;

        modelGroup.rotation.x += diffX * 0.05;
        modelGroup.rotation.y += diffY * 0.05;

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
      mountRef.current.removeChild(renderer.domElement);
    };
  }, []);

  return <div ref={mountRef} style={{ width: '100%', height: '100vh' }} />;
};

export default ModelPage;