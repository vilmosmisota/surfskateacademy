import { useRouter } from "next/router";

export default function BackButton() {
  const router = useRouter();
  return (
    <button
      className="border border-black py-1 px-3 rounded-lg text-xs"
      onClick={() => router.back()}
    >
      &#8592; Back
    </button>
  );
}
