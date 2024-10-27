import { CapacitorHttp } from "@capacitor/core";
import { Http } from "client-ext-animevsub-helper";
import { getHeader } from "../constant";
import * as Cheerio from "cheerio";
import { listEpAnime } from "../types/TypeApp";

const getAllEpAnime = async (urlLastestAnime: string) => {
    const listEpAnime: Partial<listEpAnime>[] = [];
    const response = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: urlLastestAnime,
        responseType: "text",
        headers: getHeader(undefined),
    });
    const $ = Cheerio.load(response.data);
    $(".list-episode")
        .find("li")
        .find("a")
        .each((i, el) => {
            const idEp = $(el).attr("data-id");
            const href = $(el).attr("href") ?? "";
            const dataPlay = $(el).attr("data-play");
            const dataMovie = $(el).attr("data-movie");
            const dataSource = $(el).attr("data-source");
            const dataHash = $(el).attr("data-hash");
            const nameEp = $(el).text();
            listEpAnime.push({
                idEp,
                href,
                dataPlay,
                dataMovie,
                dataSource,
                dataHash,
                nameEp,
            });
        });
    return listEpAnime;
};
export default getAllEpAnime;
