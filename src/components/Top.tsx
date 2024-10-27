import React from "react";
import { Link } from "react-router-dom";
import { imageWithProxy } from "../utils/imageWithProxy";
import { Top } from "../types/TypeApp";

interface Props extends Top {
}

const Rank: React.FC<Props> = (Props) => {
    return (
        <Link to={`/manga/${Props.href}`}>
            <div className="flex gap-4 w-full">
                <div className="relative w-1/3">
                    <img
                        src={imageWithProxy(Props.image)}
                        alt={Props.title}
                        className="w-full h-[200px] object-cover rounded-md"
                    />
                    <img
                        src={`https://raw.githubusercontent.com/anime-vsub/app/main/src/assets/bangumi_rank_ic_${Props.top.slice(
                            1
                        )}.png`}
                        className="absolute bottom-0 w-[100px] z-50 h-auto rounded-b-md object-cover"
                    />
                </div>
                <div className="w-2/3">
                    <h3 className="text-md text-white w-full">{Props.title}</h3>
                    <div className="flex gap-4">
                        <h3 className="text-md text-gray-300">
                            {Props.newChapter}
                        </h3>
                        <h3>|</h3>
                        <h3 className="text-md text-gray-300">
                            {Props.view} lượt xem
                        </h3>
                    </div>
                </div>
            </div>
        </Link>
    );
};
export default Rank;
