module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: 'secret',
    },
    publicRuntimeConfig: {
        CURRENT_ENV: process.env.NEXT_PUBLIC_CURRENT_ENV,
        CONTACT_US_LINK: process.env.NEXT_PUBLIC_CONTACT_US_LINK,
        FACEBOOK_LINK: process.env.NEXT_PUBLIC_FACEBOOK_LINK,
        INSTAGRAM_LINK: process.env.NEXT_PUBLIC_INSTAGRAM_LINK,
        TWITTER_LINK: process.env.NEXT_PUBLIC_TWITTER_LINK,
        GITHUB_LINK: process.env.NEXT_PUBLIC_GITHUB_LINK,
        DRIBBLE_LINK: process.env.NEXT_PUBLIC_DRIBBLE_LINK,
        CONTACT_EMAIL: process.env.NEXT_PUBLIC_CONTACT_EMAIL,
        API_URL: process.env.NEXT_PUBLIC_API_URL,
        WEBSITE_NAME: process.env.NEXT_PUBLIC_WEBSITE_NAME,
        WEBSITE_URL: process.env.NEXT_PUBLIC_WEBSITE_URL,
        ANDROID_APP_DOWNLOAD_URL: process.env.NEXT_PUBLIC_ANDROID_APP_DOWNLOAD_URL,
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