import { ChangeEvent, useCallback, useEffect, useState } from "react";
import FramerMotion from "../components/FramerMotion";
import getTop from "../services/getTop";
import lodash from "lodash";
import getSearchManga from "../services/getSearchManga";
import { Category as TypeCategory, MangaSearch, Top } from "../types/TypeApp";
import { imageWithProxy } from "../utils/imageWithProxy";
import { Link } from "react-router-dom";

import cry from "../assets/ic_22_cry.png";
import Rank from "../components/Top";
import Category from "../services/getCategory";

const Search = () => {
    const getDataTop = async () => {
        const { data } = await getTop();
        setIsDataTop(data);
    };
    const getDataCategory = async () => {
        const { data } = await Category();
        setIsCategory(data);
    };
    useEffect(() => {
        getDataTop();
        getDataCategory();
    }, []);
    const [IsDataTop, setIsDataTop] = useState<{
        TopMonth: Top[];
        TopWeek: Top[];
        TopDay: Top[];
    }>();
    // State String || Type
    const [IsInput, setIsInput] = useState<string>("");
    const [IsType, setIsType] = useState<string>("month");
    const [IsDataSearch, setIsDataSearch] = useState<MangaSearch[]>();
    const [IsCategory, setIsCategory] = useState<TypeCategory[]>();

    // State Boolean
    const [IsSearch, setIsSearch] = useState<boolean>(false);
    const [IsSearched, setIsSearched] = useState<boolean>(false);
    const [IsLoadingSearch, setIsLoadingSearch] = useState<boolean>(false);

    const useDebounce = useCallback(
        lodash.debounce(async (Value) => {
            setIsSearched(true);
            setIsDataSearch(await getSearchManga({ name: Value }));
        }, 300),
        []
    );
    const handleInputOnchange = (e: ChangeEvent<HTMLInputElement>) => {
        setIsLoadingSearch(true);
        useDebounce(e.target.value);
        setIsInput(e.target.value);
    };

    return (
        <FramerMotion style={{}}>
            <div className="w-full h-screen">
                <div className="w-full h-auto p-2">
                    <div className="flex flex-col p-2 w-full">
                        <div className="flex w-full items-center">
                            {IsSearch ? (
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth={1.5}
                                    stroke="currentColor"
                                    onClick={() => {
                                        setIsSearch(false);
                                    }}
                                    className="size-8 mr-2 text-gray-500 hover:text-gray-50 active:scale-110 animate-fade-right"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18"
                                    />
                                </svg>
                            ) : (
                                ""
                            )}
                            <input
                                type="text"
                                placeholder="Tim kiem"
                                onChange={handleInputOnchange}
                                onClick={() => {
                                    setIsSearch(true);
                                }}
                                className="bg-base-300 outline-none rounded-[99999px] px-5 p-1 h-10 text-white w-full"
                            />
                        </div>
                        <div className="mt-2 flex items-center gap-4">
                            <span
                                className={`${
                                    IsInput.length > 0 ? "flex" : "hidden"
                                } animate-fade-right`}
                            >
                                Kết quả cho {IsInput}
                            </span>
                            <span
                                className={`${
                                    IsLoadingSearch
                                        ? "loading bg-success loading-dots loading-md"
                                        : ""
                                } ${
                                    IsInput.length > 0 ? "flex" : "hidden"
                                } animate-fade-right`}
                            ></span>
                        </div>
                    </div>
                    <div
                        className={`flex gap-4 px-5 text-gray-500 animate-fade-down ${
                            IsSearch ? "hidden" : ""
                        }`}
                    >
                        <h3
                            className={`${
                                IsType === "month"
                                    ? "text-white"
                                    : "text-gray-500"
                            }`}
                            onClick={() => {
                                setIsType("month");
                            }}
                        >
                            Tháng
                        </h3>
                        <h3
                            className={`${
                                IsType === "week"
                                    ? "text-white"
                                    : "text-gray-500"
                            }`}
                            onClick={() => {
                                setIsType("week");
                            }}
                        >
                            Tuần
                        </h3>
                        <h3
                            className={`${
                                IsType === "day"
                                    ? "text-white"
                                    : "text-gray-500"
                            }`}
                            onClick={() => {
                                setIsType("day");
                            }}
                        >
                            Ngày
                        </h3>
                        <h3
                            className={`${
                                IsType === "category"
                                    ? "text-white"
                                    : "text-gray-500"
                            }`}
                            onClick={() => {
                                setIsType("category");
                            }}
                        >
                            Thể loại
                        </h3>
                    </div>
                </div>
                <div
                    className={`flex-col gap-3 p-4 w-full h-[80vh] overflow-y-auto animate-fade-left ${
                        IsSearch ? "hidden" : ""
                    } ${IsType === "month" ? "flex" : "hidden"}`}
                >
                    {IsDataTop?.TopMonth.map((el, i) => (
                        <Rank
                            href={el.href}
                            title={el.title}
                            image={el.image}
                            newChapter={el.newChapter}
                            top={el.top}
                            view={el.view}
                            key={i}
                        />
                    ))}
                </div>
                <div
                    className={`flex-col gap-3 p-4 w-full h-[80vh] overflow-y-auto animate-fade-left ${
                        IsSearch ? "hidden" : ""
                    } ${IsType === "week" ? "flex" : "hidden"}`}
                >
                    {IsDataTop?.TopWeek.map((el, i) => (
                        <Rank
                            href={el.href}
                            title={el.title}
                            image={el.image}
                            newChapter={el.newChapter}
                            top={el.top}
                            view={el.view}
                            key={i}
                        />
                    ))}
                </div>
                <div
                    className={`flex-col gap-3 p-4 w-full h-[80vh] overflow-y-auto animate-fade-left ${
                        IsSearch ? "hidden" : ""
                    } ${IsType === "day" ? "flex" : "hidden"}`}
                >
                    {IsDataTop?.TopDay.map((el, i) => (
                        <Rank
                            href={el.href}
                            title={el.title}
                            image={el.image}
                            newChapter={el.newChapter}
                            top={el.top}
                            view={el.view}
                            key={i}
                        />
                    ))}
                </div>
                <div
                    className={`flex-col gap-3 p-4 w-full h-[80vh] overflow-y-auto animate-fade-left ${
                        IsSearch ? "hidden" : ""
                    } ${IsType === "category" ? "flex" : "hidden"}`}
                >
                    <h3 className="text-gray-100 text-xl border-t-[5px] border-gray-100 w-20 text-center">
                        Thể loại
                    </h3>
                    <div className="grid grid-cols-2 gap-2">
                        {IsCategory?.map((el, i) => (
                            <div className="flex flex-col bg-accent-content h-auto items-end justify-center w-full p-3" key={i}>
                                <h3 className="text-[15px] text-gray-100 text-center w-full">{el.name}</h3>
                                <span className="">{el.description}</span>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex flex-col gap-3 w-full px-6 h-[85vh] overflow-y-auto">
                    {IsDataSearch?.map((el, i) => (
                        <Link key={i} to={`/manga/${el.href}`}>
                            <div className="flex gap-4 w-full">
                                <div className="relative w-1/3">
                                    <img
                                        src={imageWithProxy(el.image)}
                                        alt={el.title}
                                        className="w-full h-[200px] object-cover rounded-md"
                                        onLoad={() => {
                                            setIsSearched(false);
                                            setIsLoadingSearch(false);
                                        }}
                                    />
                                </div>
                                <div className="w-2/3">
                                    <h3 className="text-md text-white w-full">
                                        {el.title}
                                    </h3>
                                    <div className="flex gap-4">
                                        <h3 className="text-md text-gray-300">
                                            {el.newChapter}
                                        </h3>
                                        <h3>|</h3>
                                        <h3 className="text-md text-gray-300">
                                            {el.view} lượt xem
                                        </h3>
                                    </div>
                                </div>
                            </div>
                        </Link>
                    ))}
                    {IsSearched && IsDataSearch?.length === 0 ? (
                        <div className="flex flex-col justify-center p-4 items-center">
                            <img
                                src={cry}
                                alt="Khong tim thay ket qua"
                                onLoad={() => {
                                    setIsLoadingSearch(false);
                                }}
                            />
                            <span className="text-xl mt-3 text-error">
                                Không tìm thấy kết quả!
                            </span>
                        </div>
                    ) : (
                        ""
                    )}
                </div>
            </div>
        </FramerMotion>
    );
};
export default Search;
