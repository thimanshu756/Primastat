/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['prima-portal.s3.amazonaws.com'],
    dangerouslyAllowSVG: true,
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  typescript:{
    ignoreBuildErrors:true,
  }
};

export default nextConfig;
