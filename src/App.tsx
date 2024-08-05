import { Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";
import Manga from "./pages/Manga";

// setupIonicReact();

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
                <Route path="/" component={Home} />
                <Route path="/:manga" component={Manga} />
            </IonRouterOutlet>
        </IonReactRouter>
    </IonApp>
);

export default App;
