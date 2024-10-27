import { CapacitorHttp } from "@capacitor/core";
import { BaseUrl, getHeader } from "../constant";
import getTopManga from "../logic/getTopManga";
import { Http } from "client-ext-animevsub-helper";

const getTop = async () => {
    const DataTop = await (import.meta.env.DEV
        ? Http
        : CapacitorHttp
    ).get({
        url: BaseUrl,
        responseType: "text",
        headers: getHeader(undefined),
    });
    return {data: getTopManga({ html: DataTop.data })};
};
export default getTop;
