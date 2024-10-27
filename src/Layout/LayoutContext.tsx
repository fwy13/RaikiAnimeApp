import React, {
    createContext,
    Dispatch,
    SetStateAction,
    useContext,
    useEffect,
    useState,
} from "react";
import { useLocation } from "react-router";

type Status = {
    home: boolean;
    search: boolean;
    anime: boolean;
    me: boolean;
};

type LayoutContext = {
    isHidden: boolean;
    setisHidden: Dispatch<SetStateAction<boolean>>;
    IsType: "manga" | "search" | "anime" | "me" | string;
    setIsType: Dispatch<SetStateAction<string>>;
    IsStatus: Status;
    setIsStatus: Dispatch<SetStateAction<Status>>;
    isLoading: boolean;
    setLoading: Dispatch<SetStateAction<boolean>>;
};

export const LayoutContext = createContext<LayoutContext>({
    IsType: "",
    setIsType: () => "",
    IsStatus: {
        home: false,
        search: false,
        anime: false,
        me: false,
    },
    setIsStatus: () => {},
    isHidden: false,
    setisHidden: () => true || false,
    isLoading: false,
    setLoading: () => true || false,
});

export default function LayoutProvider({
    children,
}: {
    children?: React.ReactNode;
}) {
    const [isLoading, setLoading] = useState<boolean>(false);
    const Location = useLocation();
    const [isHidden, setisHidden] = useState<boolean>(false);
    const [IsType, setIsType] = useState<string>("");
    const [IsStatus, setIsStatus] = useState<Status>({
        home: true,
        search: false,
        anime: false,
        me: false,
    });
    useEffect(() => {
        setIsType(Location.pathname.split("/")[1]);
    }, [Location.pathname]);
    useEffect(() => {
        switch (IsType) {
            case "manga":
                setisHidden(false);
                setIsStatus({
                    home: true,
                    search: false,
                    anime: false,
                    me: false,
                });
                return;
            case "watch":
                setisHidden(false);
                setIsStatus({
                    home: true,
                    search: false,
                    anime: false,
                    me: false,
                });
                return;
            case "search":
                setisHidden(false);
                setIsStatus({
                    home: false,
                    search: true,
                    anime: false,
                    me: false,
                });
                return;
            case "anime":
                setisHidden(false);
                setIsStatus({
                    home: false,
                    search: false,
                    anime: true,
                    me: false,
                });
                return;
            case "watchanime":
                setisHidden(false);
                setIsStatus({
                    home: false,
                    search: false,
                    anime: true,
                    me: false,
                });
                return;
            case "me":
                setisHidden(false);
                setIsStatus({
                    home: false,
                    search: false,
                    anime: false,
                    me: true,
                });
                return;
            default:
                setisHidden(false);
                return;
        }
    }, [IsType]);
    return (
        <LayoutContext.Provider
            value={{
                IsType,
                IsStatus,
                setIsStatus,
                setIsType,
                isHidden,
                setisHidden,
                isLoading,
                setLoading,
            }}
        >
            {children}
        </LayoutContext.Provider>
    );
}
export const useLayout = () => {
    return useContext(LayoutContext);
};
