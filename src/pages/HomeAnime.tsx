import FramerMotion from "../components/FramerMotion";
import AnimeHot from "../components/HotAnime";
import SlideAnime from "../components/SlideAnime";
import { useLayout } from "../Layout/LayoutContext";

const Anime = () => {
    const { isLoading } = useLayout();
    return (
        <FramerMotion
            style={{
                display: isLoading ? "none" : "",
                width: "100%",
                height: "100vh",
                overflowY: "auto",
            }}
        >
            <SlideAnime />
            <AnimeHot />
        </FramerMotion>
    );
};
export default Anime;
