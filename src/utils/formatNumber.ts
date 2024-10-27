export default function formatNumber(number: number) {
    if (Math.floor(number) < 10) {
        return `0${Math.floor(number)}`;
    } else {
        return `${Math.floor(number)}`;
    }
}


