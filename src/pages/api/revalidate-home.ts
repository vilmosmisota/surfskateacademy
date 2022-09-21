import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    { revalidated: boolean; paths: string } | string | { message: string }
  >
) {
  // Check for secret to confirm this is a valid request
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const paths = req.body as string;

  try {
    await res.revalidate("/");
    return res.json({ revalidated: true, paths: paths });
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}
