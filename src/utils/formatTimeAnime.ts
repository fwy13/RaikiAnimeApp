export default function formatTimeAnime(time: string | undefined) {
    const date = new Date();

    const aWeek = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
    const aWeekVN = ["Hai", "Ba", "Tư", "Năm", "Sáu", "Bảy", "Nhật"];
    const AnimeDay = time?.split(" ")[2] ?? "";
    const indexAnimeDay = aWeekVN.indexOf(AnimeDay);
    const currentDay = date.toString().split(" ")[0];
    const indecCurrentDay = aWeek.indexOf(currentDay);
    const hourAnime = time?.split(" ")[5];
    const minutesAnime = time?.split(" ")[7];
    if (hourAnime !== undefined && minutesAnime !== undefined) {
        if (indecCurrentDay > indexAnimeDay) {
            return `Tập mới chiếu vào ${hourAnime}:${minutesAnime} tuần sau`;
        } else if (indecCurrentDay === indexAnimeDay) {
            return `Tập mới chiếu vào ${hourAnime}:${minutesAnime} hôm nay`;
        } else {
            return `Tập mới chiếu vào ${hourAnime}:${minutesAnime} tuần này`;
        }
    } else {
        return "Phim đã được cập nhật đầy đủ."
    }
}
