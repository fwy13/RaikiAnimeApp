import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "git.fwy13.NeptuneAnime",
    appName: "NeptuneAnime",
    webDir: "dist",
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
    },
};

export default config;
