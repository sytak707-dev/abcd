/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',          // Cloudflare Pages 정적 빌드
  images: { unoptimized: true },
}

export default nextConfig
