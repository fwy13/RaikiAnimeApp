import React, { useEffect, useMemo, useRef, useState } from "react";
import Artplayer from "artplayer";
import Hls from "hls.js";
import workerHls from "hls.js/dist/hls.worker?url";
import { HlsModed } from "../../utils/hls-moded";
import { fetchJava } from "../../utils/fetchMobile";
import { Anime } from "../../types/TypeApp";
import getDataAnime from "../../utils/getDataAnime";
import { urlAnime } from "../../constant";
import { StatusBar } from "@capacitor/status-bar";
import { NavigationBar } from "@hugotomazi/capacitor-navigation-bar";
import formatNumber from "../../utils/formatNumber";
import { BsFullscreen } from "react-icons/bs";
import { HiOutlinePlayCircle, HiOutlinePauseCircle } from "react-icons/hi2";
import { IoIosArrowBack } from "react-icons/io";

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
let activeTime: number = Date.now();
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
    const useVideo = useRef<HTMLVideoElement | null>(null);
    const playerRef = useRef<HTMLDivElement | null>(null);
    const [isPlaying, setPlaying] = useState<boolean>(false);
    const [isPercentPlayed, setPercentPlayed] = useState<number>(0);
    const [isPercentLoaded, setPercentLoaded] = useState<number>(0);
    const [isCurrentTimeText, setCurrentTimeText] = useState<string>("00:00");
    const [isDurationTimeText, setDurationTimeText] = useState<string>("00:00");
    const [isCurrentingTime, setCurrentingTime] = useState<boolean>(false);
    const [isCurrentTime, setCurrentTime] = useState<number>(0);
    const [isControlShow, setControlShow] = useState<boolean>(true);
    const [isLoadingVideo, setLoadingVideo] = useState<boolean>(false);
    const [isFullscreen, setFullscreen] = useState<boolean>(false);

    const onTimeUpdate = () => {
        if (
            Date.now() - activeTime >= 3e3 &&
            isControlShow &&
            !isCurrentingTime &&
            isPlaying
        ) {
            setControlShow(false);
        }

        const currentTime = useVideo.current?.currentTime ?? 0;
        const durationTime = useVideo.current?.duration ?? 0;
        setCurrentTimeText(
            `${formatNumber(currentTime / 60)}:${formatNumber(
                currentTime % 60
            )}`
        );
        setDurationTimeText(
            `${formatNumber(durationTime / 60)}:${formatNumber(
                durationTime % 60
            )}`
        );
        const percent = (currentTime / durationTime) * 100;
        setPercentPlayed(Math.floor(percent));
    };
    const onProgress = () => {
        const target = useVideo.current!;
        let range = 0;
        const bf = target.buffered;
        const time = target.currentTime;
        try {
            while (!(bf.start(range) <= time && time <= bf.end(range))) {
                range += 1;
            }
            const loadEndPercentage = bf.end(range) / target.duration;
            setPercentLoaded(loadEndPercentage);
        } catch {
            try {
                setPercentLoaded(bf.end(0) / target.duration);
            } catch {}
        }
    };
    const onTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
        setCurrentingTime(true);
        const offsetX = e.currentTarget.getBoundingClientRect().x;
        const maxX = e.currentTarget.offsetWidth;
        const { left } = e.currentTarget.getBoundingClientRect();
        if (offsetX) {
            const clientX =
                (
                    (event as TouchEvent).changedTouches?.[0] ??
                    (event as TouchEvent).touches?.[0] ??
                    event
                ).clientX -
                offsetX -
                left;
            setCurrentTime(
                Math.max(
                    0,
                    Math.min(
                        useVideo.current!.duration,
                        (useVideo.current!.duration * clientX) / maxX
                    )
                )
            );
            setPercentPlayed(
                (Math.max(
                    0,
                    Math.min(
                        useVideo.current!.duration,
                        (useVideo.current!.duration * clientX) / maxX
                    )
                ) /
                    useVideo.current!.duration) *
                    100
            );
            activeTime = Date.now();
            setCurrentTimeText(
                `${formatNumber(
                    Math.max(
                        0,
                        Math.min(
                            useVideo.current!.duration,
                            (useVideo.current!.duration * clientX) / maxX
                        )
                    ) / 60
                )}:${formatNumber(
                    Math.max(
                        0,
                        Math.min(
                            useVideo.current!.duration,
                            (useVideo.current!.duration * clientX) / maxX
                        )
                    ) % 60
                )}`
            );
        }
    };
    const onTouchEnd = () => {
        setCurrentingTime(false);
        useVideo.current!.currentTime = isCurrentTime;
        activeTime = Date.now();
    };
    let outEvent: number | NodeJS.Timeout | null = null;
    const onTouchDBStart = () => {
        outEvent = setTimeout(() => {
            setControlShow(true);
        }, 400);
    };
    const onTouchDBMove = () => {
        if (outEvent) {
            clearTimeout(outEvent);
            outEvent = null;
        }
    };
    const fullScreen = async (fullscreen: boolean) => {
        if (fullscreen) {
            await playerRef.current!.requestFullscreen();
            if (!import.meta.env.DEV) {
                if (typeof document !== undefined) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (screen.orientation as unknown as any).lock("landscape");
                }
                StatusBar.hide();
                NavigationBar.hide();
                StatusBar.setOverlaysWebView({
                    overlay: true,
                });
            }
        } else {
            await document.exitFullscreen();
            if (!import.meta.env.DEV) {
                if (typeof document !== undefined) {
                    // eslint-disable-next-line @typescript-eslint/no-explicit-any
                    (screen.orientation as unknown as any).unlock();
                }
                StatusBar.show();
                NavigationBar.show();
                StatusBar.setOverlaysWebView({
                    overlay: false,
                });
            }
        }
        setFullscreen(document.fullscreenElement !== null);
    };
    useEffect(() => {
        if (isPlaying) {
            useVideo.current!.play();
        } else {
            useVideo.current!.pause();
        }
    }, [isPlaying]);
    useEffect(() => {
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
            hls.attachMedia(useVideo.current!);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                if (isPlaying) useVideo.current!.play();
            });
        }
    }, [isData]);

    return (
        <div className="flex h-[25%] w-full" ref={playerRef}>
            <video
                ref={useVideo}
                className={`${isFullscreen ? "" : "object-fill"} w-full`}
                onTimeUpdate={!isCurrentingTime ? onTimeUpdate : () => {}}
                onProgress={onProgress}
                poster={Props.isData?.banner}
                onPlay={() => {
                    setPlaying(true);
                }}
                onPause={() => {
                    setPlaying(false);
                }}
                onWaiting={() => {
                    setLoadingVideo(true);
                }}
                onCanPlay={() => {
                    setLoadingVideo(false);
                }}
            ></video>
            <div
                className="absolute top-0 left-0 w-full h-full cursor-none"
                style={{ display: isControlShow ? "none" : "" }}
                onTouchStart={onTouchDBStart}
                onTouchMove={onTouchDBMove}
                onTouchEnd={() => {
                    activeTime = Date.now();
                }}
            ></div>
            <div
                className="absolute w-full h-[25%] top-0 left-0 bg-[#00000056] overflow-hidden flex items-center justify-center px-1 animate-fade-out toolbar"
                style={{
                    display: isControlShow ? "" : "none",
                }}
            >
                <div className="pt-5 pl-2 w-full pb-[160px] absolute flex items-center toolbar-top">
                    <div className="text-white">
                        <IoIosArrowBack className="size-6" />
                    </div>
                    <div className="text-white">
                        <h3 className="text-[14px]">{Props.isData?.title}</h3>
                        <span className="text-sm">Tập {Props.Ep + 1}</span>
                    </div>
                </div>
                <div className="pb-0 px-2 pt-[160px] w-full toolbar-bottom-progress">
                    <div
                        className="relative flex flex-row items-center px-1 py-4 cursor-pointer z-[30]"
                        onTouchStart={onTouchStart}
                        onTouchMove={onTouchStart}
                        onTouchEnd={onTouchEnd}
                    >
                        <div className="flex items-center relative h-[3px] w-full bg-[#fff3] transition-[height] duration-[0.22s] ease-[ease-in-out]">
                            <div
                                className="absolute z-[10] left-0 top-0 right-0 bottom-0 h-full w-0 bg-[#fff6] pointer-events-none"
                                style={{
                                    width: `${isPercentLoaded * 100}%`,
                                }}
                            />
                            <div
                                className="absolute z-[20] left-0 top-0 right-0 bottom-0 h-full w-0 bg-[#00c234] pointer-events-none"
                                style={{
                                    width: `${isPercentPlayed}%`,
                                }}
                            />
                            <div
                                className="absolute z-[22] left-0 top-0 right-0 bottom-0 w-0 h-full pointer-events-none"
                                style={{
                                    width: `${isPercentPlayed}%`,
                                }}
                            >
                                <div className="absolute size-[15px] right-[-10px] top-[calc(100%-9px)] transition-transform duration-[0.2s] ease-[ease-in-out] z-[22]">
                                    <img src="https://artplayer.org/assets/img/indicator.svg" />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="flex justify-between absolute pt-[120px] w-full h-5 px-4 items-center text-white toolbar-bottom-text">
                    <div className="text-[13px] font">
                        {isCurrentTimeText} /{" "}
                        {isFinite(Number(isDurationTimeText.split(":")[0]))
                            ? isDurationTimeText
                            : "00:00"}
                    </div>
                    <div
                        onClick={() => {
                            fullScreen(!isFullscreen);
                        }}
                    >
                        <BsFullscreen />
                    </div>
                </div>
                <div className="flex justify-between absolute pl-[160px] w-full h-5 px-2 items-center text-white z-[31]">
                    <div
                        className={`absolute w-12 h-12`}
                        onClick={() => {
                            setPlaying(!isPlaying);
                        }}
                    >
                        {isLoadingVideo ? (
                            <span className="loadingVideo size-12"></span>
                        ) : !isPlaying ? (
                            <span>
                                <HiOutlinePlayCircle className="size-12" />
                            </span>
                        ) : (
                            <span>
                                <HiOutlinePauseCircle className="size-12" />
                            </span>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};
export default PlayerAnime;
