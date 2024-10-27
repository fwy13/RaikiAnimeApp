export const BaseUrl = "https://nettruyenww.com";
export const getChapter =
    "https://nettruyenww.com/Comic/Services/ComicService.asmx/ProcessChapterList?comicId=";
export const searchManga = "https://nettruyenx.com/tim-truyen?keyword=";
export const urlAnime = "https://animevietsub.nl";
export const urlgetM3u8Anime = `${urlAnime}/ajax/player?v=2019a`

export function getHeader(referer: string | undefined) {
    return {
        accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.9",
        "accept-language": "vi-VN,vi;q=0.9,en;q=0.8,ja;q=0.7",
        "cache-control": "max-age=0",
        dnt: "1",
        "sec-ch-ua":
            '"Google Chrome";v="105", "Not)A;Brand";v="8", "Chromium";v="105"',
        "sec-ch-ua-mobile": "?0",
        "sec-ch-ua-platform": "Windows",
        "sec-fetch-dest": "document",
        "sec-fetch-mode": "navigate",
        "sec-fetch-site": "none",
        "sec-fetch-user": "?1",
        "sec-gpc": "1",
        "upgrade-insecure-requests": "1",
        "user-agent":
            "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/115.0.0.0 Safari/537.36",
        referer: referer ?? BaseUrl,
    }
}
