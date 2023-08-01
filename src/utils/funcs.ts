export function getTimePassedFromUnixTimestamp(unixTimestamp: number): string {
    const currentTime = Date.now() / 1000; // Convert to seconds
    const timePassedInSeconds = Math.abs(currentTime - (unixTimestamp / 1000));

    const days = Math.floor(timePassedInSeconds / 86400);
    const remainingSeconds = timePassedInSeconds % 86400;

    const hours = Math.floor(remainingSeconds / 3600);
    const minutes = Math.floor((remainingSeconds % 3600) / 60);
    const seconds = Math.floor(remainingSeconds % 60);

    let formattedTime = `${hours}h:${minutes}m:${seconds}s`;
    if (days > 0) {
        formattedTime = `${days}d ${formattedTime}`;
    }

    return formattedTime;
}