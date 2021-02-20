module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: 'secret',
    },
    publicRuntimeConfig: {
        CURRENT_ENV: process.env.NEXT_PUBLIC_CURRENT_ENV,
        CONTACT_US_LINK: process.env.NEXT_PUBLIC_CONTACT_US_LINK,
        API_URL: process.env.NEXT_PUBLIC_API_URL 
    },
}