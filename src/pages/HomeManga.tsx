import FramerMotion from "../components/FramerMotion";
import HotManga from "../components/HotManga";
import SlideManga from "../components/SlideManga";
const Home = () => {
    return (
        <FramerMotion
            style={{
                width: "100%",
                height: "100vh",
                overflowY: "auto",
            }}
        >
            <SlideManga />
            <HotManga />
        </FramerMotion>
    );
};

export default Home;
