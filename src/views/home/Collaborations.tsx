import Image from "next/image";
import one from "../../assets/sample/1.svg";
import two from "../../assets/sample/2.svg";
import three from "../../assets/sample/3.svg";
import four from "../../assets/sample/4.svg";

const logos = [
  {
    src: one as string,
    link: "/",
  },
  {
    src: two as string,
    link: "/",
  },
  {
    src: three as string,
    link: "/",
  },
  {
    src: four as string,
    link: "/",
  },
];

export default function Collaborations() {
  return (
    <section className="py-5 mx-4 lg:mx-auto md:mb-20 lg:px-0 max-w-screen-lg text-center">
      <h2 className="text-center font-black tracking-wide uppercase mb-6 md:mb-8">
        Some of our collaborations
      </h2>
      <div className="px-5 border-4  border-red rounded-lg flex flex-wrap justify-center min-h-[200px] py-10">
        {logos.map((logo) => (
          <div key={logo.src} className="w-20 mx-3">
            <Image src={logo.src} alt="name" layout="responsive" />
          </div>
        ))}
      </div>
    </section>
  );
}
