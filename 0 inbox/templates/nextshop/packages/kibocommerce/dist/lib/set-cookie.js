export function setCookies(res, cookies) {
    res.setHeader("Set-Cookie", cookies);
}
