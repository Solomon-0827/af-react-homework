/** @type {import('next').NextConfig} */
const nextConfig = {
    // basePath: '/af',
    // async redirects() {
    //     return [
    //         {
    //             source: '/cookieNull',
    //             destination: 'https://www.baidu.com/',
    //             permanent: true,
    //         },
    //     ]
    // }
    // async redirects() {
    //     return [
    //         {
    //             source: '/',
    //             has: [
    //                 {
    //                     type: 'header',
    //                     key: 'accept-language',
    //                     value: '(en)',
    //                 }
    //             ],
    //             destination: '/en', // 相对于 /af，所以最终是 /af/en
    //             permanent: true,
    //             locale: false,
    //         },
    //         {
    //             source: '/',
    //             has: [
    //                 {
    //                     type: 'header',
    //                     key: 'accept-language',
    //                     value: '(zh)',
    //                 }
    //             ],
    //             destination: '/cn', // 相对于 /af，所以最终是 /af/cn
    //             permanent: true,
    //             locale: false,
    //         },
    //         {
    //             source: '/',
    //             destination: '/cn', // 默认情况下也是跳转到 /af/cn
    //             permanent: true,
    //             locale: false,
    //         },
    //     ];
    // },
};

export default nextConfig;