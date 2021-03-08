module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: 'secret',
    },
    publicRuntimeConfig: {
        CURRENT_ENV: process.env.NEXT_PUBLIC_CURRENT_ENV,
        CONTACT_US_LINK: process.env.NEXT_PUBLIC_CONTACT_US_LINK,
        CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        WEBSITE_NAME: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
    },
    async rewrites() {
        return [
            {
                source: '/api/:path*',
                destination: 'https://api.onlineradiosearch.com/:path*'
            }
        ]
    },
}