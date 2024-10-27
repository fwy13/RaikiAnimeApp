import { BaseUrl } from "../constant";
import * as Cheerio from "cheerio";

export default function checkHomeRedict($: Cheerio.CheerioAPI) {
    if ($("meta[property=og:url]").attr("content") === BaseUrl) {
        return true;
    }
    return false;
}
