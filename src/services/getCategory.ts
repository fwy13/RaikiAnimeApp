import { CapacitorHttp } from "@capacitor/core";
import { Http } from "client-ext-animevsub-helper";
import { BaseUrl, getHeader } from "../constant";
import getCategory from "../logic/getCategory";

const Category = async () => {
    const response = await (import.meta.env.DEV ? Http : CapacitorHttp).get({
        url: BaseUrl,
        responseType: "text",
        headers: getHeader(undefined),
    });
    return { data: getCategory(response.data) };
};
export default Category;
