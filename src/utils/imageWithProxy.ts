import { BaseUrl } from "../constant";

export function imageWithProxy(url: string) {
    return `https://manga-proxy-fwy13.deno.dev/?url=${encodeURIComponent(
        url
    )}&headers=${encodeURIComponent(`{"referer": "${BaseUrl}"}`)}`;
}
