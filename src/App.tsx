import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Manga from "./pages/Watch";
import MangaInfo from "./pages/MangaInfo";

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
    <IonApp>
        <IonReactRouter>
            <IonRouterOutlet>
                <Route exact path="/" component={Home} />
                <Route exact path="/watch/:nameManga/:chapter/:chapterId" component={Manga} />
                <Route exact path="/manga/:name" component={MangaInfo}/>
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
