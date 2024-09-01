/** @type {import('next').NextConfig} */
const nextConfig = {   
    images: {
        domains: ['raw.githubusercontent.com'],
      },
      experimental: {
        ppr: true,
      },
};


export default nextConfig;
