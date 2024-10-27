import { CapacitorHttp } from "@capacitor/core";
import { Http } from "client-ext-animevsub-helper";
import { getHeader, urlAnime } from "../constant";
import getAnimeHome from "../logic/getAnimeHome";

const AnimeHome = async () => {
    const response = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: urlAnime,
        responseType: "text",
        headers: getHeader(undefined),
    });
    return { data: getAnimeHome(response.data) };
};
export default AnimeHome;