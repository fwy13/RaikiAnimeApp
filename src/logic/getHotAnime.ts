import * as Cheerio from "cheerio";
import { AnimeRecommend } from "../types/TypeApp";
import { cutHttpAndHostName } from "../utils/cutHttpAndHostName";

const getHotAnime = (html: string) => {
    const $ = Cheerio.load(html);
    const listRecommend: AnimeRecommend[] = [];
    const newUpdate: AnimeRecommend[] = [];
    const commingSoon: AnimeRecommend[] = [];
    $("#hot-home")
        .find(".MovieList")
        .find("li")
        .each((i, el) => {
            const imageSrc = $("img", el).attr("src");
            const href = $("a", el).attr("href");
            const title = $(".Title", el).text();
            const vote = $(".Info", el).find(".Vote").text();
            const currentEp = $(".Info", el).find(".Time").text();
            const date = $(".Info", el).find(".Date").text();
            listRecommend.push({
                title: title,
                href: cutHttpAndHostName({ url: href }) ?? "",
                image: imageSrc ?? "",
                vote: vote,
                currentEp: currentEp,
                date: date,
            });
        });
    $("#single-home")
        .find(".MovieList")
        .find("li")
        .each((i, el) => {
            const imageSrc = $("img", el).attr("src");
            const href = $("a", el).attr("href");
            const title = $(".Title", el).text();
            const vote = $(".Info", el).find(".Vote").text();
            const currentEp = $(".Info", el).find(".Time").text();
            const date = $(".Info", el).find(".Date").text();
            newUpdate.push({
                title: title,
                href: cutHttpAndHostName({ url: href }) ?? "",
                image: imageSrc ?? "",
                vote: vote,
                currentEp: currentEp,
                date: date,
            });
        });
    $("#new-home")
        .find(".MovieList")
        .find("li")
        .each((i, el) => {
            const imageSrc = $("img", el).attr("src");
            const href = $("a", el).attr("href");
            const title = $(".Title", el).text();
            const vote = $(".Info", el).find(".Vote").text();
            const currentEp = $(".Info", el).find(".Time").text();
            const date = $(".Info", el).find(".Date").text();
            const timeSchedule = $(".Image", el).find(".b").text();
            commingSoon.push({
                title: title,
                href: cutHttpAndHostName({ url: href }) ?? "",
                image: imageSrc ?? "",
                vote: vote,
                currentEp: currentEp,
                date: date,
                timeSchedule: timeSchedule,
            });
        });

    return {
        listRecommend,
        commingSoon,
        newUpdate,
    };
};
export default getHotAnime;
