import { PostgrestError } from "@supabase/supabase-js";
import { IClass } from "../interfaces";
import { supabase } from "../libs/supabase";

export const getClasses = async (): Promise<{
  data: IClass[] | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await supabase.from<IClass>("class").select("*");

  return { data, error };
};
