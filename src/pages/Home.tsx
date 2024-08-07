import { useRef } from "react";
import { useIonRouter } from "@ionic/react";
import FramerMotion from "../components/FramerMotion";
import TableWebManga from "../components/TableWebManga";

// const MangaSupported = ["nettruyen"];

const Home = () => {
    const useInput = useRef<HTMLInputElement | null>(null);
    const router = useIonRouter();

    const checkValue = (value: string | undefined) => {
        if (typeof value === "string") {
            if (value.search("http://") >= 0 || value.search("https://") >= 0) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    };

    const Read = async () => {
        const url = useInput.current?.value;
        if (url !== "") {
            if (checkValue(url)) {
                const newUrl = url?.slice(
                    url.search("truyen-tranh") + "truyen-tranh".length + 1
                );
                if (newUrl) {
                    router.push(`/manga/${newUrl}`);
                }
            } else {
                return;
            }
        } else {
            useInput.current?.focus();
        }
    };
    return (
        <FramerMotion style={{ position: "relative" }}>
            <main className="mt-5 p-3 gap-2 flex flex-col overflow-y-auto h-[calc(100vh)] w-full">
                <span className="p-1 text-xl text-red-500">Raiki Manga</span>
                <div className="flex flex-col w-full gap-2">
                    <input
                        type="text"
                        ref={useInput}
                        placeholder="Paste url manga."
                        className="outline-none p-3 border-[#ff0068] border-[1px] rounded w-full"
                    />
                    <button
                        className="bg-[#f20a51] hover:bg-[#c10841] text-white rounded p-3"
                        onClick={Read}
                    >
                        Read
                    </button>
                </div>
                <h3 className="w-full text-center text-xl text-info mt-3">
                    Website Manga
                </h3>
                <TableWebManga />
            </main>
        </FramerMotion>
    );
};

export default Home;
