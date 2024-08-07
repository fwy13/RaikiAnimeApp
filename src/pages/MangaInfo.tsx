import React, { useEffect, useState } from "react";
import GetInfoManga from "../logic/getInfoManga";
import { DataManga } from "../types/typeManga";
import { Link } from "react-router-dom";
import { useParams } from "react-router";
import FramerMotion from "../components/FramerMotion";

const MangaInfo = () => {
    const params = useParams();
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const [Error, setError] = useState<boolean>(false);
    const [DataManga, setDataManga] = useState<DataManga>();
    const [Image, setImage] = useState<string>();
    const { name }: any = params;
    useEffect(() => {
        GetInfoManga({
            url: name ? name : "",
            setDataManga: setDataManga,
            setIsLoading: setIsLoading,
            setError: setError,
            setImage: setImage,
        });
    }, []);
    return (
        <>
            {DataManga && !IsLoading ? (
                <FramerMotion style={{ position: "relative", height: "100%" }}>
                    <div className="flex flex-col gap-4 p-4 h-full">
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
                                {DataManga.viewManga.length > 0 ? (
                                    <span className="mt-1 text-gray-500">
                                        {DataManga.viewManga} lượt xem
                                    </span>
                                ) : (
                                    ""
                                )}
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
                                    {DataManga.status
                                        ? DataManga.status
                                        : "Không xác định"}
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
                        <div className="grid grid-cols-2 md:grid-cols-3 gap-2 max-h-1/2 overflow-y-auto">
                            {DataManga.chapters.map((el, i) => (
                                <Link
                                    to={`/watch/${el.url.split("/")[2]}/${el.url
                                        .split("/")[3]}/${el.url.split("/")[4]}`}
                                    key={i}
                                >
                                    <div className="p-2 border border-rose-500 text-rose-500 text-center">
                                        {el.name}
                                    </div>
                                </Link>
                            ))}
                        </div>
                    </div>
                </FramerMotion>
            ) : (
                <div className="flex items-center justify-center h-full flex-col">
                    <span className="loader"></span>
                    <span className="text-gray-600">Loading...</span>
                </div>
            )}
        </>
    );
};
export default MangaInfo;
