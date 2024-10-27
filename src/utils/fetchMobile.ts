import { CapacitorHttp } from "@capacitor/core";
import { base64ToArrayBuffer } from "./base64ToArrayBuffer";
const isNative = !import.meta.env.DEV;

async function getResponse(
    promise: Promise<{ data: string }>
): Promise<Response> {
    const stream = new ReadableStream({
        start(controller) {
            // eslint-disable-next-line promise/always-return
            void promise.then(({ data }) => {
                controller.enqueue(base64ToArrayBuffer(data));
                controller.close();
            });
        },
    });

    return new Response(stream, { status: 200 });
}
export async function fetchJava(
    url: string,
    options?: {
        headers?: Headers;
        signal?: AbortSignal;
    }
) {
    if (url.startsWith("data:app")) {
        return fetch(url);
    }
    if (!isNative) return fetch(url, options);

    if (options?.signal?.aborted) throw new Error("ABORTED");

    const promise = CapacitorHttp.get({
        url,
        responseType: "arraybuffer",
        headers: Object.fromEntries((options?.headers as any)?.entries() ?? []),
    });
    const response = getResponse(promise);
    Object.defineProperty(response, "url", {
        get: () => url,
    });

    return response;
}
