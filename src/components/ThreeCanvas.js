"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { GLTFLoader } from "three/examples/jsm/loaders/GLTFLoader";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const ThreeCanvas = ({ modelPath }) => {
  const mountRef = useRef(null);

  useEffect(() => {
    const scene = new THREE.Scene();

    const camera = new THREE.PerspectiveCamera(
      45,
      (window.innerWidth * 0.5) / window.innerHeight,
      0.1,
      1000
    );

    camera.position.set(0, 0, 2);
    camera.lookAt(0, 0, 0);

    const ambientLight = new THREE.AmbientLight(0xffffff, 2);
    scene.add(ambientLight);

    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });
    renderer.setClearColor(0x000000, 0);
    renderer.setPixelRatio(window.devicePixelRatio);
    renderer.setSize(window.innerWidth * 0.5, window.innerHeight);

    if (mountRef.current) {
      mountRef.current.appendChild(renderer.domElement);
    }

    const modelGroup = new THREE.Group();
    scene.add(modelGroup);

    const loader = new GLTFLoader();
loader.load(
  modelPath,
  (gltf) => {
    const model = gltf.scene;

    const box = new THREE.Box3().setFromObject(model);
    const center = box.getCenter(new THREE.Vector3());
    const size = box.getSize(new THREE.Vector3());

    // モデルを原点に移動
    model.position.set(-center.x, -center.y, -center.z);

    const desiredSize = 1;
    const maxDimension = Math.max(size.x, size.y, size.z);
    const scale = desiredSize / maxDimension;
    model.scale.set(scale, scale, scale);

    modelGroup.add(model);
    modelGroup.position.set(-0.25, 0, 0);

// 出現アニメーション
gsap.fromTo(
    modelGroup.position,
    { x: -2 },
    {
      x: -0.25,
      scrollTrigger: {
        trigger: mountRef.current,
        start: "top+=50% center",
        end: "bottom+=50% center",
        scrub: true,
        // markers: true,
      },
      ease: "none",
    }
  );

  // 初期回転アニメーション
  gsap.fromTo(
    model.rotation,
    {
      x: -Math.PI / 9,
      y: -Math.PI / 6,
      z: -Math.PI / 9,
    },
    {
      x: -Math.PI / 18,
      y: -Math.PI / 9,
      z: -Math.PI / 18,
      scrollTrigger: {
        trigger: mountRef.current,
        start: "top+=70% center",
        end: "bottom+=50% center",
        scrub: true,
      },
      ease: "none",
    }
  );

  // 連続回転アニメーション
  gsap.fromTo(model.rotation, {
    x: -Math.PI / 18,
    y: -Math.PI / 9,
    z: -Math.PI / 18,
}, {
    x: -Math.PI / 18,
    y: Math.PI * 2,
    z: -Math.PI / 18,
    scrollTrigger: {
        trigger: mountRef.current,
        start: "bottom+=90% center",
        end: "bottom+=290% center",
        scrub: true,
        // markers: true,
    },
    ease: "none",
});

},
undefined,
(error) => {
  console.error("モデルの読み込みに失敗しました", error);
}
);

    function tick() {
      requestAnimationFrame(tick);
      renderer.render(scene, camera);
    }
    tick();

    const handleResize = () => {
      const width = window.innerWidth * 0.5;
      const height = window.innerHeight;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }
    };
  }, [modelPath]);

  return (
    <div
      ref={mountRef}
      style={{
        position: "absolute",
        width: "50%",
        height: "100%",
        left: "0", // 左側50%
        top: "0",
      }}
    />
  );
};

export default ThreeCanvas;
