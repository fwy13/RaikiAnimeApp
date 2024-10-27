import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import getMangaHome from "../services/getMangaHome";
import { imageWithProxy } from "../utils/imageWithProxy";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import { DataSlide } from "../types/TypeApp";

const SlideMangaHome = () => {
    const getDataSlide = async () => {
        const { data } = await getMangaHome();
        setIsDataSlide(await data)
    }
    useEffect(() => {
        getDataSlide();
    },[])
    const [IsDataSlide, setIsDataSlide] = useState<DataSlide[]>();
    return (
        <Swiper className="h-[30%]">
            {IsDataSlide?.map((el, i) => (
                <SwiperSlide key={i}>
                    <Link
                        to={`/manga/${el.href}`}
                        className="w-full h-full relative"
                    >
                        <img
                            src={imageWithProxy(el.image)}
                            alt={el.title}
                            className="absolute left-0 w-full h-full object-cover object-top"
                        />
                        <div className="absolute left-0 w-full h-full object-cover object-top hero-overlay"></div>
                        <div className="flex w-full h-full px-1 text-white justify-center items-center">
                            <div className="flex gap-4 p-2 w-full h-full">
                                <div className="fixed flex flex-col gap-2 w-full h-full top-[35%]">
                                    <h2 className="text-xl w-full font-[500] two-line">
                                        {el.title}
                                    </h2>
                                    <h3 className="flex gap-2">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            strokeWidth={1.5}
                                            stroke="currentColor"
                                            className="size-6 text-info"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                d="M12 6v6h4.5m4.5 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                                            />
                                        </svg>
                                        {el.timeLastUpdate}
                                    </h3>
                                    <div className="flex gap-4 text-md">
                                        <span className="bg-rose-500 p-1">
                                            Hot
                                        </span>
                                        <span className="flex items-center">
                                            |
                                        </span>
                                        <span className="flex items-center">
                                            {el.newChap}
                                        </span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </Link>
                </SwiperSlide>
            ))}
        </Swiper>
    );
};
export default SlideMangaHome;
