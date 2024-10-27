import * as Cheerio from "cheerio";
import { DataChapters, typeManga } from "../types/TypeApp";
import checkHomeRedict from "../utils/checkHomeRedict";

const GetInfoManga = async ({
    html,
    DataChapter,
}: {
    html: string;
    DataChapter: DataChapters;
}) => {
    const $ = Cheerio.load(html);
    // console.log(checkHomeRedict($))
    const imageManga = $(".col-image").find("img").attr("src");
    const titleManga = $(".title-detail").text();
    const timeUpdate = $("#item-detail")
        .find(".small")
        .text()
        .split("]")[0]
        .slice(2)
        .split(" ");
    const author = $(".author").find(".col-xs-8").text();
    const status = $(".status").find(".col-xs-8").text();
    const othername = $(".other-name").text();
    const typeManga: typeManga[] = [];
    $(".kind")
        .find("a")
        .each((i, el: any) => {
            const url = el.attribs.href;
            const name = el.children[0].data;
            typeManga.push({
                nameType: name,
                urlType: url,
            });
        });
    const viewArr: string[] = [];
    $(".list-info")
        .find("li")
        .each((i, el) => {
            const checkView = $(".name", el).text();
            if (checkView === "   Lượt xem ") {
                viewArr.push($(".col-xs-8", el).text());
            }
        });
    const view = viewArr.join();
    const ratingValue = $("[itemprop=ratingValue]").text();
    const bestRating = $("[itemprop=bestRating]").text();
    const ratingCount = $("[itemprop=ratingCount]").text();
    const follow = $(".number_follow").text();
    const oneDay = 24 * 60 * 60 * 1000; // hours*minutes*seconds*milliseconds
    const firstDate: number | any = new Date();
    const secondDate: number | any = new Date(
        Number(timeUpdate[3].split("-")[0]),
        Number(timeUpdate[3].split("-")[1]),
        Number(timeUpdate[3].split("-")[2])
    );
    const diffDays = Math.round(Math.abs((firstDate - secondDate) / oneDay));
    return {
        title: titleManga,
        image: imageManga,
        timeLastUpdate: `${diffDays}`,
        author: author,
        status: status,
        otherName: othername,
        viewManga: view,
        Rating: `${ratingValue}/${bestRating}`,
        ratingCount: ratingCount,
        follower: follow,
        typeManga: typeManga,
        chapters: DataChapter.success ? DataChapter.chapters : [],
    };
};
export default GetInfoManga;
