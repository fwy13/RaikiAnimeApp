import formatNumber from "../../../utils/formatNumber";
import { Props } from "../PlayerAnime";

const newControlSample = (currentTime: string, durTime: string) => {
    return `
        <div class="flex justify-between w-full px-3 pt-3 mb-6">
            <span class="font-light">${currentTime} / ${durTime}</span>
                <button class="fullscreen">
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-6">
                        <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M3.75 3.75v4.5m0-4.5h4.5m-4.5 0L9 9M3.75 20.25v-4.5m0 4.5h4.5m-4.5 0L9 15M20.25 3.75h-4.5m4.5 0v4.5m0-4.5L15 9m5.25 11.25h-4.5m4.5 0v-4.5m0 4.5L15 15"></path>
                    </svg>
            </button>
        </div>
    `;
};

const ControlPlayer = (Props: Props) => {
    return (art: Artplayer) => {
        document
            .querySelector(".art-progress-indicator")!
            .setAttribute("style", "transform: scale(1);");
        art.template.$progress.setAttribute(
            "style",
            "margin-bottom: 10px; padding: 4px; z-index: 10000"
        );
        art.template.$notice.innerHTML = "";
        document
            .querySelector(".art-bottom")
            ?.setAttribute("style", "position: relative; background: rgba(0, 0, 0, 0.4)");
        document
            .querySelector(".art-controls")
            ?.setAttribute(
                "style",
                "position: absolute; margin-bottom: 10px; width: 100%; left: 0px"
            );
        const headerVideo = document.createElement("div");
        headerVideo.setAttribute("style", "position: absolute;width: 100%;left: 0px;top: 0px;padding-left: 2px; padding-right: 2px; display: flex; justify-content: space-between")
        headerVideo.innerHTML = `
        <div class="p-2 flex items-center h-auto gap-2">
            <button>
                <svg
                    xmlns="http://www.w3.org/2000/svg"255, 255, 255
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6">
                    <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"></path>
                </svg>
            </button>
            <div class="flex flex-col w-3/4 title-header">
                <h3>${Props.isData?.title}</h3>
                <h3>Tập ${formatNumber(Props.Ep + 1)} - ${Props.isDataSkip?.nameEp}</h3>
            </div>
        </div>
        <div class="flex items-center">
            <button class="btn btn-circle bg-transparent border-transparent">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6">
                    <path
                        fill-rule="evenodd"
                        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
        `
        const bottomVideo = document.createElement("div");
        bottomVideo.setAttribute("style", "position: absolute;width: 100%;left: 0px;bottom: 0px;padding-left: 2px; padding-right: 2px; display: flex; justify-content: space-between")
        bottomVideo.innerHTML = `
        <div class="p-2 flex items-center h-auto gap-2">
            Hello
        </div>
        <div class="flex items-center">
            <button class="btn btn-circle bg-transparent border-transparent">
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="currentColor"
                    class="size-6">
                    <path
                        fill-rule="evenodd"
                        d="M11.078 2.25c-.917 0-1.699.663-1.85 1.567L9.05 4.889c-.02.12-.115.26-.297.348a7.493 7.493 0 0 0-.986.57c-.166.115-.334.126-.45.083L6.3 5.508a1.875 1.875 0 0 0-2.282.819l-.922 1.597a1.875 1.875 0 0 0 .432 2.385l.84.692c.095.078.17.229.154.43a7.598 7.598 0 0 0 0 1.139c.015.2-.059.352-.153.43l-.841.692a1.875 1.875 0 0 0-.432 2.385l.922 1.597a1.875 1.875 0 0 0 2.282.818l1.019-.382c.115-.043.283-.031.45.082.312.214.641.405.985.57.182.088.277.228.297.35l.178 1.071c.151.904.933 1.567 1.85 1.567h1.844c.916 0 1.699-.663 1.85-1.567l.178-1.072c.02-.12.114-.26.297-.349.344-.165.673-.356.985-.57.167-.114.335-.125.45-.082l1.02.382a1.875 1.875 0 0 0 2.28-.819l.923-1.597a1.875 1.875 0 0 0-.432-2.385l-.84-.692c-.095-.078-.17-.229-.154-.43a7.614 7.614 0 0 0 0-1.139c-.016-.2.059-.352.153-.43l.84-.692c.708-.582.891-1.59.433-2.385l-.922-1.597a1.875 1.875 0 0 0-2.282-.818l-1.02.382c-.114.043-.282.031-.449-.083a7.49 7.49 0 0 0-.985-.57c-.183-.087-.277-.227-.297-.348l-.179-1.072a1.875 1.875 0 0 0-1.85-1.567h-1.843ZM12 15.75a3.75 3.75 0 1 0 0-7.5 3.75 3.75 0 0 0 0 7.5Z"
                        clip-rule="evenodd"></path>
                </svg>
            </button>
        </div>
        `
        document.querySelector(".art-bottom")?.appendChild(headerVideo);
        document.querySelector(".art-bottom")?.appendChild(bottomVideo);
        document.querySelector(".art-progress")?.setAttribute("style", "margin-bottom: 50px; padding: 4px; z-index: 10000")
        document.querySelector(".art-controls")?.setAttribute("style", "position: absolute; margin-bottom: 50px; width: 100%; left: 0px")
        art.template.$controls.innerHTML = newControlSample("00:00", "00:00");
        art.on("video:canplaythrough", () => {
            const dur = art.duration;
            const currentTime = art.currentTime;
            art.template.$controls.innerHTML = newControlSample(
                `${formatNumber(Math.floor(currentTime / 60))}:${formatNumber(
                    Math.floor(currentTime % 60)
                )}`,
                `${formatNumber(Math.floor(dur / 60))}:${formatNumber(
                    Math.floor(dur % 60)
                )}`
            );
        });
        art.on("video:timeupdate", () => {
            const dur = art.duration;
            const currentTime = art.currentTime;
            art.template.$controls.innerHTML = newControlSample(
                `${formatNumber(Math.floor(currentTime / 60))}:${formatNumber(
                    Math.floor(currentTime % 60)
                )}`,
                `${formatNumber(Math.floor(dur / 60))}:${formatNumber(
                    Math.floor(dur % 60)
                )}`
            );
        });
        return {
            name: "ControlPlayer",
        };
    };
};
export default ControlPlayer;
