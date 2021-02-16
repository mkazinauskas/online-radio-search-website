module.exports = {
    serverRuntimeConfig: {
        // Will only be available on the server side
        mySecret: 'secret',
    },
    publicRuntimeConfig: {
        CURRENT_ENV: process.env.NEXT_PUBLIC_CURRENT_ENV,
    },
}