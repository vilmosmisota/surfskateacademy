import { IncomingMessage } from "http";
import { supabase } from "../libs/supabase";

export async function protectedRoute({
  req,
}: {
  req: IncomingMessage & {
    cookies: Partial<{
      [key: string]: string;
    }>;
  };
}) {
  const { user, token } = await supabase.auth.api.getUserByCookie(req);
  if (typeof token === "string") {
    supabase.auth.setAuth(token);
  }
  return user;
}

type AuthUserProps = {
  email: string;
  password: string;
};

export const registerUser = async (props: AuthUserProps) => {
  const { user, error } = await supabase.auth.signUp({
    email: props.email,
    password: props.password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { user };
};

export const loginUser = async ({ email, password }: AuthUserProps) => {
  const { user, session, error } = await supabase.auth.signIn({
    email,
    password,
  });

  if (error) {
    throw new Error(error.message);
  }

  return { user, session };
};
