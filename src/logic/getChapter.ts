import { GetOption, Http } from "client-ext-animevsub-helper";
import { BaseUrl } from "../constant";
import { CapacitorHttp } from "@capacitor/core";
import * as Cheerio from "cheerio";
import { DataChapter, listImage } from "../types/typeManga";
import { Dispatch, SetStateAction } from "react";

const getChapter = async ({
    nameManga,
    chapter,
    chapterId,
    setIsLoading,
    setDataChapter,
}: {
    nameManga: string;
    chapter: number | string;
    chapterId: string;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setDataChapter: Dispatch<SetStateAction<DataChapter | undefined>>;
}) => {
    setIsLoading(true);
    if (nameManga && chapter && chapterId) {
        const opt: GetOption = {
            url: `https://nettruyenaa.com/truyen-tranh/${nameManga}/${chapter}/${chapterId}`,
            headers: {
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
export default getChapter;
