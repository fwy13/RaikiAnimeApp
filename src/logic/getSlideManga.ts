import * as Cheerio from "cheerio";
import { cutHttpAndHostName } from "../utils/cutHttpAndHostName";
import { DataSlide } from "../types/TypeApp";

const getSlideManga = async ({ html }: { html: string }) => {
    const DataManga: DataSlide[] = [];
    const $ = Cheerio.load(html);
    $(".item").each((i, el) => {
        if (i < 20) {
            const image = $("img", el).attr("src") ?? "";
            const href =
                cutHttpAndHostName({ url: $("a", el).attr("href") }) ?? "";
            const title = $(".slide-caption", el).find("h3").text();
            const newChap = $(".slide-caption", el)
                .find("a")
                .text()
                .split("  ")[1];
            const timeLastUpdate = $(".slide-caption", el).find("span").text();
            DataManga.push({
                title: title,
                href: href,
                image: image,
                newChap: newChap,
                timeLastUpdate: timeLastUpdate,
            });
        }
    });
    return DataManga;
};
export default getSlideManga;
