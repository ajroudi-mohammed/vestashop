export function getCookieExpirationDate(maxAgeInDays) {
    const today = new Date();
    const expirationDate = new Date();
    const cookieExpirationDate = new Date(expirationDate.setDate(today.getDate() + maxAgeInDays));
    return cookieExpirationDate;
}
