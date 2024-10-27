import { useEffect, useState } from "react";
import PlayerAnime from "../components/Player/PlayerAnime";
import watchAnime from "../services/getWatchAnime";
import { useLocation, useParams } from "react-router";
import { Anime } from "../types/TypeApp";
import { formatView } from "../utils/formatView";
import { useLayout } from "../Layout/LayoutContext";
import formatTimeAnime from "../utils/formatTimeAnime";
import { useIonRouter } from "@ionic/react";
import IntroOutroAnime from "../services/getIntroOutroAnime";

const WatchAnime = () => {
    const { setLoading } = useLayout();
    const location = useLocation();
    const route = useIonRouter();
    const params: { anime: string } = useParams();
    const [isData, setData] = useState<Partial<Anime>>();
    const [isActive, setActive] = useState<boolean>(false);
    const [isIndexEp, setIndexEp] = useState<number>(0);
    const [isDataSkip, setDataSkip] = useState<{
        intro: { start: number; end: number };
        outro: { start: number; end: number };
        nameEp: string
    }>();
    const handlerSetEp = (indexEp: number) => {
        setIndexEp(indexEp);
    };
    const getAnime = async () => {
        setData(await watchAnime(params.anime));
    };
    useEffect(() => {
        getAnime();
    }, []);
    const getSkipAnime = async () => {
        setDataSkip(
            await IntroOutroAnime(
                `https://opend-9animetv.animevsub.eu.org/list-episodes?${[
                    isData?.title,
                    ...(isData?.otherName
                        ?.split(",")
                        .map((name) => name.trim()) ?? []),
                ]
                    .map((item) => `name=${item}`)
                    .join("&")}`,
                isIndexEp
            )
        );
    };
    useEffect(() => {
        if (isData !== undefined) {
            getSkipAnime();
        }
    }, [isData, isIndexEp]);
    useEffect(() => {
        if (isData === undefined) {
            setLoading(true);
        } else {
            setLoading(false);
        }
    }, [isData]);
    return (
        <div className="w-full h-screen">
            {isData !== undefined ? (
                <div
                    className={`w-full h-screen ${
                        isActive ? "" : "overflow-y-auto"
                    } relative overflow-x-hidden`}
                >
                    <div
                        className={`${
                            isActive
                                ? "top-[30%] animate-fade-up"
                                : "top-[-1000px]"
                        } flex flex-col fixed bg-neutral text-white h-screen w-full z-[1000]`}
                    >
                        <div className="flex justify-between h-[50px] w-full items-center p-2 animate-delay-500">
                            <h3>Chi tiết</h3>
                            <button
                                className="hover:bg-[#ffffff23] p-2 rounded-full"
                                onClick={() => {
                                    setActive(false);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-6"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M6 18 18 6M6 6l12 12"
                                    />
                                </svg>
                            </button>
                        </div>
                        <div className="w-full h-[57vh] flex flex-col p-2 overflow-y-auto">
                            <div className="flex justify-center w-full px-2">
                                <img
                                    src={isData.imageSrc}
                                    alt={isData.title}
                                    className="w-44 object-cover h-auto rounded-md"
                                />
                                <div className="p-2 flex flex-col">
                                    <h3>{isData.title}</h3>
                                    <span className="text-sm text-gray-400">
                                        {isData.dateAnime} |{" "}
                                        {isData.country
                                            ?.split(":")[1]
                                            .replace(",", "")}
                                    </span>
                                    <span className="text-sm text-gray-400">
                                        Sản xuất bởi{" "}
                                        {isData.studio?.split(" ")[1].trim()}
                                    </span>
                                </div>
                            </div>
                            <div className="flex flex-col w-[360px] p-2 gap-2">
                                <div>
                                    <span className="text-gray-400 text-sm">
                                        Tên khác:{" "}
                                    </span>
                                    <span>{isData.otherName}</span>
                                </div>
                                <div>
                                    <span className="text-gray-400 text-sm">
                                        Giới thiệu:{" "}
                                    </span>
                                    <span>{isData.description}</span>
                                </div>
                                <div className="w-full">
                                    {(isData.trailer?.length as number) > 0 ? (
                                        <div className="w-full">
                                            <h3 className="text-md">Trailer</h3>
                                            <div className="w-full flex items-center">
                                                <iframe
                                                    src={isData.trailer}
                                                    width={320}
                                                    height={200}
                                                ></iframe>
                                            </div>
                                        </div>
                                    ) : (
                                        <h3>Trailer đang được cập nhật</h3>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                    <PlayerAnime
                        isDataSkip={isDataSkip}
                        Ep={isIndexEp}
                        isData={isData}
                        isEp={{
                            dataId:
                                isData?.listAllEpAnime !== undefined
                                    ? isData.listAllEpAnime[isIndexEp].idEp
                                    : "",
                            dataLink:
                                isData?.listAllEpAnime !== undefined
                                    ? isData.listAllEpAnime[isIndexEp].dataHash
                                    : "",
                            dataPlay:
                                isData?.listAllEpAnime !== undefined
                                    ? isData.listAllEpAnime[isIndexEp].dataPlay
                                    : "",
                        }}
                    />
                    <div className="p-3 flex flex-col">
                        <div className="flex justify-between items-center">
                            <h3 className="text-gray-100">{isData?.title}</h3>
                            <button
                                className="hover:bg-[#ffffff23] p-2 rounded-full"
                                onClick={() => {
                                    setActive(true);
                                }}
                            >
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-4 text-gray-100"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </button>
                        </div>
                        <span className="py-1 text-[14px]">
                            {formatView(
                                Number(isData?.view?.split(",").join(""))
                            )}{" "}
                            lượt xem -{" "}
                            {formatTimeAnime(isData?.showTime?.split(":")[1])}
                        </span>
                        <span className="py-1 text-[14px]">
                            Đã cập nhật tới tập {isData.currentEp}
                        </span>
                        <span className="py-1 text-[14px]">
                            {isData?.averageScore}/10 - {isData?.countRating}{" "}
                            người đã đánh giá -{" "}
                            {isData?.Season?.split(":")[1].split("-")[0].trim()}
                        </span>
                    </div>
                    <div className="py-1 px-2">
                        <div className="text-gray-50 flex justify-between">
                            <h3>Tập</h3>
                            <h3 className="flex items-center gap-1">
                                Trọn bộ
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    className="size-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="m8.25 4.5 7.5 7.5-7.5 7.5"
                                    />
                                </svg>
                            </h3>
                        </div>
                        <div className="flex items-center overflow-x-auto w-screen p-2 text-gray-50 gap-2">
                            {isData.listAllEpAnime?.map((el, i) => (
                                <div
                                    key={i}
                                    className={`border px-3 py-2 rounded hover:border-[#21ba45] ${
                                        i === isIndexEp
                                            ? "text-[#21ba45] border-[#21ba45]"
                                            : "border-gray-200"
                                    }`}
                                    onClick={() => {
                                        handlerSetEp(i);
                                    }}
                                >
                                    {el.nameEp}
                                </div>
                            ))}
                        </div>
                        <div
                            className={`${
                                (isData.allSeason?.length as number) > 0
                                    ? "flex"
                                    : "hidden"
                            } items-center overflow-x-auto w-screen p-2 text-gray-50 gap-2`}
                        >
                            {isData.allSeason?.map((el, i) => (
                                <div
                                    key={i}
                                    className={`border px-3 py-2 rounded hover:border-[#21ba45] whitespace-nowrap ${
                                        location.pathname.split("/")[2] ===
                                        el.href.replace("/", "")
                                            ? "text-[#21ba45] border-[#21ba45]"
                                            : "border-gray-200"
                                    }`}
                                    onClick={() => {
                                        route.push(`/watchanime/${el.href}`);
                                        window.location.reload();
                                    }}
                                >
                                    {el.name}
                                </div>
                            ))}
                        </div>
                        <div className="h-full">
                            <h3 className="py-2 text-gray-50">
                                Phim liên quan
                            </h3>
                            <div className="grid grid-cols-3 gap-2 w-full h-full">
                                {isData.Related?.map((item, i) => (
                                    <div
                                        key={i}
                                        className="flex flex-col w-full h-auto items-center"
                                        onClick={() => {
                                            route.push(
                                                `/watchanime/${item.href}`
                                            );
                                            window.location.reload();
                                        }}
                                    >
                                        <div className="relative">
                                            <img
                                                src={item.image}
                                                alt={item.title}
                                                className="w-full object-cover h-[150px] rounded-md"
                                            />
                                            <div className="absolute top-0 left-0 w-full h-full bg-[#0000004b]"></div>
                                            <h1 className="text-sm absolute bottom-0 w-full z-50 text-white h-[25px] ml-2 rounded-b-md">
                                                {item.tag}
                                            </h1>
                                        </div>
                                        <div className="w-full">
                                            <h3 className="text-[15px] w-full font-[500] two-line">
                                                {item.title}
                                            </h3>
                                        </div>
                                    </div>
                                ))}
                                <div className="h-[50px]"></div>
                            </div>
                        </div>
                    </div>
                </div>
            ) : (
                ""
            )}
        </div>
    );
};
export default WatchAnime;
