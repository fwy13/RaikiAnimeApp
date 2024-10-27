import { CapacitorHttp } from "@capacitor/core";
import { BaseUrl, getHeader } from "../constant";
import getHotManga from "../logic/getHotManga";
import { Http } from "client-ext-animevsub-helper";

const getPageManga = async () => {
    const Response = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: BaseUrl,
        responseType: "text",
        headers: getHeader(undefined),
    });
    const Data = getHotManga({ html: Response.data });
    return { data: Data };
};
export default getPageManga;
