import { CapacitorHttp } from "@capacitor/core";
import { BaseUrl, getHeader } from "../constant";
import getSlideManga from "../logic/getSlideManga";
import { Http } from "client-ext-animevsub-helper";

const getMangaHome = async () => {
    const response = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: BaseUrl,
        responseType: "text",
        headers: getHeader(undefined),
    });
    const Data = getSlideManga({ html: response.data });
    return { data: Data };
};
export default getMangaHome;
