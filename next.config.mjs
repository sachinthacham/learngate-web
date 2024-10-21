/** @type {import('next').NextConfig} */
const nextConfig = {
    images:{
        remotePatterns:[{hostname:"images.pexels.com"}],
        domains: ['images.unsplash.com'],
    }
};

export default nextConfig;
