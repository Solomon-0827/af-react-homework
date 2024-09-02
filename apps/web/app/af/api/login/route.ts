import { redirect } from "next/navigation";
import { NextRequest, NextResponse } from "next/server"

const getCookieValue = (cookies: string, name: string) => {
  const cookiesList = cookies.split('; ');
  for (let cookie of cookiesList) {
    const [key, value] = cookie.split('=');
    if (key === name) {
      return value;
    }
  }
  return null;
}

export const POST = async (request: NextRequest, { params }: { params: { id: string } }) => {
  const formData = await request.formData();
  const pw = formData.get('password')?.toString();
  const local = request.headers.get('accept-language')?.startsWith('zh-CN') ? "cn" : "en";

  const cookies = request.cookies.toString();
  const name = getCookieValue(cookies, "name");

  if (pw !== '123') {
    redirect(`/af/${local}/123`);
  } else {
    if (name !== 'af') {
      redirect('https://www.baidu.com/');
    } else {
      redirect(`/af/${local}/demo`);
    }
  }
}