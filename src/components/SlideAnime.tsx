import { useEffect, useState } from "react";
import getAnimeHome from "../services/getAnimeHome";
import { animeSlide } from "../types/TypeApp";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import { Link } from "react-router-dom";

const SlideAnime = () => {
    const [isData, setData] = useState<animeSlide[]>();
    const getAnime = async () => {
        setData((await getAnimeHome()).data);
    };
    useEffect(() => {
        getAnime();
    }, []);
    return (
        <Swiper className="h-[35%]">
            {isData?.map((el, i) => (
                <SwiperSlide key={i}>
                    <Link
                        to={`/watchanime/${el.href}`}
                        className="w-full h-full relative"
                    >
                        <img
                            src={el.image}
                            alt={el.title}
                            className="absolute left-0 w-full h-full object-cover object-top"
                        />
                        <div className="absolute left-0 w-full h-full object-cover object-top hero-overlay"></div>
                        <div className="flex w-full h-full px-1 text-white justify-center items-center">
                            <div className="flex gap-4 p-2 w-full h-full">
                                <div className="fixed flex flex-col gap-2 w-full h-full top-[25%]">
                                    <h2 className="text-xl w-full font-[500] two-line">
                                        {el.title}
                                    </h2>
                                    <h3 className="flex gap-2 items-center">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            viewBox="0 0 24 24"
                                            fill="currentColor"
                                            className="size-5 text-[#00c234]"
                                        >
                                            <path
                                                fillRule="evenodd"
                                                d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.006 5.404.434c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.434 2.082-5.005Z"
                                                clipRule="evenodd"
                                            />
                                        </svg>
                                        {el.vote} | {el.date} | {el.currentEp}
                                    </h3>
                                    <div className="flex gap-4 text-md w-[80%] two-line">
                                        {el.genres.map((elem, i) => (
                                            <span
                                                className="text-[#00c234] font-bold"
                                                key={i}
                                            >
                                                {elem.name}
                                                {i === el.genres.length - 1 ? (
                                                    ""
                                                ) : (
                                                    <span className="text-white">
                                                        ,
                                                    </span>
                                                )}{" "}
                                            </span>
                                        ))}
                                    </div>
                                    <div className="mt-[-10px] w-full two-line h-12">
                                        <p>{el.description}</p>
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
export default SlideAnime;
