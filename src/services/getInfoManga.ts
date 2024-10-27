import getChaptersManga from "../logic/getChaptersManga";
import GetInfoManga from "../logic/getInfoManga";
import { CapacitorHttp } from "@capacitor/core";
import { BaseUrl, getHeader } from "../constant";
import { Http } from "client-ext-animevsub-helper";

const InfoManga = async (url: string) => {
    const response = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: `${BaseUrl}/truyen-tranh/${url}`,
        responseType: "text",
        headers: getHeader(undefined),
    });
    const comicId = url.split("-")[url.split("-").length - 1];
    const chapters = await getChaptersManga({ comicId: comicId });
    const Data = GetInfoManga({
        html: response.data,
        DataChapter: chapters,
    });
    return { data: Data };
};
export default InfoManga;
