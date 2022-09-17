import Router from "next/router";

export default function BackButton() {
  return (
    <button
      className="border-2 font-sans font-bold border-black py-1 px-3 rounded-lg text-xs"
      onClick={() => Router.back()}
    >
      Go Back
    </button>
  );
}
