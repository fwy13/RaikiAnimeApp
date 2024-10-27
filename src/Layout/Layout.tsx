import { useIonRouter } from "@ionic/react";
import { useLayout } from "./LayoutContext";
import { useEffect } from "react";

const Layout = () => {
    const { IsStatus, setIsType, isHidden, isLoading } = useLayout();
    const route = useIonRouter();
    useEffect(() => {
        console.log(`%c NeptuneAnime %c 0.1.2 %c`, "color: #fff; background: #5f5f5f", "color: #fff; background: #4bc729", "");
    },[])
    return (
        <>
            <div
                className={`${
                    isLoading ? "flex" : "hidden"
                } flex-col w-full h-screen bg-base-100 justify-center items-center animate-ease-out`}
            >
                <div className="loader"></div>
                <div className="flex mt-4">
                    <span className="jump">L</span>
                    <span className="jump delay-1">O</span>
                    <span className="jump delay-2">A</span>
                    <span className="jump delay-3">D</span>
                    <span className="jump delay-4">I</span>
                    <span className="jump delay-5">N</span>
                    <span className="jump delay-6">G</span>
                </div>
            </div>
            <div
                className={`fixed bottom-0 left-0 z-[99999] w-full h-[60px] bg-base-100 animate-fade-up ${
                    isHidden ? "hidden" : ""
                }`}
            >
                <div className="grid h-full max-w-lg grid-cols-4 mx-auto font-medium">
                    <button
                        type="button"
                        className="flex flex-col items-center justify-center px-2 hover:bg-gray-700"
                        onClick={() => {
                            route.push("/");
                            setIsType("manga");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`size-6 ${
                                IsStatus.home ? "text-white" : "text-gray-400"
                            }`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M12 6.042A8.967 8.967 0 0 0 6 3.75c-1.052 0-2.062.18-3 .512v14.25A8.987 8.987 0 0 1 6 18c2.305 0 4.408.867 6 2.292m0-14.25a8.966 8.966 0 0 1 6-2.292c1.052 0 2.062.18 3 .512v14.25A8.987 8.987 0 0 0 18 18a8.967 8.967 0 0 0-6 2.292m0-14.25v14.25"
                            />
                        </svg>
                        <span
                            className={`text-sm ${
                                IsStatus.home ? "text-white" : "text-gray-400"
                            }`}
                        >
                            Manga
                        </span>
                    </button>
                    <button
                        type="button"
                        className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-700"
                        onClick={() => {
                            route.push("/search");
                            setIsType("search");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`size-6 ${
                                IsStatus.search ? "text-white" : "text-gray-400"
                            }`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                            />
                        </svg>
                        <span
                            className={`text-sm ${
                                IsStatus.search ? "text-white" : "text-gray-400"
                            }`}
                        >
                            Tìm kiếm
                        </span>
                    </button>
                    <button
                        type="button"
                        className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-700"
                        onClick={() => {
                            route.push("/anime");
                            setIsType("anime");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`size-6 ${
                                IsStatus.anime ? "text-white" : "text-gray-400"
                            }`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M3.375 19.5h17.25m-17.25 0a1.125 1.125 0 0 1-1.125-1.125M3.375 19.5h1.5C5.496 19.5 6 18.996 6 18.375m-3.75 0V5.625m0 12.75v-1.5c0-.621.504-1.125 1.125-1.125m18.375 2.625V5.625m0 12.75c0 .621-.504 1.125-1.125 1.125m1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125m0 3.75h-1.5A1.125 1.125 0 0 1 18 18.375M20.625 4.5H3.375m17.25 0c.621 0 1.125.504 1.125 1.125M20.625 4.5h-1.5C18.504 4.5 18 5.004 18 5.625m3.75 0v1.5c0 .621-.504 1.125-1.125 1.125M3.375 4.5c-.621 0-1.125.504-1.125 1.125M3.375 4.5h1.5C5.496 4.5 6 5.004 6 5.625m-3.75 0v1.5c0 .621.504 1.125 1.125 1.125m0 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125m1.5-3.75C5.496 8.25 6 7.746 6 7.125v-1.5M4.875 8.25C5.496 8.25 6 8.754 6 9.375v1.5m0-5.25v5.25m0-5.25C6 5.004 6.504 4.5 7.125 4.5h9.75c.621 0 1.125.504 1.125 1.125m1.125 2.625h1.5m-1.5 0A1.125 1.125 0 0 1 18 7.125v-1.5m1.125 2.625c-.621 0-1.125.504-1.125 1.125v1.5m2.625-2.625c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125M18 5.625v5.25M7.125 12h9.75m-9.75 0A1.125 1.125 0 0 1 6 10.875M7.125 12C6.504 12 6 12.504 6 13.125m0-2.25C6 11.496 5.496 12 4.875 12M18 10.875c0 .621-.504 1.125-1.125 1.125M18 10.875c0 .621.504 1.125 1.125 1.125m-2.25 0c.621 0 1.125.504 1.125 1.125m-12 5.25v-5.25m0 5.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125m-12 0v-1.5c0-.621-.504-1.125-1.125-1.125M18 18.375v-5.25m0 5.25v-1.5c0-.621.504-1.125 1.125-1.125M18 13.125v1.5c0 .621.504 1.125 1.125 1.125M18 13.125c0-.621.504-1.125 1.125-1.125M6 13.125v1.5c0 .621-.504 1.125-1.125 1.125M6 13.125C6 12.504 5.496 12 4.875 12m-1.5 0h1.5m-1.5 0c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125M19.125 12h1.5m0 0c.621 0 1.125.504 1.125 1.125v1.5c0 .621-.504 1.125-1.125 1.125m-17.25 0h1.5m14.25 0h1.5"
                            />
                        </svg>
                        <span
                            className={`text-sm ${
                                IsStatus.anime ? "text-white" : "text-gray-400"
                            }`}
                        >
                            Anime
                        </span>
                    </button>
                    <button
                        type="button"
                        className="inline-flex flex-col items-center justify-center px-2 hover:bg-gray-700"
                        onClick={() => {
                            route.push("/me");
                            setIsType("me");
                        }}
                    >
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                            strokeWidth={1.5}
                            stroke="currentColor"
                            className={`size-6 ${
                                IsStatus.me ? "text-white" : "text-gray-400"
                            }`}
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                d="M15.75 6a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0ZM4.501 20.118a7.5 7.5 0 0 1 14.998 0A17.933 17.933 0 0 1 12 21.75c-2.676 0-5.216-.584-7.499-1.632Z"
                            />
                        </svg>

                        <span
                            className={`text-sm ${
                                IsStatus.me ? "text-white" : "text-gray-400"
                            }`}
                        >
                            Toi
                        </span>
                    </button>
                </div>
            </div>
        </>
    );
};
export default Layout;
