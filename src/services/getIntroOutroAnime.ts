import { CapacitorHttp } from "@capacitor/core";
import { Http } from "client-ext-animevsub-helper";
import { getHeader } from "../constant";

const IntroOutroAnime = async (nameAnime: string, indexCurrentEp: number) => {
    const res = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: `https://opend-9animetv.animevsub.eu.org/list-episodes?name=${nameAnime}`,
        responseType: "json",
        headers: getHeader(undefined),
    });
    const id: string[] = [];
    const nameEp: string[]= []
    const data = res.data as { list: { id: string; order: string; title: string }[] };
    data.list.map((el, i) => {
        if (indexCurrentEp + 1 === Number(el.order)) {
            id.push(el.id);
            nameEp.push(el.title)
        }
    });
    const resIntroOutro = await (import.meta.env.DEV
        ? Http
        : CapacitorHttp
    ).get({
        url: `https://opend-9animetv.animevsub.eu.org/episode-skip/${id.join(
            ""
        )}`,
        responseType: "json",
        headers: getHeader(undefined),
    });
    const dataIntroOutro = resIntroOutro.data as {
        intro: { start: number; end: number };
        outro: { start: number; end: number };
    };
    const dataIntroOutros = {
        ...dataIntroOutro,
        nameEp: nameEp.join("")
    }
    return dataIntroOutros;
};
export default IntroOutroAnime;
