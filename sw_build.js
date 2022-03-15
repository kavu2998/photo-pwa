const {generateSW} = require('workbox-build');

generateSW({
    swDest:'client/sw.js',
    globDirectory: 'client',
    globPatterns: [
        '**/*.{html,css}',
        'main.js',
        'Classes/*.js'
    ],
    skipWaiting: true,
    clientsClaim: true,
    runtimeCaching: [
        {
            urlPattern:/\.(css|js)/,
            handler: 'CacheFirst'
        }
    ]
}).then(({count, size})=>{
    console.log(`${count} files precached. Size : ${size}`)
}).catch(console.error)