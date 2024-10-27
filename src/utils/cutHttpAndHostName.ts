export const cutHttpAndHostName = ({ url }: { url: string | undefined }) => {
    if (url) {
        if (url.search("truyen-tranh") > 0) {
            return url.slice(
                url.search("truyen-tranh") + "truyen-tranh/".length
            );
        } else {
            return url.slice(url.search("phim") + "phim/".length);
        }
    }
};
