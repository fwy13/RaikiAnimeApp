import { CapacitorHttp, HttpResponse } from "@capacitor/core";
import { Http } from "client-ext-animevsub-helper";
import { BaseUrl, getChapter } from "../constant";
import * as Cheerio from "cheerio";
import { DataChapters, DataManga, typeManga } from "../types/typeManga";
import { Dispatch, SetStateAction } from "react";

const GetInfoManga = async ({
    url,
    setDataManga,
    setIsLoading,
    setError,
    setImage,
}: {
    url: string;
    setDataManga: Dispatch<SetStateAction<DataManga | undefined>>;
    setIsLoading: Dispatch<SetStateAction<boolean>>;
    setError: Dispatch<SetStateAction<boolean>>;
    setImage: Dispatch<SetStateAction<string | undefined>>;
}) => {
    const comicId = url.split("-")[url.split("-").length - 1];
    const DataChapter: DataChapters = await (import.meta.env.DEV
        ? Http
        : CapacitorHttp
    )
        .get({
            url: `${getChapter}${comicId}`,
            responseType: "json",
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
        })
        .then((data) => {
            return data.data;
        });
    const opt = {
        url: `${BaseUrl}/truyen-tranh/${url}`,
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
    const searchComicId: number | any = url?.search(comicId ?? "");
    const imageSrc = url?.slice(0, searchComicId - 1);
    setImage(imageSrc);
    const titleManga = $(".title-detail").text();
    if (titleManga.length === 0) {
        setIsLoading(false);
        setError(true);
    }
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
    //     // const blob = new Blob([ResponseImg.data]);
    //     // console.log(arrayBufferToBase64(ResponseImg.data))
    //     // const url = URL.createObjectURL(blob);
    //     setImage(arrayBufferToBase64(ResponseImg.data));
    // }

    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate: number | any = new Date();
    const secondDate: number | any = new Date(
        Number(timeUpdate[3].split("-")[0]),
        Number(timeUpdate[3].split("-")[1]),
        Number(timeUpdate[3].split("-")[2])
    );
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
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
};
export default GetInfoManga;
