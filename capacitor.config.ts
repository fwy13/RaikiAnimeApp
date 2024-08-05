import type { CapacitorConfig } from "@capacitor/cli";

const config: CapacitorConfig = {
    appId: "git.fwy13.RaikiAManga",
    appName: "RaikiManga",
    webDir: "dist",
    plugins: {
        CapacitorHttp: {
            enabled: true,
        },
    },
};

export default config;
