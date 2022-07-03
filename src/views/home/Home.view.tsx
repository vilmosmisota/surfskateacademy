import MainHeader from "../../components/header/MainHeader";
import Mainintro from "../../components/intro/MainIntro";
import SliderClick from "../../components/slider/SliderClick";
import SliderDrag from "../../components/slider/SliderDrag";
import Collaborations from "./Collaborations";

export default function HomeView() {
  return (
    <>
      <MainHeader />
      <section className="px-4 pt-2 -mt-10 mb-10 md:-mt-20 mx-auto lg:px-0 max-w-screen-lg text-right md:mb-14">
        <a
          href="https://yowsurf.com/"
          className="uppercase font-sans font-black cursor-pointer text-red"
          target="_blank"
          rel="noopener noreferrer"
        >
          Supported by <span className="text-black">YOW</span>
        </a>
      </section>
      <main>
        <Mainintro />
        <SliderDrag />
        <SliderClick />
        <Collaborations />
        <section className="px-4 mb-10 py-5 mx-4 lg:mx-auto rounded-lg lg:px-0 max-w-screen-lg bg-darkBlue text-center md:mb-20 min-h-[200px] flex flex-col items-center justify-center">
          <h2 className="max-w-sm lg:max-w-lg mx-auto text-light font-normal  tracking-wide mb-10">
            <span className="uppercase text-red font-black">One-to-one</span>{" "}
            and{" "}
            <span className="uppercase text-red font-black">
              Group coaching
            </span>{" "}
          </h2>
          <button className="bg-orange w-full p-2 font-black uppercase tracking-wide font-sans rounded-lg max-w-[200px]">
            Read more
          </button>
        </section>
      </main>
    </>
  );
}
