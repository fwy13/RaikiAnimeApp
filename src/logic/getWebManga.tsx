import { Dispatch, SetStateAction } from "react";
import { typeWebSupport } from "../types/typeManga";

const getWebManga = async ({
    setData,
}: {
    setData: Dispatch<SetStateAction<typeWebSupport[] | undefined>>;
}) => {
    const ArrayWeb: typeWebSupport[] = [];
    const res = await fetch(
        "https://raw.githubusercontent.com/fwy13/RaikiAnimeApp/master/webManga.json"
    )
        .then((res) => res.json())
        .then((data: any) => {
            return data;
        });
    Object.keys(res).map((el) => {
        ArrayWeb.push({
            name: res[`${el}`]["name"],
            image: res[`${el}`]["image"],
            support: res[`${el}`]["support"],
            // 0 -> no support
            // 1 -> support
            // 2 -> will support
        });
    });
    setData(ArrayWeb);
};
export default getWebManga;
