import { CapacitorHttp } from "@capacitor/core";
import { Http } from "client-ext-animevsub-helper";
import { getHeader, urlAnime } from "../constant";
import getWatchAnime from "../logic/getWatchAnime";

const watchAnime = async (name: string) => {
    const response = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: `${urlAnime}/phim/${name}`,
        responseType: "text",
        headers: getHeader(undefined),
    });
    return getWatchAnime({ html: response.data });
};
export default watchAnime;
