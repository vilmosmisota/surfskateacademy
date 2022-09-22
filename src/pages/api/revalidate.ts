import type { NextApiRequest, NextApiResponse } from "next";

type Obj = {
  "en-US": string[] | string | undefined;
};

type ReqBody = {
  path: Obj;
  page: Obj;
  slug: Obj;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<
    | {
        revalidated: boolean;
      }
    | string
    | { message: string }
  >
) {
  if (req.query.secret !== process.env.NEXT_PUBLIC_REVALIDATE_TOKEN) {
    return res.status(401).json({ message: "Invalid token" });
  }

  const { path, slug, page } = req.body as ReqBody;
  const arr = [path, slug, page];
  const pathsRaw = getRawPaths(arr);
  const cleanedPath = cleanPaths(pathsRaw);
  console.log(cleanPaths);

  try {
    await revalidatePaths(cleanedPath, res);
  } catch (err) {
    return res.status(500).send("Error revalidating");
  }
}

function cleanPaths(pathsRaw: string[]) {
  if (pathsRaw.length === 0) return pathsRaw;
  const dynamicPath = pathsRaw.filter((item) => item.charAt(0) !== "/");
  const pageOnDynamicPath = pathsRaw.filter(
    (item) => item.charAt(item.length - 1) === "/" && item.length > 1
  );
  const normalPath = pathsRaw.filter((item) => {
    if (item.charAt(0) === "/") {
      return item;
    }
  });
  const finalPath = normalPath.map((item) => {
    if (item.charAt(item.length - 1) === "/" && item.length > 1) {
      const m = item.slice(0, -1);
      return m;
    }
    return item;
  });

  if (dynamicPath.length === 0) {
    return [...finalPath];
  }
  const paths = [...finalPath, `${pageOnDynamicPath[0]}${dynamicPath[0]}`];
  return paths;
}

function getRawPaths(arr: Obj[]) {
  const paths: Array<string[] | string> = [];
  arr.forEach((item) => {
    if (!item) return;
    const value = getValues(item as { "en-US": string | string[] });
    paths.push(value);
  });
  return paths.flat();
}

function getValues(item: { "en-US": string[] | string }) {
  return Object.values(item)[0];
}

async function revalidatePaths(paths: string[], res: NextApiResponse) {
  if (paths.length === 0) return;
  for (const path of paths) {
    await res.revalidate(path);
  }
  return res.json({ revalidated: true });
}
