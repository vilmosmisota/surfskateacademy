import { PostgrestError } from "@supabase/supabase-js";
import { IBooking, IClass } from "../interfaces";
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

export const postClass = async (
  payload = {}
): Promise<{
  data: IClass[] | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await supabase.from<IClass>("class").insert(payload);

  return { data, error };
};

export const updateIsRead = async (
  id: string | undefined
): Promise<{
  res: string;
}> => {
  const { error } = await supabase
    .from<IBooking>("booking")
    .update({ is_read: true })
    .match({ booking_id: id });

  if (error) {
    throw new Error(error.message);
  }

  return { res: "success" as string };
};

export const updateClass = async (
  id: string | undefined,
  payload: IClass
): Promise<{
  res: string;
}> => {
  const { error } = await supabase
    .from<IClass>("class")
    .update(payload)
    .match({ class_id: id });

  if (error) {
    throw new Error(error.message);
  }

  return { res: "success" as string };
};
