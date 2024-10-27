import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import FramerMotion from "../components/FramerMotion";
import Chapter from "../services/getChapter";
import { imageWithProxy } from "../utils/imageWithProxy";
import { useLayout } from "../Layout/LayoutContext";
import { useIonRouter } from "@ionic/react";
import getChaptersManga from "../logic/getChaptersManga";
import {
    DataChapters,
    listImage,
    Chapter as typeChapter,
} from "../types/TypeApp";

const Watch = () => {
    const route = useIonRouter();
    const { setisHidden, setLoading } = useLayout();
    const params: { manga: string; chapter: string; chap: string } =
        useParams();
    const [IsChapters, setIsChapters] = useState<typeChapter[]>([]);
    const listImage = useRef<HTMLElement>();
    const useModal = useRef<HTMLDialogElement | any>();
    const [IsPercentPage, setIsPercentPage] = useState<number>(0);
    const [IsCurrentPage, setIsCurrentPage] = useState<number>(0);
    const [IsLoading, setIsLoading] = useState<boolean>(true);
    const [IsControl, setIsControl] = useState<boolean>(true);
    const [IsDataChapter, setIsDataChapter] = useState<{
        title: string;
        chapter: string;
        listImage: listImage[];
        listChapter: DataChapters;
        nextAndpreChap: {
            preChap: string | undefined;
            preHref: string | undefined;
            nextChap: string | undefined;
            nextHref: string | undefined;
        }[];
    }>();
    const getChapter = async () => {
        const { data } = await Chapter({
            manga: params.manga,
            chapter: params.chapter,
            chapterId: params.chap,
        });
        setIsDataChapter(await data);
    };
    const scrollHandle = () => {
        const scrollDistance = Math.abs(
            listImage.current?.getBoundingClientRect().top as number
        );
        const progressPercentage =
            (scrollDistance /
                ((listImage.current?.getBoundingClientRect().height as number) -
                    document.documentElement.clientHeight)) *
            100;
        const lengthPage = IsDataChapter?.listImage.length ?? 0;
        const currentPage = Math.floor(
            (lengthPage * Math.floor(progressPercentage)) / 100
        );
        setIsCurrentPage(currentPage);
        setIsPercentPage(Math.floor(progressPercentage));
    };
    useEffect(() => {
        getChaptersManga({
            comicId: localStorage.getItem("comicId") ?? "",
        }).then((data) => {
            setIsChapters(data.chapters);
        });
        getChapter();
    }, []);
    useEffect(() => {
        if(IsLoading) {
            setLoading(true)
        } else {
            setLoading(false)
        }
    }, [IsLoading])
    return (
        <main className="relative h-full">
            {IsDataChapter ? (
                <FramerMotion style={{ width: "100%", height: "100%" }}>
                    <dialog ref={useModal} className="modal">
                        <div className="modal-box h-[70%] rounded">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-lg text-gray-200">
                                    Danh sách chương
                                </h3>
                                <form method="dialog">
                                    <button className="btn btn-circle bg-transparent border-transparent hover:border-transparent">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-8 text-white"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                    </button>
                                </form>
                            </div>
                            <div className="flex flex-col gap-2 h-full p-2">
                                {IsChapters.map((el, i) => (
                                    <div
                                        onClick={() => {
                                            route.push(`/watch/${el.url}`);
                                            window.location.reload();
                                        }}
                                        className="cursor-pointer text-gray-100 border-b border-gray-600 flex justify-between items-center"
                                        key={i}
                                    >
                                        <span>{el.name}</span>
                                        <button className="btn bg-transparent btn-circle hover:text-white border-transparent hover:border-transparent">
                                            <svg
                                                xmlns="http://www.w3.org/2000/svg"
                                                viewBox="0 0 24 24"
                                                fill="currentColor"
                                                className="size-6"
                                            >
                                                <path
                                                    fillRule="evenodd"
                                                    d="M12 2.25a.75.75 0 0 1 .75.75v11.69l3.22-3.22a.75.75 0 1 1 1.06 1.06l-4.5 4.5a.75.75 0 0 1-1.06 0l-4.5-4.5a.75.75 0 1 1 1.06-1.06l3.22 3.22V3a.75.75 0 0 1 .75-.75Zm-9 13.5a.75.75 0 0 1 .75.75v2.25a1.5 1.5 0 0 0 1.5 1.5h13.5a1.5 1.5 0 0 0 1.5-1.5V16.5a.75.75 0 0 1 1.5 0v2.25a3 3 0 0 1-3 3H5.25a3 3 0 0 1-3-3V16.5a.75.75 0 0 1 .75-.75Z"
                                                    clipRule="evenodd"
                                                />
                                            </svg>
                                        </button>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </dialog>
                    <div
                        className={`flex items-center flex-col h-screen overflow-y-auto`}
                        onScroll={scrollHandle}
                    >
                        <section
                            className="flex w-auto h-auto flex-col"
                            ref={listImage as any}
                            onClick={() => {
                                setIsControl(!IsControl);
                            }}
                        >
                            {IsDataChapter.listImage.map((el, i) => (
                                <img
                                    key={i}
                                    src={imageWithProxy(el.image)}
                                    alt={`${el.page}`}
                                    className="w-auto h-auto"
                                    onLoad={() => {
                                        setisHidden(true);
                                        setIsLoading(false);
                                    }}
                                />
                            ))}
                        </section>
                        <div
                            className={`fixed ${
                                IsControl ? "flex" : "hidden"
                            } top-0 w-full h-auto hero-overlay animate-fade-down animate-ease-in-out items-center p-1`}
                        >
                            <button
                                className="btn btn-circle bg-transparent border-transparent hover:bg-[#0000001f] hover:border-transparent"
                                onClick={() => {
                                    const currentManga =
                                        localStorage.getItem("currentManga");
                                    route.push(
                                        currentManga ?? "".split("-").length > 0
                                            ? `/manga/${currentManga}`
                                            : "/"
                                    );
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6 font-bold text-white"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                    />
                                </svg>
                            </button>
                            <div className="flex flex-col text-white font-bold w-full">
                                <h2 className="text-md two-line">
                                    {IsDataChapter.title}
                                </h2>
                                <span>{IsDataChapter.chapter.slice(1)}</span>
                            </div>
                            <div className="flex justify-end w-full">
                                <button
                                    onClick={() => {
                                        useModal.current.showModal();
                                    }}
                                    className="btn btn-circle bg-transparent border-transparent hover:bg-[#0000001f] hover:border-transparent"
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="size-8 text-white"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M2.625 6.75a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0A.75.75 0 0 1 8.25 6h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75ZM2.625 12a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0ZM7.5 12a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12A.75.75 0 0 1 7.5 12Zm-4.875 5.25a1.125 1.125 0 1 1 2.25 0 1.125 1.125 0 0 1-2.25 0Zm4.875 0a.75.75 0 0 1 .75-.75h12a.75.75 0 0 1 0 1.5h-12a.75.75 0 0 1-.75-.75Z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>
                        <div
                            className={`fixed z-10 bottom-0 justify-center items-center gap-4 left-0 w-full p-1 h-auto animate-fade-up animate-ease-in-out ${
                                IsControl ? "flex" : "hidden"
                            }`}
                        >
                            <button
                                className="btn btn-circle overlay border-transparent hover:bg-[#0000001f] hover:border-transparent"
                                disabled={
                                    IsDataChapter.nextAndpreChap[0].preHref !==
                                    undefined
                                        ? false
                                        : true
                                }
                                onClick={() => {
                                    route.push(
                                        `/watch/${IsDataChapter.nextAndpreChap[0].preHref}`
                                    );
                                    window.location.reload();
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6 text-white"
                                >
                                    <path d="M9.195 18.44c1.25.714 2.805-.189 2.805-1.629v-2.34l6.945 3.968c1.25.715 2.805-.188 2.805-1.628V8.69c0-1.44-1.555-2.343-2.805-1.628L12 11.029v-2.34c0-1.44-1.555-2.343-2.805-1.628l-7.108 4.061c-1.26.72-1.26 2.536 0 3.256l7.108 4.061Z" />
                                </svg>
                            </button>
                            <div
                                className="w-[70%] rounded-md p-2 hero-overlay flex items-center justify-center gap-4 text-white"
                                onClick={() => {
                                    console.log(
                                        listImage.current?.getBoundingClientRect()
                                            .top
                                    );
                                    listImage.current?.scrollTo({
                                        top: -2766.363525390625,
                                    });
                                }}
                            >
                                <span
                                    className={`${
                                        IsPercentPage <= 40
                                            ? "text-error"
                                            : IsPercentPage <= 70
                                            ? "text-warning"
                                            : "text-success"
                                    } font-bold`}
                                >
                                    {IsPercentPage < 10
                                        ? `0${IsPercentPage}`
                                        : IsPercentPage}
                                    %
                                </span>
                                <progress
                                    className={`progress ${
                                        IsPercentPage <= 40
                                            ? "progress-error"
                                            : IsPercentPage <= 70
                                            ? "progress-warning"
                                            : "progress-success"
                                    } w-full`}
                                    value={IsPercentPage}
                                    max="100"
                                ></progress>
                                <span className="font-bold">
                                    {IsCurrentPage < 10
                                        ? `0${IsCurrentPage}`
                                        : IsCurrentPage}
                                    /{IsDataChapter.listImage.length}
                                </span>
                            </div>
                            <button
                                className="btn btn-circle overlay border-transparent hover:bg-[#0000001f] hover:border-transparent"
                                disabled={
                                    IsDataChapter.nextAndpreChap[0].nextHref !==
                                    undefined
                                        ? false
                                        : true
                                }
                                onClick={() => {
                                    route.push(
                                        `/watch/${IsDataChapter.nextAndpreChap[0].nextHref}`
                                    );
                                    window.location.reload();
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    viewBox="0 0 24 24"
                                    fill="currentColor"
                                    className="size-6 text-white"
                                >
                                    <path d="M5.055 7.06C3.805 6.347 2.25 7.25 2.25 8.69v8.122c0 1.44 1.555 2.343 2.805 1.628L12 14.471v2.34c0 1.44 1.555 2.343 2.805 1.628l7.108-4.061c1.26-.72 1.26-2.536 0-3.256l-7.108-4.061C13.555 6.346 12 7.249 12 8.689v2.34L5.055 7.061Z" />
                                </svg>
                            </button>
                        </div>
                    </div>
                </FramerMotion>
            ) : (
                ""
            )}
        </main>
    );
};
export default Watch;
