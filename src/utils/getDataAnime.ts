import { CapacitorHttp } from "@capacitor/core";
import { Http } from "client-ext-animevsub-helper";
import { getHeader, urlAnime, urlgetM3u8Anime } from "../constant";
import { decryptM3u8, init } from "./decrypt-hls-animevsub";
import { getSegmentFile } from "./getSegmentFile";
import { post } from "./httpForAnime";

const MEDIA_STREAM_SUPPORT = !!self.MediaStream

const getDataAnime = async ({
    id,
    play,
    link,
}: {
    id: string | undefined;
    play: string | undefined;
    link: string | undefined;
}) => {
    const repsonse = await post(urlgetM3u8Anime, {
        id: id ?? "",
        play: play ?? "",
        link: link ?? "",
        backuplinks: "1",
    });
    const fileAnimeOriginal = JSON.parse(repsonse.data) as {
        link: [{ file: string }];
    };
    const res = await fetch("https://script.google.com/macros/s/AKfycbyWwrkWn-epBBhLe8-FRnFFGZisE3rBoo4Jv7vJ4KBTPv-8nlVn9N0DDKb9QMmqSxjE/exec").then(res => res.json())

    await init();
    // const decryptFileAnime = await decryptM3u8(fileAnimeOriginal.link[0].file);
    const decryptFileAnime = await decryptM3u8(res.message);
    return {
        data: `data:application/vnd.apple.mpegurl;base64,${btoa(
            fixiOSLow17(decryptFileAnime)
        )}`,
    };
};
function fixiOSLow17(manifest: string): string {
    if (!MEDIA_STREAM_SUPPORT) {
      return manifest
        .split("\n")
        .map((line) => {
          if (line.includes("//")) return line + "#animevsub-vsub_extra"
          return line
        })
        .join("\n")
    }
  
    return manifest
  }

export default getDataAnime;
