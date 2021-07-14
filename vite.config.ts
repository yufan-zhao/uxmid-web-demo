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
            "uxmid-vue-web": path.resolve(__dirname, "uxmid-vue-web")
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
    ]
});