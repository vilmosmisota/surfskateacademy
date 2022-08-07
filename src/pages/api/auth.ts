import { supabase } from "../../libs/supabase";
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  message: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  supabase.auth.api.setAuthCookie(req, res);
}
