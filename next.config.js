/** @type {import('next').NextConfig} */
const nextConfig = {
    images: {
        remotePatterns: [
            {
                protocol: 'https',
                hostname: 'storage.googleapis.com',
                port: '',
                pathname: `/${process.env.BUCKET_NAME}/**`,
            },
        ],
    },
};

module.exports = nextConfig;
