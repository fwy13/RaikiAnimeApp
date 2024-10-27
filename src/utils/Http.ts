import { GetOption } from "client-ext-animevsub-helper";
import { BaseUrl } from "../constant";
import { HttpResponse } from "@capacitor/core";

const Http = {
    get: async (Option: GetOption): Promise<HttpResponse> => {
        return await fetch(
            `https://manga-proxy-fwy13.deno.dev/?url=${encodeURIComponent(
                Option.url
            )}&headers=${encodeURIComponent(`{"referer": "${BaseUrl ?? Option.headers?.referer}"}`)}`,
            {
                method: "GET",
            }
        )
            .then((res) => {
                if (Option.responseType === "text") {
                    return res.text();
                } else if (Option.responseType === "json") {
                    return res.json();
                } else {
                    return res.arrayBuffer();
                }
            })
            .then((data) => {
                return {
                    data: data,
                    headers: {},
                    status: data ? 200 : 404,
                    url: Option.url,
                };
            });
    },
};
export default Http;
