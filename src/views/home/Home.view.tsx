import MainHeader from "../../components/header/MainHeader";
import Mainintro from "../../components/intro/MainIntro";
import SliderDrag from "../../components/slider/SliderDrag";

export default function HomeView() {
  return (
    <>
      <MainHeader />
      <section className="px-4 py-5 my-5 mx-auto lg:px-0 max-w-screen-lg text-right">
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
      </main>
    </>
  );
}
