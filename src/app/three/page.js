"use client";

import ThreeCanvas from "../../components/ThreeCanvas";

const ModelPage = () => {
  return (
    <div style={{ position: "relative" }}>
      {/* ThreeCanvasでモデルを表示 */}
      <ThreeCanvas modelPath="/models/test.glb" />

      {/* テキスト1をモデルの前面に表示 */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          fontSize: "2rem",
          color: "white",
          zIndex: 10, // モデルよりも前面に表示
          pointerEvents: "none", // ユーザー操作を無効化（必要に応じて削除可能）
        }}
      >
        テキスト1
      </div>

      {/* 他のテキストをスクロールセクションに配置 */}
      <div style={{ height: "200vh", display: "flex", flexDirection: "column", justifyContent: "center" }}>
        <div style={{ fontSize: "2rem", margin: "50px 0", textAlign: "center", color: "black" }}>
          テキスト2
        </div>
        <div style={{ fontSize: "2rem", margin: "50px 0", textAlign: "center", color: "black" }}>
          テキスト3
        </div>
      </div>
    </div>
  );
};

export default ModelPage;
