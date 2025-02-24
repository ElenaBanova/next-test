import type {NextConfig} from "next";

const nextConfig: NextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: "dummyjson.com"
            }]
    },
    /* config options here */
};


export default nextConfig;
