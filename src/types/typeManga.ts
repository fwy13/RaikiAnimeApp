export type DataManga = {
    title: string;
    image?: string;
    timeLastUpdate: string;
    author: string;
    status: string;
    otherName: string;
    viewManga: string;
    Rating: string;
    ratingCount: string;
    follower: string;
    typeManga: typeManga[];
    chapters: Chapter[];
};

export type DataChapters = {
    chapters: Chapter[];
    success: boolean;
};

export type Chapter = {
    chapterId: number;
    name: string;
    url: string;
};

export type typeManga = { urlType: string; nameType: string };

export type listImage = { page: number; image: string };

export type DataChapter = {
    title: string;
    chapter: string;
    listImage: listImage[];
};
export type typeWebSupport = { name: string; image: string; support: number };
