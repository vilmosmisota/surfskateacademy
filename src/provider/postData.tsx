import { PostgrestError } from "@supabase/supabase-js";
import { IBooking } from "../interfaces";
import { supabase } from "../libs/supabase";

export const postBooking = async (
  payload = {}
): Promise<{
  data: IBooking[] | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await supabase
    .from<IBooking>("booking")
    .insert(payload);

  return { data, error };
};
