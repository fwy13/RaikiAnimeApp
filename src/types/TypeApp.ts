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

export type DataSlide = {
    title: string;
    image: string;
    timeLastUpdate: string;
    href: string;
    newChap: string;
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

export type MangaHot = {
    title: string;
    href: string;
    image: string;
    view: string;
    comment: string;
    like: string;
    newChapter: string;
    timeUpdateNewChap: string;
};
export type Top = {
    title: string;
    href: string;
    image: string;
    top: string;
    newChapter: string;
    view: string;
};
export interface MangaSearch extends MangaHot {}
export type Category = { name: string; href: string; description: string };
export type listGenreAnime = {
    url: string;
    name: string;
};
export type animeSlide = {
    title: string;
    href: string;
    image: string;
    vote: string;
    currentEp: string;
    description: string;
    date: string;
    studio: string;
    tag?: string;
    genres: listGenreAnime[];
};
export type AnimeRecommend = {
    title: string;
    href: string;
    image: string;
    vote: string;
    currentEp: string;
    date: string;
    timeSchedule?: string;
};
export type listEpAnime = {
    idEp: string;
    href: string;
    dataPlay: string;
    dataMovie: string;
    dataSource: string;
    dataHash: string;
    nameEp: string;
};
type allSeason = {
    href: string;
    name: string;
};
export type Anime = {
    title: string;
    otherName: string;
    imageSrc: string;
    view: string;
    dateAnime: string;
    currentEp: string;
    averageScore: string;
    countRating: string;
    showTime: string;
    Season: string;
    country: string;
    studio: string;
    banner: string;
    description: string;
    trailer: string;
    listGenre: listGenreAnime[];
    allSeason: allSeason[];
    Related: Partial<animeSlide>[];
    listAllEpAnime: Partial<listEpAnime>[];
};
