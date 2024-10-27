import * as Cheerio from "cheerio";
import { Category } from "../types/TypeApp";

const getCategory = (html: string) => {
    const $ = Cheerio.load(html);
    const Category: Category[] = [];
    $(".dropdown-menu")
        .find(".col-sm-3")
        .find("ul")
        .find("li")
        .each((i, el) => {
            if (i > 0) {
                const name = $("a", el).text().trim();
                const href = $("a", el).attr("href")?.slice(11); // Example: from "/tim-truyen/romance-121" to "/romance-121"
                const description = $("a", el).attr("data-title");
                Category.push({
                    name: name,
                    href: href ?? "",
                    description: description ?? "",
                });
            }
        });
    return Category;
};
export default getCategory;
