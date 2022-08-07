/* eslint-disable @typescript-eslint/no-misused-promises */
/* eslint-disable @typescript-eslint/no-floating-promises */
import { useRouter } from "next/router";

import Input from "../../components/forms/Input";
import { loginUser } from "../../provider/auth";

const LOGIN_FIELDS = [
  {
    label: "email",
    name: "email",
    inputType: "email",
    isRequired: true,
    placeholder: "email",
  },
  {
    label: "password",
    name: "password",
    inputType: "password",
    isRequired: true,
    placeholder: "password",
  },
];

export default function LoginView() {
  const router = useRouter();

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const { email, password } = Object.fromEntries(formData);
    const payload = {
      email: email.toString().toLowerCase(),
      password: password.toString(),
    };
    const { user } = await loginUser(payload);

    if (user !== null) {
      router.push("/admin");
    }
  };

  return (
    <main className="mt-16 relative  max-w-screen-lg mx-auto px-4 lg:px-0 mb-20">
      <header className="text-center mb-10">
        <h1>Login</h1>
      </header>
      <form
        onSubmit={handleSubmit}
        className="w-full text-center mx-auto max-w-md bg-orange rounded-lg px-4 py-6"
      >
        {LOGIN_FIELDS.map((f) => (
          <Input
            key={f.name}
            inputType={f.inputType}
            name={f.name}
            isRequired={f.isRequired}
            label={f.label}
            placeholder={f.placeholder}
          />
        ))}
        <button
          className="mt-4  py-2 px-6 bg-green uppercase font-bold tracking-wider rounded-lg min-w-[125px] shadow"
          type="submit"
        >
          login
        </button>
      </form>
    </main>
  );
}
