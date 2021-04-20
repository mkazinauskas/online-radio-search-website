const withCSS = require("@zeit/next-css");

module.exports = withCSS({});

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
        const proxiedUrl = process.env.NEXT_PUBLIC_PROXIED_API_URL;
        const apiUrl = process.env.NEXT_PUBLIC_API_URL;

        if (proxiedUrl === undefined || !proxiedUrl) {
            console.log('Proxying was turned off')
            return [];
        }

        console.log(`Adding proxy from: "${proxiedUrl}" under "${apiUrl}"`);
        return [
            {
                source: '/api/:path*',
                destination: `${proxiedUrl}/:path*`
            }
        ]
    },
}