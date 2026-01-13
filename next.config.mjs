/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      { source: '/home', destination: '/', permanent: true },
      { source: '/projects', destination: '/portfolio', permanent: true },
    ]
  }
};


export default nextConfig;
