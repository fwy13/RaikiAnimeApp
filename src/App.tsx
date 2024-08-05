import { Route } from "react-router-dom";
import { IonApp } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import Home from "./pages/Home";

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
            <Route path="/">
                <Home />
            </Route>
        </IonReactRouter>
    </IonApp>
);

export default App;
