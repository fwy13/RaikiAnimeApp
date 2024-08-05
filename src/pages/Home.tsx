import { useRef, useState } from "react";
import * as Cheerio from "cheerio";

import { BaseUrl, getChapter } from "../constant";
import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import { GetOption, Http } from "client-ext-animevsub-helper";
import { Link } from "react-router-dom";

// const MangaSupported = ["nettruyen"];

type DataManga = {
    title: string;
    image?: string;
    timeLastUpdate: string;
    author: string;
    status: string;
    otherName: string;
    viewManga: string;
    Rating: string;
    ratingCount: string;
    follower: string;
    typeManga: typeManga[];
    chapters: Chapter[];
};

type DataChapter = {
    chapters: Chapter[];
    success: boolean;
};

type Chapter = {
    chapterId: number;
    name: string;
    url: string;
};

type typeManga = { urlType: string; nameType: string };

const Home = () => {
    const useInput = useRef<HTMLInputElement | null>(null);
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);
    const [ErrorUrl, setErrorUrl] = useState<boolean>(false);
    const [DataManga, setDataManga] = useState<DataManga>();
    const [Image, setImage] = useState<any>();

    const checkValue = (value: string | undefined) => {
        if (typeof value === "string") {
            if (value.search("http://") >= 0 || value.search("https://") >= 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const Read = async () => {
        const url = useInput.current?.value;
        if (url !== "") {
            setIsLoading(true);
            if (checkValue(url)) {
                setErrorUrl(false);
                // Url ori https://nettruyenaa.com/truyen-tranh/anh-muon-duoc-o-ben-me-em-24934
                const newLink = url?.slice(8).split("/")[2]; // Delete "https://" and get "anh-muon-duoc-o-ben-me-em-24934"
                const comicId =
                    newLink?.split("-")[newLink?.split("-").length - 1];

                const DataChapter: DataChapter = await (import.meta.env.DEV
                    ? Http
                    : CapacitorHttp
                )
                    .get({
                        url: `${getChapter}${comicId}`,
                        responseType: "json",
                        headers: {
                            accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                            // "accept-encoding": "deflate, br",
                            "accept-language":
                                "vi-VN,vi;q=0.9,en;q=0.8,ja;q=0.7",
                            "cache-control": "max-age=0",
                            dnt: "1",
                            "sec-ch-ua":
                                '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
                            "sec-ch-ua-mobile": "?0",
                            "sec-ch-ua-platform": "Windows",
                            "sec-fetch-dest": "document",
                            "sec-fetch-mode": "navigate",
                            "sec-fetch-site": "none",
                            "sec-fetch-user": "?1",
                            "sec-gpc": "1",
                            "upgrade-insecure-requests": "1",
                            "user-agent":
                                "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                            referer: BaseUrl,
                        },
                    })
                    .then((data) => {
                        return data.data;
                    });
                const opt = {
                    url: `${BaseUrl}/truyen-tranh/${newLink}`,
                    header: {
                        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
                        // "accept-encoding": "deflate, br",
                        "accept-language": "vi-VN,vi;q=0.9,en;q=0.8,ja;q=0.7",
                        "cache-control": "max-age=0",
                        dnt: "1",
                        "sec-ch-ua":
                            '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
                        "sec-ch-ua-mobile": "?0",
                        "sec-ch-ua-platform": "Windows",
                        "sec-fetch-dest": "document",
                        "sec-fetch-mode": "navigate",
                        "sec-fetch-site": "none",
                        "sec-fetch-user": "?1",
                        "sec-gpc": "1",
                        "upgrade-insecure-requests": "1",
                        "user-agent":
                            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
                        referer: BaseUrl,
                    },
                };
                const res = await (import.meta.env.DEV ? Http : CapacitorHttp)
                    .get(opt)
                    .then((data: HttpResponse) => {
                        return data;
                    });
                if (res.status === 200) {
                    setIsLoading(false);
                    setError(false);
                } else {
                    setIsLoading(false);
                    setError(true);
                }
                const $ = Cheerio.load(res.data);
                const imageManga = $(".col-image").find("img").attr("src");
                const searchComicId: number | any = newLink?.search(
                    comicId ?? ""
                );
                const imageSrc = newLink?.slice(0, searchComicId - 1);
                setImage(imageSrc);
                const titleManga = $(".title-detail").text();
                const timeUpdate = $("#item-detail")
                    .find(".small")
                    .text()
                    .split("]")[0]
                    .slice(2)
                    .split(" ");
                const author = $(".author").find(".col-xs-8").text();
                const status = $(".status").find(".col-xs-8").text();
                const othername = $(".other-name").text();
                const typeManga: typeManga[] = [];
                $(".kind")
                    .find("a")
                    .each((i, el: any) => {
                        const url = el.attribs.href;
                        const name = el.children[0].data;
                        typeManga.push({
                            nameType: name,
                            urlType: url,
                        });
                    });
                const viewArr: string[] = [];
                $(".list-info")
                    .find("li")
                    .each((i, el) => {
                        const checkView = $(".name", el).text();
                        if (checkView === "   Lượt xem ") {
                            viewArr.push($(".col-xs-8", el).text());
                        }
                    });
                const view = viewArr.join();
                const ratingValue = $("[itemprop=ratingValue]").text();
                const bestRating = $("[itemprop=bestRating]").text();
                const ratingCount = $("[itemprop=ratingCount]").text();
                const follow = $(".number_follow").text();
                // if (imageManga) {
                //     const optImage: GetOption = {
                //         url: imageManga,
                //         responseType: "arraybuffer",
                //         headers: {
                //             referer: BaseUrl,
                //         },
                //     };
                //     const ResponseImg = await (import.meta.env.DEV
                //         ? Http
                //         : CapacitorHttp
                //     ).get(optImage);
                //     const blob = new Blob([ResponseImg.data]);
                //     const url = URL.createObjectURL(blob);
                //     setImage(url);
                // }

                const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
                const firstDate: number | any = new Date();
                const secondDate: number | any = new Date(
                    Number(timeUpdate[3].split("-")[0]),
                    Number(timeUpdate[3].split("-")[1]),
                    Number(timeUpdate[3].split("-")[2])
                );
                const diffDays = Math.round(
                    Math.abs((firstDate - secondDate) / oneDay)
                );
                console.log({ timeUpdate });
                setDataManga({
                    title: titleManga,
                    image: imageManga,
                    timeLastUpdate: `${diffDays}`,
                    author: author,
                    status: status,
                    otherName: othername,
                    viewManga: view,
                    Rating: `${ratingValue}/${bestRating}`,
                    ratingCount: ratingCount,
                    follower: follow,
                    typeManga: typeManga,
                    chapters: DataChapter.success ? DataChapter.chapters : [],
                });
            } else {
                setErrorUrl(true);
            }
        } else {
            useInput.current?.focus();
        }
    };
    return (
        <main className="mt-5 p-3 gap-2 flex flex-col overflow-y-auto h-[calc(100vh)]">
            <span className="p-1 text-xl text-red-500">Raiki Manga</span>
            <label className="input input-bordered flex items-center mt-3">
                <input
                    type="text"
                    className="grow"
                    ref={useInput}
                    placeholder="Paste url manga."
                />
            </label>
            <button className="btn btn-success text-white" onClick={Read}>
                Read
            </button>
            <div className="flex justify-center items-center flex-col">
                {ErrorUrl ? (
                    <div className="toast toast-center toast-middle">
                        <div className="alert alert-warning text-white rounded-md">
                            <span>Url valid!</span>
                            <span>Now, only support manga for nettruyen!</span>
                        </div>
                    </div>
                ) : IsLoading ? (
                    <span className="loading loading-spinner text-accent loading-lg"></span>
                ) : Error ? (
                    <span className="text-error">Loading data error!</span>
                ) : !DataManga && !IsLoading ? (
                    ""
                ) : (
                    <span className="text-success">Loading data success!</span>
                )}
                {DataManga ? (
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-4">
                            <img
                                src={
                                    DataManga.image
                                        ? DataManga.image
                                        : `https://cmnvymn.com/nettruyen/thumb/${Image}.jpg`
                                }
                                alt={DataManga.title}
                                onLoad={() => {
                                    setIsLoading(false);
                                }}
                                className="rounded-md w-1/3 h-auto"
                            />

                            <div className="flex flex-col gap-2">
                                <h2 className="text-xl">{DataManga.title}</h2>
                                <span className="mt-1 text-gray-500">
                                    {DataManga.viewManga} lượt xem
                                </span>
                                <h3 className="flex gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 text-error"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M3.75 3v11.25A2.25 2.25 0 0 0 6 16.5h2.25M3.75 3h-1.5m1.5 0h16.5m0 0h1.5m-1.5 0v11.25A2.25 2.25 0 0 1 18 16.5h-2.25m-7.5 0h7.5m-7.5 0-1 3m8.5-3 1 3m0 0 .5 1.5m-.5-1.5h-9.5m0 0-.5 1.5m.75-9 3-3 2.148 2.148A12.061 12.061 0 0 1 16.5 7.605"
                                        />
                                    </svg>
                                    {DataManga.status}
                                </h3>
                                <h3 className="flex gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 text-info"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                        />
                                    </svg>
                                    {DataManga.timeLastUpdate} ngày trước
                                </h3>
                                <h3 className="flex gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 text-warning"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M11.48 3.499a.562.562 0 0 1 1.04 0l2.125 5.111a.563.563 0 0 0 .475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 0 0-.182.557l1.285 5.385a.562.562 0 0 1-.84.61l-4.725-2.885a.562.562 0 0 0-.586 0L6.982 20.54a.562.562 0 0 1-.84-.61l1.285-5.386a.562.562 0 0 0-.182-.557l-4.204-3.602a.562.562 0 0 1 .321-.988l5.518-.442a.563.563 0 0 0 .475-.345L11.48 3.5Z"
                                        />
                                    </svg>
                                    {DataManga.Rating} - {DataManga.ratingCount}{" "}
                                    lượt đánh giá
                                </h3>
                                <h3 className="flex gap-2">
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        strokeWidth={1.5}
                                        stroke="currentColor"
                                        className="size-6 text-success"
                                    >
                                        <path
                                            strokeLinecap="round"
                                            strokeLinejoin="round"
                                            d="M17.593 3.322c1.1.128 1.907 1.077 1.907 2.185V21L12 17.25 4.5 21V5.507c0-1.108.806-2.057 1.907-2.185a48.507 48.507 0 0 1 11.186 0Z"
                                        />
                                    </svg>
                                    {DataManga.follower} người theo dõi
                                </h3>
                            </div>
                        </div>
                        <div className="flex gap-2 ">
                            <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="none"
                                viewBox="0 0 24 24"
                                strokeWidth={1.5}
                                stroke="currentColor"
                                className="size-6 text-gray-700"
                            >
                                <path
                                    strokeLinecap="round"
                                    strokeLinejoin="round"
                                    d="M12 3c2.755 0 5.455.232 8.083.678.533.09.917.556.917 1.096v1.044a2.25 2.25 0 0 1-.659 1.591l-5.432 5.432a2.25 2.25 0 0 0-.659 1.591v2.927a2.25 2.25 0 0 1-1.244 2.013L9.75 21v-6.568a2.25 2.25 0 0 0-.659-1.591L3.659 7.409A2.25 2.25 0 0 1 3 5.818V4.774c0-.54.384-1.006.917-1.096A48.32 48.32 0 0 1 12 3Z"
                                />
                            </svg>
                            <div className="inline-block">
                                {DataManga.typeManga.map((el, i) => (
                                    <div
                                        className="m-1 badge badge-outline cursor-pointer"
                                        key={i}
                                    >
                                        {el.nameType}
                                    </div>
                                ))}
                            </div>
                        </div>
                        <div className="grid grid-cols-4 grid-rows-3 gap-2">
                            {DataManga.chapters.map((el, i) => (
                                <Link to={`${el.url.split("/")[2]}-${el.url.split("/")[3].slice(8)}-${el.url.split("/")[4]}`} key={i}>
                                    <div className="p-2 border border-rose-500 text-rose-500 text-center">
                                        {el.name}
                                        
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </div>
        </main>
    );
};

export default Home;
