import { CapacitorHttp } from "@capacitor/core";
import { BaseUrl, getHeader } from "../constant";
import { Http } from "client-ext-animevsub-helper";

const imageToBlob = async (url: string) => {
    const response = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: url + "#animevsub-vsub_extra",
        responseType: "arraybuffer",
        headers: getHeader(undefined),
    });
    const blob = new Blob([response.data]);
    const URLImage = URL.createObjectURL(blob);
    return URLImage;
};
export default imageToBlob;
