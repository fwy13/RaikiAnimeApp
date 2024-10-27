import { useEffect, useState } from "react";
import HotAnime from "../services/getHotAnime";
import { AnimeRecommend } from "../types/TypeApp";
import { Link } from "react-router-dom";
import { useLayout } from "../Layout/LayoutContext";

const AnimeHot = () => {
    const [isData, setData] = useState<{
        listRecommend: AnimeRecommend[];
        commingSoon: AnimeRecommend[];
        newUpdate: AnimeRecommend[];
    }>();
    const {setLoading} = useLayout()
    const timeScheduleHelper = (el: AnimeRecommend): string => {
        return `${
            new Date(
                el.timeSchedule?.split("-")[0] as any,
                el.timeSchedule?.split("-")[1] as any,
                el.timeSchedule?.split("-")[2] as any
            )
                .toLocaleString("vi-VN")
                .split(" ")[1]
        }`;
    };
    const getAnime = async () => {
        setData((await HotAnime()).data);
    };
    useEffect(() => {
        setLoading(true)
        getAnime();
    }, []);
    return (
        <div className="p-2">
            <h3 className="text-gray-50 mb-2">Đề xuất</h3>
            <div className="grid grid-cols-3 gap-2 w-full h-full">
                {isData?.listRecommend.map((el, i) => (
                    <Link key={i} to={`/watchanime/${el.href}`}>
                        <div className="flex flex-col w-full h-auto items-center">
                            <div className="relative">
                                <img
                                    src={el.image}
                                    alt={el.title}
                                    onLoad={(() => {setLoading(false)})}
                                    className="w-full object-cover h-[150px] rounded-md"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-[#00000023]"></div>
                                <h1 className="text-sm absolute bottom-0 w-full z-50 text-white h-[25px] ml-2 rounded-b-md">
                                    Tập {el.currentEp.split("/")[0]}
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
            </div>
            <h3 className="text-gray-50 my-2">Mới cập nhật</h3>
            <div className="grid grid-cols-3 gap-2 w-full h-full">
                {isData?.newUpdate.map((el, i) => (
                    <Link key={i} to={`/watchanime/${el.href}`}>
                        <div className="flex flex-col w-full h-auto items-center">
                            <div className="relative">
                                <img
                                    src={el.image}
                                    alt={el.title}
                                    className="w-full object-cover h-[150px] rounded-md"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-[#00000023]"></div>
                                <h1 className="text-sm absolute bottom-0 w-full z-50 text-white h-[25px] ml-2 rounded-b-md">
                                    Tập {el.currentEp.split("/")[0]}
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
            </div>
            <h3 className="text-gray-50 my-2">Sắp chiếu</h3>
            <div className="grid grid-cols-3 gap-2 w-full h-full">
                {isData?.commingSoon.map((el, i) => (
                    <Link key={i} to={`/watchanime/${el.href}`}>
                        <div className="flex flex-col w-full h-auto items-center">
                            <div className="relative">
                                <img
                                    src={el.image}
                                    alt={el.title}
                                    className="w-full object-cover h-[150px] rounded-md"
                                />
                                <div className="absolute top-0 left-0 w-full h-full bg-[#00000036]"></div>
                                <h1 className="text-center text-sm absolute bottom-0 w-full z-50 text-white h-[25px] rounded-b-md">
                                    {(el.timeSchedule?.split("-")
                                        .length as number) > 1
                                        ? `${
                                              Number(
                                                  timeScheduleHelper(el).split(
                                                      "/"
                                                  )[0]
                                              ) -
                                                  10 <=
                                              0
                                                  ? `0${
                                                        timeScheduleHelper(
                                                            el
                                                        ).split("/")[0]
                                                    }`
                                                  : timeScheduleHelper(
                                                        el
                                                    ).split("/")[0]
                                          } - ${
                                              timeScheduleHelper(el).split(
                                                  "/"
                                              )[0].length > 2
                                                  ? `0${
                                                        timeScheduleHelper(
                                                            el
                                                        ).split("/")[1]
                                                    }`
                                                  : timeScheduleHelper(
                                                        el
                                                    ).split("/")[1]
                                          } - ${
                                              timeScheduleHelper(el).split(
                                                  "/"
                                              )[2]
                                          }`
                                        : "Sắp chiếu"}
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
            </div>
            <div className="h-[70px]"></div>
        </div>
    );
};
export default AnimeHot;

