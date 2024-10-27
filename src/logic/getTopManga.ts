import * as Cheerio from "cheerio";
import { cutHttpAndHostName } from "../utils/cutHttpAndHostName";
import { Top } from "../types/TypeApp";

const getTopManga = ({ html }: { html: string }) => {
    const $ = Cheerio.load(html);
    const TopMonth: Top[] = [];
    const TopWeek: Top[] = [];
    const TopDay: Top[] = [];
    $("#topMonth")
        .find("ul")
        .find("li")
        .each((i, el) => {
            const TopAndView = $("span", el).text().split(" ");
            const Title = $("h3", el).text();
            const Href = cutHttpAndHostName({
                url: $(".thumb", el).attr("href"),
            });
            const Top = TopAndView[0];
            const View = TopAndView[1];
            const Image = $("img", el).attr("src");
            const newChap = $(".chapter", el).find("a").text();
            TopMonth.push({
                title: Title,
                href: Href ?? "",
                image: Image ?? "",
                top: Top,
                view: View,
                newChapter: newChap,
            });
        });
    $("#topWeek")
        .find("ul")
        .find("li")
        .each((i, el) => {
            const TopAndView = $("span", el).text().split(" ");
            const Title = $("h3", el).text();
            const Href = cutHttpAndHostName({
                url: $(".thumb", el).attr("href"),
            });
            const Top = TopAndView[0];
            const View = TopAndView[1];
            const Image = $("img", el).attr("src");
            const newChap = $(".chapter", el).find("a").text();
            TopWeek.push({
                title: Title,
                href: Href ?? "",
                image: Image ?? "",
                top: Top,
                view: View,
                newChapter: newChap,
            });
        });
    $("#topDay")
        .find("ul")
        .find("li")
        .each((i, el) => {
            const TopAndView = $("span", el).text().split(" ");
            const Title = $("h3", el).text();
            const Href = cutHttpAndHostName({
                url: $(".thumb", el).attr("href"),
            });
            const Top = TopAndView[0];
            const View = TopAndView[1];
            const Image = $("img", el).attr("src");
            const newChap = $(".chapter", el).find("a").text();
            TopDay.push({
                title: Title,
                href: Href ?? "",
                image: Image ?? "",
                top: Top,
                view: View,
                newChapter: newChap,
            });
        });
    return { TopMonth, TopWeek, TopDay };
};
export default getTopManga;
