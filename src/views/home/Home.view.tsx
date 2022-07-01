import Image from "next/image";
import homeHeader from "../../assets/img/homeHeader.jpg";
import pin from "../../assets/icons/map-pin.svg";
import Link from "next/link";

export default function HomeView() {
  return (
    <>
      <header className="mt-16 md:mt-24 relative ">
        <section className="flex lg:h-[80vh] px-4 lg:px-0 align-top max-w-screen-lg mx-auto justify-start flex-col-reverse lg:justify-between lg:flex-row lg:align-middle">
          <div className="text-center lg:text-left  relative z-20 my-10 self-center md:m-0 max-w-sm lg:max-w-lg mx-auto lg:self-end md:my-10 lg:mb-20">
            <h1 className="font-black tracking-wide">
              ON LAND SURF TRAINING FOR ALL LEVELS OF SURFERS IN SCOTLAND
            </h1>
          </div>
          <div className="w-full max-w-[480px] lg:m-0 mx-auto lg:self-end relative z-20 shadow-sm shadow-dark lg:shadow-none">
            <Image
              src={homeHeader}
              alt="logo"
              layout="responsive"
              className=""
            />
          </div>
        </section>

        <div className="absolute  w-full h-[50%] md:h-[60%] bottom-0 left-0 bg-orange z-0"></div>
      </header>
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
        <section className="px-4 mb-10 py-5 mx-4 lg:mx-auto rounded-lg lg:px-0 max-w-screen-lg bg-darkBlue text-center">
          <h2 className="max-w-sm lg:max-w-lg mx-auto text-light font-normal  tracking-wide">
            Surfskate training helps you to{" "}
            <span className="uppercase text-red font-black">
              Improve Your Surfing
            </span>{" "}
            and <span className="uppercase text-red font-black">Stay Fit</span>{" "}
            during the flat periods.
          </h2>
        </section>
        <section className=" bg-orange  mb-10 py-5">
          <div className=" py-5 mx-4 lg:mx-auto lg:px-0 max-w-screen-lg text-center">
            <h2 className="text-center font-black tracking-wide uppercase mb-4">
              Earliest available classes
            </h2>
            <article className="bg-lightBlue rounded-lg p-5 mb-5 text-center shadow-md shadow-black">
              <h3 className="border-2  border-red rounded-lg block p-2 mb-5">
                26 Jun, 10:00 am
              </h3>
              <div className="border-2 border-red rounded-lg p-2 mb-5 flex justify-center flex-col min-h-[150px]">
                <p className="mb-2 ">Bristo Square, Edinburgh</p>
                <div className="w-7 text-center mx-auto">
                  <Image
                    src={pin as string}
                    alt="location"
                    layout="responsive"
                  />
                </div>
              </div>
              <button className="bg-red w-full p-2 font-black uppercase tracking-wide font-sans rounded-lg">
                Book
              </button>
            </article>
            <Link href="/" passHref>
              <a className="capitalize underline underline-offset-2 font-semibold">
                See all classes
              </a>
            </Link>
          </div>
        </section>
      </main>
    </>
  );
}
