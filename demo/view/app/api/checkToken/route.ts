import { verify, JwtPayload, TokenExpiredError } from 'jsonwebtoken';
import { headers } from "next/headers";
import { NextResponse } from "next/server";

const checkJWT = () => {
    const jwt = headers().get('token');
    if (jwt && jwt !== '') {
        try {
            const token = verify(jwt, process.env.SECRET_TOKEN || '') as JwtPayload;
            if (typeof token !== 'string') {
                return true;
            }
        } catch (error) {
            if (error instanceof TokenExpiredError) {
                console.log('Token 已过期');
            } else {
                console.log('Token 验证失败:', error.message);
            }
        }
    }
    return false;
}

export const GET = () => {
    if (checkJWT()) {
        return NextResponse.json('authorized');
    } else {
        return NextResponse.json('unauthorized');
    }
}