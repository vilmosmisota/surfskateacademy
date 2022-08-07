import { PostgrestError } from "@supabase/supabase-js";
import { IBooking, IClass } from "../interfaces";
import { supabase } from "../libs/supabase";

export const getClasses = async (): Promise<{
  data: IClass[] | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await supabase.from<IClass>("class").select("*");

  return { data, error };
};

export const getClassesById = async (
  id: string
): Promise<{
  data: IClass | null;
  error: PostgrestError | null;
}> => {
  const { data, error } = await supabase
    .from<IClass>("class")
    .select("*")
    .eq("class_id", id)
    .single();

  return { data, error };
};

export const getNumOfUnreadBookings = async (): Promise<{
  count: number | null;
}> => {
  const { count, error } = await supabase
    .from<IBooking>("booking")
    .select("*", { count: "exact", head: true })
    .match({ is_read: false });
  if (error) {
    throw new Error(error.message);
  }
  return { count };
};

export const getAllBookings = async (): Promise<{
  data: IBooking[] | null;
}> => {
  const { data, error } = await supabase
    .from<IBooking>("booking")
    .select("created_at,booking_id,email,is_read , class(date,city)");

  if (error) {
    throw new Error(error.message);
  }

  return { data };
};

export const getAllBookingsById = async (
  id: string
): Promise<{
  data: IBooking | null;
}> => {
  const { data, error } = await supabase
    .from<IBooking>("booking")
    .select("*, class(date,city, location)")
    .eq("booking_id", id)
    .single();

  if (error) {
    throw new Error(error.message);
  }

  return { data };
};
