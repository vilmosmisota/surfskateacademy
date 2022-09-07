import Router from "next/router";

export default function BackButton() {
  return (
    <button
      className="border border-black py-1 px-3 rounded-lg text-xs"
      onClick={() => Router.back()}
    >
      &#8592; Back
    </button>
  );
}
