import { CapacitorHttp } from "@capacitor/core";
import { GetOption, Http } from "client-ext-animevsub-helper";
import { useParams } from "react-router";
import { BaseUrl } from "../constant";
import * as Cheerio from "cheerio";
import { useEffect, useState } from "react";

type listImage = { page: number; image: string };

type DataChapter = {
    title: string;
    chapter: string;
    listImage: listImage[];
};

const Manga = () => {
    const { manga }: { manga: string } = useParams();
    const [DataChapter, setDataChapter] = useState<DataChapter>();
    const [IsLoading, setIsLoading] = useState<boolean>(false);
    const GetChapter = async () => {
        setIsLoading(true);
        if (manga) {
            const chapter = manga.split("-")[manga.split("-").length - 2];
            const chapterId = manga.split("-")[manga.split("-").length - 1];
            const nameUrl = manga.slice(0, manga.search(chapter) - 1);
            const opt: GetOption = {
                url: `https://nettruyenaa.com/truyen-tranh/${nameUrl}/chapter-${chapter}/${chapterId}`,
                headers: {
                    referer: BaseUrl,
                },
            };
            const linkChapterManga = await (import.meta.env.DEV
                ? Http
                : CapacitorHttp
            ).get(opt);
            if (linkChapterManga.status === 200) {
                setIsLoading(false);
            }
            const ListImage: listImage[] = [];
            const $ = Cheerio.load(linkChapterManga.data);
            const name = $(".top").find(".txt-primary").find("a").text();
            $(".page-chapter")
                .find("img")
                .each((i, el) => {
                    ListImage.push({
                        page: i,
                        image: el.attribs["data-src"],
                    });
                });
            setDataChapter({
                title: name,
                chapter: `Chap ${chapter}`,
                listImage: ListImage,
            });
        }
    };
    useEffect(() => {
        GetChapter();
    }, []);
    return (
        <main className="relative">
            {IsLoading ? (
                <span className="loading loading-infinity w-[100px] absolute top-1/2 left-[45%]"></span>
            ) : (
                ""
            )}
            {DataChapter ? (
                <div className="flex items-center flex-col h-screen overflow-y-auto">
                    <h3 className="text-xl mt-4">
                        {DataChapter.title} - {DataChapter.chapter}
                    </h3>
                    <div className="flex w-auto h-auto flex-col">
                        {DataChapter.listImage.map((el, i) => (
                            <img
                                key={i}
                                src={el.image}
                                alt={`${el.page}`}
                                className="w-auto h-auto"
                            />
                        ))}
                    </div>
                </div>
            ) : (
                ""
            )}
        </main>
    );
};
export default Manga;
