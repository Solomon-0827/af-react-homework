'use server';

import { sign } from "jsonwebtoken";

export const createToken = (username: string) => {
  return sign({username}, process.env.SECRET_TOKEN || '', { expiresIn: 5400});
}

export const registerNewUser = async (formData: FormData, status?: string): Promise<RegisterResponse> => {
  'use server';

  const registerResult = { code: 0, msg: '注册失败，请联系管理员。' } as RegisterResponse;
  const username = formData.get('username') as string;
  const password = formData.get('password') as string;
  if (!status || status === "unauthenticated") {
    const source = "regular";
    if (username.trim() != '' && password.length >= 6) {
      try {
        const res = await fetch('http://localhost:8080/api/register', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password, source }),
        });
  
        const data = await res.json();
  
        if (res.ok) {
          registerResult.code = 1;
          registerResult.msg = "注册成功";
        }
      } catch (error) {
        console.error(error);
      }
    }
  } else {
    if (username.trim() != '' && password.length >= 6) {
      try {
        const res = await fetch('http://localhost:8080/api/resetPassword', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ username, password }),
        });
  
        if (res.ok) {
          registerResult.code = 1;
          registerResult.msg = "注册成功";
          registerResult.jwt = sign({username}, process.env.SECRET_TOKEN || '', { expiresIn: 5400});
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
  return registerResult;
};