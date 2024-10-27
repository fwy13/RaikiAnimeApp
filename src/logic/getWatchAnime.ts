import * as Cheerio from "cheerio";
import getAllEpAnime from "./getAllEpAnime";
import { cutHttpAndHostName } from "../utils/cutHttpAndHostName";
import { animeSlide, listGenreAnime } from "../types/TypeApp";

const getWatchAnime = async ({ html }: { html: string }) => {
    const allSeason: { href: string; name: string }[] = [];
    const MovieListRelated: Partial<animeSlide>[] = [];
    const $ = Cheerio.load(html);
    const title = $("header").find(".Title").text();
    const otherName = $("header").find(".SubTitle").text();
    const imageSrc = $(".Objf").find("img").attr("src");
    const description = $(".Description").text();
    const view = $(".Info")
        .find(".AAIco-remove_red_eye")
        .text()
        .slice(0, $(".Info").find(".AAIco-remove_red_eye").text().indexOf(" "));
    const dateAnime = $(".Info").find(".Date").find("a").text();
    const currentEp = ($(".Info").find(".Time")[0].children[0] as any).data;
    const averageScore = $("#average_score").text();
    const countRating = $(".num-rating").text();
    const banner = $(`img[class="TPostBg"]`).attr("src");
    const listGenre: listGenreAnime[] = [];
    const trailer = $(".TPlayerTb").find("iframe").attr("src");
    const allTag: string[] = [];
    $(".season_item").length > 0
        ? $(".season_item")
              .find("a")
              .each((i, el) => {
                  allSeason.push({
                      href:
                          cutHttpAndHostName({ url: $(el).attr("href") }) ?? "",
                      name: $(el).text(),
                  });
              })
        : "";
    $(".MovieListRelated")
        .find(".TPostMv")
        .each((i, el) => {
            const imageSrc = $("img", el).attr("src");
            const href = $(".TPost", el).find("a").attr("href");
            const title = $(".Title", el).text();
            const tag =
                $(".mli-quality", el).text().length >= 1
                    ? $(".mli-quality", el).text()
                    : $(".mli-eps", el).find("i").text() === "TẤT"
                    ? "Trọn bộ"
                    : `Tập ${$(".mli-eps", el).find("i").text()}`;
            allTag.push(tag);
            MovieListRelated.push({
                title: title,
                href: cutHttpAndHostName({ url: href })?.split("/")[0] ?? "",
                image: imageSrc ?? "",
                tag: tag,
            });
        });
    const showTime: string[] = [];
    const Season: string[] = [];
    const country: string[] = [];
    const studio: string[] = [];
    $(".InfoList")
        .find("li")
        .each((i, el) => {
            const elemenOrig = $(el).text();
            if (elemenOrig.indexOf("Lịch chiếu") >= 0) {
                showTime.push(elemenOrig);
            }
            if (elemenOrig.indexOf("Season") >= 0) {
                Season.push(elemenOrig);
            }
            if (elemenOrig.indexOf("Quốc gia") >= 0) {
                country.push(elemenOrig);
            }
            if (elemenOrig.indexOf("Studio") >= 0) {
                studio.push(elemenOrig);
            }
            if (elemenOrig.indexOf("Thể loại") >= 0) {
                $(el)
                    .find("a")
                    .each((i, el) => {
                        listGenre.push({
                            name: $(el).text(),
                            url: `${$(el).attr("href")}`,
                        });
                    });
            }
        });
    const latestEpisode = ($(".latest_eps").find("a")[0].children[0] as any)
        .parent.attribs.href;
    const listAllEpAnime = await getAllEpAnime(latestEpisode);
    return {
        title: title,
        otherName: otherName,
        imageSrc: imageSrc,
        view: view,
        dateAnime: dateAnime,
        currentEp: currentEp,
        averageScore: averageScore,
        countRating: countRating,
        showTime: showTime.join(""),
        Season: Season.join(""),
        country: country.join(""),
        studio: studio.join(""),
        banner: banner,
        allSeason: allSeason,
        tag: allTag,
        trailer: trailer,
        description: description,
        Related: MovieListRelated,
        listGenre: listGenre,
        listAllEpAnime: listAllEpAnime,
    };
};
export default getWatchAnime;
