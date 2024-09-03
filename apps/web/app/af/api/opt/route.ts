import { NextApiRequest, NextApiResponse } from "next";

export const GET = async(req: NextApiRequest, res: NextApiResponse) => {
  await new Promise((res: (value: unknown) => void) => setTimeout(() => res(''), 3000));
  res.status(500).json({ error: 'Internal Server Error' });
}