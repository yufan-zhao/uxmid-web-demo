import { defineConfig } from "vite";
// import vuePlugin from "@vitejs/plugin-vue";
import { createVuePlugin } from "vite-plugin-vue2";

const path = require("path");

// https://vitejs.dev/config/
export default defineConfig({
    resolve:
    {
        alias:
        {
            "public": path.resolve(__dirname, "public"),
            "src": path.resolve(__dirname, "src"),
            "uxmid-iview-web": path.resolve(__dirname, "uxmid-iview-web/src")
        }
    },
    css:
    {
        preprocessorOptions:
        {
            less:
            {
                modifyVars:
                {
                    hack: `true; @import (reference) "${path.resolve("src/styles/index.less")}";`
                },
                javascriptEnabled: true
            }
        }
    },
    plugins:
    [
        // vuePlugin(),
        createVuePlugin()
    ],
    build:
    {
        rollupOptions:
        {
            output:
            {
                manualChunks:
                {
                    vendor: ["vue", "uxmid-core", "vue-router", "vuex", "axios", "dayjs", "md5", "qs", "vue-class-component", "vue-property-decorator", "vuex-class"],
                    flagwind: ["flagwind-amap", "flagwind-core", "flagwind-core", "iview"],
                    iview: ["view-design"]
                }
            }
        }
    },
    server:
    {
        proxy:
        {
            "/kaiyangSystem":
            {
                target: "http://47.107.50.215:9015"
            },
            "/auth2server":
            {
                target: "http://47.107.50.215:9015"
            }
        }
    }
});
