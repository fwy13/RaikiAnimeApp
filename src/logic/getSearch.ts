import * as Cheerio from "cheerio";
import { cutHttpAndHostName } from "../utils/cutHttpAndHostName";
import { MangaSearch } from "../types/TypeApp";

const getSearch = async ({ html }: { html: string }) => {
    const $ = Cheerio.load(html);
    const MangaSearch: MangaSearch[] = [];
    $("#ctl00_divCenter")
        .find(".items")
        .find(".item")
        .each((i, el) => {
            const sourceImage = $("img", el).attr("src");
            const title = $("h3", el).find("a").text();
            const idComic = $(".box_tootip", el).attr("id")?.split("-")[2]
            const href = cutHttpAndHostName({
                url: $("h3", el).find("a").attr("href"),
            });
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
            MangaSearch.push({
                title: title,
                href: `${href}-${idComic}` ?? "",
                image: sourceImage ?? "",
                view: view,
                comment: comment,
                like: Like,
                newChapter: List[0].chapter,
                timeUpdateNewChap: List[0].time,
            });
        });
    return MangaSearch;
};
export default getSearch;