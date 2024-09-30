'use server';

import { sign } from 'jsonwebtoken';

export const verifyToken = async (token: string) => {
    'use server';
    try {
        const verifyRes = await fetch('http://localhost:8080/api/checkToken', {
            method: 'GET',
            headers: {
                'token': token,
            },
            cache: 'no-store',
        })
        
        if (verifyRes.ok) {
            const result = await verifyRes.json();
            if (result === "authorized") return true;
            return false;
        }
    } catch (error) {
        console.log(error);
    }
    return false;
}

export const login = async (formdata: FormData): Promise<LoginResponse> => {
    'use server';
    
    const loginResult = {code: 0, msg: "登录失败，请联系管理员。", jwt: ""} as LoginResponse;
    const username = formdata.get('username');
    const password = formdata.get('password');
    try {
        // 调用注册 API
        const res = await fetch('http://localhost:8080/api/login', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password }),
            cache: "no-store",
        });

        if (res.ok) {
            loginResult.code = 1;
            loginResult.msg = "登录成功";
            loginResult.jwt = sign({username}, process.env.SECRET_TOKEN || '', { expiresIn: 5400});
        }
    } catch (error) {
        console.error(error);
    }
    return loginResult;
}

export const githubLogin = async (username: string, password: string = "", source: string = "github"): Promise<LoginResponse> => {
    const loginResult = {code: 0, msg: "Github第三方登录失败，请联系管理员。", jwt: ""} as LoginResponse;
    try {
        const res = await fetch('http://localhost:8080/api/register', {
            method: 'POST',
            headers: {
            'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username, password, source}),
            cache: "no-store",
        });
        
        if (res.ok || res.status === 412) {
            loginResult.code = 1;
            loginResult.msg = "登录成功";
            loginResult.jwt = sign({username}, process.env.SECRET_TOKEN || '', { expiresIn: 5400});
        } else if (res.status === 413) {
            loginResult.code = 2;
            loginResult.msg = "登录成功";
        }
    } catch (error) {
        console.log(error);
    }
    return loginResult;
}