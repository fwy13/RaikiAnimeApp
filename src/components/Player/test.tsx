import React, { useEffect, useRef, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import workerHls from "hls.js/dist/hls.worker?url";
import { HlsModed } from "../../utils/hls-moded";
import { fetchJava } from "../../utils/fetchMobile";
import { Anime } from "../../types/TypeApp";
import getDataAnime from "../../utils/getDataAnime";
import { urlAnime } from "../../constant";
import ControlPlayer from "./Plugins/ControlPlayer";
import { StatusBar } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";

export type Props = {
    isData: Partial<Anime> | undefined;
    Ep: number;
    isEp: {
        dataPlay: string | undefined;
        dataLink: string | undefined;
        dataId: string | undefined;
    };
    isDataSkip?: {
        intro: { start: number; end: number };
        outro: { start: number; end: number };
        nameEp: string;
    };
};

const PlayerAnime: React.FC<Props> = (Props) => {
    const [isData, setData] = useState<string>();
    const getSeg = async ({
        id,
        play,
        link,
    }: {
        id: string | undefined;
        play: string | undefined;
        link: string | undefined;
    }) => {
        setData(
            (
                await getDataAnime({
                    id,
                    link,
                    play,
                })
            ).data
        );
    };
    useEffect(() => {
        if (Props !== undefined) {
            getSeg({
                id: Props.isEp.dataId,
                link: Props.isEp.dataLink,
                play: Props.isEp.dataPlay,
            });
        }
    }, [Props]);
    const artRef = useRef<HTMLDivElement | null>(null);
    const M3u8Moded = (vid: HTMLMediaElement, url: string) => {
        if (Hls.isSupported() && isData !== undefined) {
            const hls = new HlsModed(
                {
                    workerPath: workerHls,
                    progressive: true,
                    fragLoadingRetryDelay: 10000,
                    fetchSetup(context, initParams) {
                        if (!import.meta.env.DEV)
                            initParams.headers.set("referer", urlAnime);
                        if (!context.url.includes("base64")) {
                            context.url += `#animevsub-vsub_extra`;
                        }
                        return new Request(context.url, initParams);
                    },
                },
                async (request) => {
                    return fetchJava(request.url, request);
                }
            );
            hls.loadSource(isData);
            hls.attachMedia(vid);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // vid.play();
            });
        } else {
            vid.src = isData ?? "";
        }
    };
    useEffect(() => {
        if (isData !== undefined && Props.isDataSkip) {
            const art = new Artplayer({
                container: artRef.current!,
                url: isData,
                type: "m3u8",
                poster: `${Props.isData?.banner}`,
                theme: "#00c234",
                fullscreen: true,
                autoOrientation: true,
                icons: {
                    indicator:
                        '<img width="16" heigth="16" src="https://artplayer.org/assets/img/indicator.svg">',
                },
                plugins: [ControlPlayer(Props)],
                customType: {
                    m3u8: M3u8Moded,
                },
            });
            var opened: boolean = false;
            art.on("control", () => {
                opened = !opened;
                art.on("video:timeupdate", () => {
                    if (opened) {
                        document
                            .querySelector(".fullscreen")!
                            .addEventListener("click", () => {
                                if (art.fullscreen) {
                                    art.fullscreen = false;
                                    (
                                        screen.orientation as unknown as any
                                    ).unlock();
                                    if (!import.meta.env.DEV) {
                                        StatusBar.show();
                                        NavigationBar.show();
                                        StatusBar.setOverlaysWebView({
                                            overlay: false,
                                        });
                                    }
                                } else {
                                    art.fullscreen = true;
                                    (screen.orientation as unknown as any).lock(
                                        "landscape"
                                    );
                                    if (!import.meta.env.DEV) {
                                        StatusBar.hide();
                                        NavigationBar.hide();
                                        StatusBar.setOverlaysWebView({
                                            overlay: true,
                                        });
                                    }
                                }
                            });
                    }
                });
            });
            return () => {
                if (art && art.destroy) {
                    art.destroy(false);
                }
            };
        }
    }, [isData, Props.isDataSkip]);

    return <div ref={artRef} className="z-100 flex h-[30%]"></div>;
};
export default PlayerAnime;
