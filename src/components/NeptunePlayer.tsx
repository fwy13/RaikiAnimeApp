import { useEffect, useRef, useState } from "react";
import Hls from "hls.js";
import { HlsModed } from "../utils/hls-moded";
import workerHls from "hls.js/dist/hls.worker?url";
import { urlAnime } from "../constant";
import { fetchJava } from "../utils/fetchMobile";

const NeptunePlayer = () => {
    const useVideo = useRef<HTMLVideoElement | null>(null);
    const [isPercentVideo, setPercentVideo] = useState<number>(0);
    const useProgress = useRef<HTMLDivElement | null>(null);
    const handlerProgress = () => {
        const currentTime = useVideo.current?.currentTime as number;
        const dur = useVideo.current?.duration as number;
        setPercentVideo((currentTime / dur) * 100);
    };
    const setUp = () => {
        if (Hls.isSupported()) {
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
            hls.loadSource(
                "http://content.jwplatform.com/manifests/vM7nH0Kl.m3u8"
            );
            hls.attachMedia(useVideo.current!);
            hls.on(Hls.Events.MANIFEST_PARSED, () => {
                // useVideo.current?.play();
            });
        } else {
            console.error("Trình duyệt của bạn không hỗ trợ hls!");
        }
    };
    useEffect(() => {
        setUp();
    });
    return (
        <div className="relative w-full">
            <video
                ref={useVideo}
                className="w-full h-[30%]"
                onProgress={handlerProgress}
            />
            <div onClick={(() => {
                useVideo.current?.play()
            })}>Hello</div>
            <div className="absolute bottom-0 pb-[10px] h-[3px] w-full">
                <div
                    className="w-full h-[3px] bg-[#fff3] transi relative"
                    ref={useProgress}
                >
                    <div className="bg-[#fff6] w-[30%] h-full absolute"></div>
                    <div className={` bg-[#00c234] w-[${isPercentVideo}%] h-full absolute`}></div>
                    <div className="w-[10%] h-full absolute top-[-2px] left-[10%] items-center flex">
                        <img
                            width={16}
                            height={16}
                            src="https://artplayer.org/assets/img/indicator.svg"
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};
export default NeptunePlayer;
