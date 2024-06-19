
import { backendURL } from "./composables/configs";
export default defineNuxtConfig({
  devtools: { enabled: true },
  modules: [
    "@nuxtjs/tailwindcss",
    "@pinia/nuxt",
  ],

    css: [
    'vuetify/styles/main.css',
    '@mdi/font/css/materialdesignicons.css',
  ],
  build: {
    transpile: ["vuetify","qrcode.vue"],
  },
  app: {
    head: {
      link: [
        // { rel: "preconnect", href: "https://fonts.googleapis.com" },
        { rel: 'stylesheet', href: 'https://fonts.googleapis.com/icon?family=Material+Icons' },

        {
          rel: "preconnect",
          href: "https://fonts.gstatic.com",
          crossorigin: "anonymous",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Kantumruy+Pro:ital,wght@0,100..700;1,100..700&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0",
        },
        {
          rel: "stylesheet",
          href: "https://fonts.googleapis.com/css2?family=Ubuntu:wght@300&display=swap",
        },
        {
          rel: "stylesheet",
          href: "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.css",
          integrity:
            "sha512-hvNR0F/e2J7zPPfLC9auFe3/SE0yG4aJCOd/qxew74NN7eyiSKjr7xJJMu1Jy2wf7FXITpWS1E/RY8yzuXN7VA==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
      ],
      script: [
        {
          src: "https://cdnjs.cloudflare.com/ajax/libs/cropperjs/1.6.1/cropper.min.js",
          integrity:
            "sha512-9KkIqdfN7ipEW6B6k+Aq20PV31bjODg4AA52W+tYtAE0jE0kMx49bjJ3FgvS56wzmyfMUHbQ4Km2b7l9+Y/+Eg==",
          crossorigin: "anonymous",
          referrerpolicy: "no-referrer",
        },
      ],
    },
  },
  nitro: {
    routeRules: {
      "/api/**": { proxy: backendURL + "/**" },
    },
  },
  extends: ['nuxt-emoji'],
});
