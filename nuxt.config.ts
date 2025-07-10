// https://nuxt.com/docs/api/configuration/nuxt-config
export default defineNuxtConfig({
    compatibilityDate: '2025-05-15',
    devtools: { enabled: true },
    modules: [
        '@pinia/nuxt',
    ],
    css: ['~/assets/css/main.css'],
    postcss: {
        plugins: {
            tailwindcss: {},
            autoprefixer: {},
        },
    },
    runtimeConfig: {
        databaseUrl: process.env.DATABASE_URL
    },
    nitro: {
        // Remove devProxy as it creates a proxy loop
        // The API endpoints are served directly by Nuxt
    },
    devServer: {
        host: '0.0.0.0',
        port: 3000
    }
})
