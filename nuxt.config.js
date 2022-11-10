export default {
    ssr: false,

    target: 'static',

    env: {
        MNEMONIC: process.env.MNEMONIC,
        MORALIS_KEY: process.env.MORALIS_KEY,
        TINY_KEY: process.env.TINY_KEY,
        COVALENT_KEY: process.env.COVALENT_KEY,
        NFT_CONTRACT_ADDRESS: process.env.NFT_CONTRACT_ADDRESS,
        TOKEN_CONTRACT_ADDRESS: process.env.TOKEN_CONTRACT_ADDRESS,
        CERTIFICATE_CONTRACT_ADDRESS: process.env.CERTIFICATE_CONTRACT_ADDRESS,
        FIREBASE_API_KEY: process.env.FIREBASE_API_KEY,
        FIREBASE_AUTH_DOMAIN: process.env.FIREBASE_AUTH_DOMAIN,
        FIREBASE_PROJECT_ID: process.env.FIREBASE_PROJECT_ID,
        FIREBASE_STORAGE_BUCKET: process.env.FIREBASE_STORAGE_BUCKET,
        FIREBASE_MESSAGING_SENDER_ID: process.env.FIREBASE_MESSAGING_SENDER_ID,
        FIREBASE_APP_ID: process.env.FIREBASE_APP_ID,
        FIREBASE_MEASUREMENT_ID: process.env.FIREBASE_MEASUREMENT_ID
    },

    head: {
        title: 'Buidl - SocialFi for Learning',
        htmlAttrs: {
            lang: 'en'
        },
        meta: [
            { charset: 'utf-8' },
            { name: 'viewport', content: 'width=device-width, initial-scale=1' },
            { hid: 'description', name: 'description', content: 'Building a Borderless, Permissionless and Decentralized Social-Fi for Instructors and Learners.' },
            { name: 'format-detection', content: 'telephone=no' },
            { name: 'theme-color', content: '#001731' }
        ],
        link: [
            { rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' },
            {
                rel: "stylesheet",
                href: "https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.css"
            }
        ],
        script: [{
                src: "https://kit.fontawesome.com/19ee52fe0f.js",
                crossorigin: "anonymous",
                defer: true
            },
            {
                src: 'https://cdn.jsdelivr.net/npm/swiper/swiper-bundle.min.js',
                defer: true
            }
        ]
    },

    css: [
        '@/static/common.css'
    ],

    plugins: [
        '@/plugins/utils.js',
        '@/plugins/auth.js',
        '@/plugins/firestore.js',
        '@/plugins/axelar/axelarscan.js',
        '@/plugins/axelar/polygon.js',
        '@/plugins/contracts.js',
        '@/plugins/moralis-apis/ipfs.js',
        '@/plugins/moralis-apis/nft.js',
        '@/plugins/moralis-apis/token.js'
    ],

    components: {
        dirs: [
            '~/components',
            '~/components/landing',
            '~/components/dapp',
            '~/components/dapp/course',
            '~/components/dapp/token',
            '~/components/dapp/tools',
            '~/components/explore',
            '~/components/collectibles',
            '~/components/dialogs'
        ]
    },

    buildModules: [],

    modules: [
        '@nuxtjs/axios',
    ],

    axios: {
        baseURL: 'https://deep-index.moralis.io/api/v2/', // moralis api base url
    },

    build: {
        extend(config, { isDev, isClient }) {
            config.node = {
                fs: 'empty',
                net: 'empty',
                express: 'empty'
            }
        }
    },
}