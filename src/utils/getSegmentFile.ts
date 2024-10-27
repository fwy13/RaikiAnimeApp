import pLimit from "p-limit"

import { getRedirect } from "./get-redirect"

export async function getSegments(url: string) {
  const manifest = await fetch(url).then((res) => res.text());
  console.log(manifest.split("\n").filter((line) => line.includes("http")))
  return manifest.split("\n").filter((line) => line.includes("//"))
}

export async function getSegmentFile(
  url: string,
  map: Map<string, string> = new Map()
) {
  const segments = await getSegments(url)
  const limit = pLimit(100)
  await Promise.all(
    segments.map((segment) => {
      if (map.has(segment)) return -1
      return limit(async () =>
        map.set(
          segment,
          await getRedirect(new Request(`${segment}#animevsub-vsub_extra`))
        )
      )
    })
  )
  return map
}