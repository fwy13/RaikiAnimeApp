import { useParams } from "react-router-dom";
import { useEffect, useRef, useState } from "react";
import FramerMotion from "../components/FramerMotion";
import { DataChapter } from "../types/typeManga";
import getChapter from "../logic/getChapter";

const Manga = () => {
    const params: any = useParams();
    const { nameManga, chapter, chapterId } = params;
    const [DataChapter, setDataChapter] = useState<DataChapter>();
    const [IsLoading, setIsLoading] = useState<boolean>(false);

    useEffect(() => {
        getChapter({
            nameManga: nameManga,
            chapter: chapter,
            chapterId: chapterId,
            setIsLoading: setIsLoading,
            setDataChapter: setDataChapter,
        });
    }, []);
    return (
        <main className="relative h-full">
            {IsLoading ? (
                <div className="flex items-center justify-center h-full flex-col">
                    <span className="loader"></span>
                    <span className="text-gray-600">Loading...</span>
                </div>
            ) : (
                ""
            )}
            <FramerMotion style={{}}>
                {DataChapter ? (
                    <div className="flex items-center flex-col h-screen overflow-y-auto">
                        <h3 className="text-xl mt-4">
                            {DataChapter.title} - {DataChapter.chapter}
                        </h3>
                        <div className="flex w-auto h-auto flex-col">
                            {DataChapter.listImage.map((el, i) => (
                                <img
                                    key={i}
                                    src={el.image}
                                    alt={`${el.page}`}
                                    className="w-auto h-auto"
                                />
                            ))}
                        </div>
                    </div>
                ) : (
                    ""
                )}
            </FramerMotion>
        </main>
    );
};
export default Manga;
