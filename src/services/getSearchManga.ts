import { CapacitorHttp } from "@capacitor/core";
import { getHeader, searchManga } from "../constant";
import getSearch from "../logic/getSearch";
import { Http } from "client-ext-animevsub-helper";

const getSearchManga = async ({name}: {name: string}) => {
    const Response = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: searchManga + name,
        responseType: "text",
        headers: getHeader(undefined),
    });
    const Data = getSearch({ html: Response.data });
    return Data;
};
export default getSearchManga;
