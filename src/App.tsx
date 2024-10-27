import { Route } from "react-router-dom";
import { IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomeManga from "./pages/HomeManga";
import Manga from "./pages/Manga";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import Layout from "./Layout/Layout";
import LayoutProvider from "./Layout/LayoutContext";
import Search from "./pages/Search";
import Watch from "./pages/Watch";
import HomeAnime from "./pages/HomeAnime";
import WatchAnime from "./pages/WatchAnime";

export const queryClient = new QueryClient();

// if (import.meta.env.DEV) {
import("eruda2")
    .then((eruda2) => {
        eruda2.default.init();
    })
    .catch(() => {
        console.error("Load Eruda2 fail!");
    });
// }
const App: React.FC = () => (
    <IonReactRouter>
        <LayoutProvider>
            <IonRouterOutlet>
                {/* <Route exact path="/" component={HomeManga} />
                    <Route exact path="/search" component={Search} />
                    <Route exact path="/manga/:manga" component={Manga} /> */}
                <Route
                    exact
                    path="/watch/:manga/:chapter/:chap"
                    component={Watch}
                />
                <Route exact path="/" component={HomeAnime} />
                <Route exact path="/watchanime/:anime" component={WatchAnime} />
            </IonRouterOutlet>
            <Layout />
        </LayoutProvider>
    </IonReactRouter>
);

export default App;
