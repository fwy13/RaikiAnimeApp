import { CapacitorHttp } from "@capacitor/core";
import { Http } from "client-ext-animevsub-helper";

export type IssuesGithub = {
    html_url: string;
    number: number;
    title: string;
    user: {
        login: string;
        avatar_url: string;
        html_url: string;
    };
    labels: {
        name: string;
        color: string;
        default: boolean;
        description: string;
    }[];
    state: string;
    created_at: string;
    updated_at: string;
    body: string;
    reactions: {
        total_count: number;
        "+1": number;
        "-1": number;
        laugh: number;
        hooray: number;
        confused: number;
        heart: number;
        rocket: number;
        eyes: number;
    };
};

const getIssues = async () => {
    const arrayIssues: IssuesGithub[] = [];
    return await (import.meta.env.DEV ? Http : CapacitorHttp)
        .get({
            url: "https://api.github.com/repos/anime-vsub/app/issues",
            responseType: "json",
            headers: {
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
            }
        })
        .then((response) => {
            // const { data }: { data: IssuesGithub[] } = response;
            // data.map((el) => {
            //     arrayIssues.push({
            //         html_url: el.html_url,
            //         number: el.number,
            //         title: el.title,
            //         user: el.user,
            //         labels: el.labels,
            //         state: el.state,
            //         created_at: el.created_at,
            //         updated_at: el.updated_at,
            //         body: el.body,
            //         reactions: el.reactions,
            //     });
            // });
            // return arrayIssues;
        });
};
export default getIssues;
