import getPageManga from "../services/getPageManga";
import { imageWithProxy } from "../utils/imageWithProxy";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { MangaHot } from "../types/TypeApp";

const HotManga = () => {
    const getDataHot = async () => {
        const { data } = await getPageManga();
        setIsDataHot(await data);
    };
    useEffect(() => {
        getDataHot();
    }, []);
    const [IsDataHot, setIsDataHot] = useState<{ MangaHots: MangaHot[] }>();
    return (
        <div className="grid grid-cols-3 gap-2 w-full h-full p-2">
            {IsDataHot?.MangaHots.map((el, i) => (
                <Link key={i} to={`/manga/${el.href}`}>
                    <div className="flex flex-col w-full h-auto items-center">
                        <div className="relative">
                            <img
                                src={imageWithProxy(el.image)}
                                alt={el.title}
                                className="w-full object-cover h-[200px] rounded-md"
                            />
                            <h1 className="absolute bottom-0 w-full z-50 text-white bg-[#00000048] h-[30px] rounded-b-md">
                                {el.newChapter}
                            </h1>
                        </div>
                        <div className="w-full">
                            <h3 className="text-[15px] w-full font-[500] two-line">
                                {el.title}
                            </h3>
                        </div>
                    </div>
                </Link>
            ))}
            <div className="h-[70px]"></div>
        </div>
    );
};
export default HotManga;
