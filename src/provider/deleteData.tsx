import { supabase } from "../libs/supabase";

export const deleteBooking = async (
  id: string
): Promise<{
  res: string;
}> => {
  const { error } = await supabase
    .from("booking")
    .delete()
    .eq("booking_id", id);

  if (error) {
    throw new Error(error.message);
  }

  return { res: "success" as string };
};
