import { decode } from "jsonwebtoken"

export const decodeToken = (token: string) => {
    if (token != "") {
        const tokenInfo = decode(token);
        console.log(tokenInfo)
        if (typeof tokenInfo != 'string' && tokenInfo) return tokenInfo.username;
    }
    return "";
}