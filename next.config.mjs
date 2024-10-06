/** @type {import('next').NextConfig} */
const nextConfig = {
    output: 'export', // 静的エクスポート
    basePath: '/Nextjs', // リポジトリ名に合わせたベースパス
    assetPrefix: '/Nextjs/', // 静的ファイルのパス
    trailingSlash: true, // URLの末尾にスラッシュを追加
  };
  
  export default nextConfig;
  