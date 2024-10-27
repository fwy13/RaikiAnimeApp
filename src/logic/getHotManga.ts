import * as Cheerio from "cheerio";
import { cutHttpAndHostName } from "../utils/cutHttpAndHostName";
import { MangaHot } from "../types/TypeApp";

const getHotManga = async ({ html }: { html: string }) => {
    const $ = Cheerio.load(html);
    const MangaHots: MangaHot[] = [];
    $("#ctl00_divCenter")
        .find(".items")
        .find(".item")
        .each((index, el) => {
            const sourceImage = $("img", el).attr("src") ?? "";
            const title = $("h3", el).find("a").text();
            const href =
                cutHttpAndHostName({
                    url: $("h3", el).find("a").attr("href"),
                }) ?? "";
            const Element = $("div", el).find(".pull-left").text().split("  ");
            const view = Element[1];
            const comment = Element[2];
            const Like = Element[3];
            const List: { chapter: string; time: string }[] = [];
            $("figcaption", el)
                .find("li")
                .each((i, el) => {
                    const chapter = $("a", el).text();
                    const time = $("i", el).text();
                    List.push({ chapter: chapter, time: time });
                });
            MangaHots.push({
                title: title,
                href: href,
                image: sourceImage,
                view: view,
                comment: comment,
                like: Like,
                newChapter: List[0].chapter,
                timeUpdateNewChap: List[0].time,
            });
        });
    return { MangaHots };
};
export default getHotManga;
