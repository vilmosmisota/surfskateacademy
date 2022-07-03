import MainHeader from "../../components/header/MainHeader";
import Mainintro from "../../components/intro/MainIntro";
import SliderClick from "../../components/slider/SliderClick";
import SliderDrag from "../../components/slider/SliderDrag";

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
      </main>
    </>
  );
}
