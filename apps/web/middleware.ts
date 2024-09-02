import { NextRequest, NextResponse } from "next/server";

export const middleware = (request: NextRequest) => {
    const url = request.nextUrl.clone();
    console.log(`Url: ${url}`);
    if (request.headers.get('accept-language')?.startsWith('zh-CN')) {
        if (!url.pathname.endsWith('/cn')) {
            url.pathname = `${url.pathname}/cn`;
            return NextResponse.redirect(url)
        }
    } else {
        if (!url.pathname.endsWith('/en')) {
            url.pathname = `${url.pathname}/en`;
            return NextResponse.redirect(url)
        }
    }
};

export const config = {
    matcher: '/af/:path'
};