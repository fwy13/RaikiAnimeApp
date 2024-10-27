import { CapacitorHttp } from "@capacitor/core";
import { Http } from "client-ext-animevsub-helper";
import { getHeader, urlAnime } from "../constant";
import getHotAnime from "../logic/getHotAnime";

const HotAnime = async () => {
    const reponse = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: urlAnime,
        responseType: "text",
        headers: getHeader(undefined),
    });
    return {
        data: getHotAnime(reponse.data),
    };
};
export default HotAnime;
