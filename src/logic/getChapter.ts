import * as Cheerio from "cheerio";
import { listImage } from "../types/TypeApp";
import getChaptersManga from "./getChaptersManga";

const getChapter = async (
    html: string,
    comicId: string,
    currentChapterId: string
) => {
    const nextAndpreChap: {
        preChap: string | undefined;
        preHref: string | undefined;
        nextChap: string | undefined;
        nextHref: string | undefined;
    }[] = [];
    const listChapter = await getChaptersManga({ comicId: comicId });
    listChapter.chapters.map((el, i) => {
        if (el.chapterId === Number(currentChapterId)) {
            // Chap 1 - 2 - 3
            /**
             * Current Chap: 2 => PreChap: 1 and NextChap: 3
             */

            // Chap 1 - 2 - 3
            /**
             * Current Chap: 1 => PreChap: undefined and NextChap: 2
             */

            // Chap 1 - 2 - 3
            /**
             * Current Chap: 3 => PreChap: 2 and NextChap: undefined
             */
            nextAndpreChap.push({
                preChap:
                    i === listChapter.chapters.length - 1
                        ? undefined
                        : listChapter.chapters[i + 1].name,
                preHref:
                    i === listChapter.chapters.length - 1
                        ? undefined
                        : listChapter.chapters[i + 1].url,
                nextChap:
                    i === 0 ? undefined : listChapter.chapters[i - 1].name,
                nextHref: i === 0 ? undefined : listChapter.chapters[i - 1].url,
            });
        }
    });
    const ListImage: listImage[] = [];
    const $ = Cheerio.load(html);
    const name = $(".top").find(".txt-primary").find("a").text();
    const chapterManga = $(".top").find(".txt-primary").find("span").text();
    $(".page-chapter")
        .find("img")
        .map(async (i, el) => {
            ListImage.push({
                page: i,
                image: el.attribs["data-src"],
            });
        });

    return {
        title: name,
        chapter: chapterManga,
        listImage: ListImage,
        listChapter: listChapter,
        nextAndpreChap: nextAndpreChap,
    };
};
export default getChapter;
