import * as Cheerio from "cheerio";
import { animeSlide, listGenreAnime } from "../types/TypeApp";
import { cutHttpAndHostName } from "../utils/cutHttpAndHostName";

const getAnimeHome = (html: string) => {
    const $ = Cheerio.load(html);
    const listAnimeSlide: animeSlide[] = [];
    $(".TPostMv", html).each((i, el) => {
        if (i >= 16 && i <= 25) {
            const genres: listGenreAnime[] = [];
            const title = $(".Title", el).text();
            const link = ($(".TPMvCn", el).find("a").attr("href") ?? "").split(
                "/"
            )[4];
            const imageBG = $(".TPostBg", el).attr("src");
            const description = $(".Description", el)
                .find("p")
                .text()
                .slice(
                    0,
                    $(".Description", el).find("p").text().indexOf("Studio")
                );
            const studio = $(".Studio", el)
                .text()
                .split(" ")
                .splice(1)
                .join(" ")
                .replace(",", "");
            const countVote = $(".Info", el).find(".Vote").text();
            const currentEp = $(".Info", el).find(".Time").text();
            const year = $(".Info", el).find(".Date").text();
            const quality = $(".Info", el).find(".Qlty").text();
            $(".Description", el)
                .find("a")
                .each((i, el2) => {
                    genres.push({
                        url: ($(el2).attr("href") ?? "").split("/")[4],
                        name: $(el2).text(),
                    });
                });
            listAnimeSlide.push({
                title: title,
                href: link,
                image: imageBG ?? "",
                vote: countVote,
                currentEp: currentEp,
                description: description,
                date: year,
                studio: studio,
                tag: quality,
                genres: genres,
            });
        }
    });
    console.log("Data", listAnimeSlide);
    return listAnimeSlide;
};
export default getAnimeHome;
