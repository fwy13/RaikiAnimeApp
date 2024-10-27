import { BaseUrl, getHeader } from "../constant";
import { CapacitorHttp } from "@capacitor/core";
import getChapter from "../logic/getChapter";
import { Http } from "client-ext-animevsub-helper";

const Chapter = async ({
    manga,
    chapter,
    chapterId,
}: {
    manga: string;
    chapter: string;
    chapterId: string;
}) => {
    const response = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: `${BaseUrl}/truyen-tranh/${manga}/${chapter}/${chapterId}`,
        responseType: "text",
        headers: getHeader(undefined),
    });
    return {
        data: getChapter(
            response.data,
            localStorage.getItem("comicId") ?? "",
            chapterId
        ),
    };
};
export default Chapter;
