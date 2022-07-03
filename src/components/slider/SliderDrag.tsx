import pin from "../../assets/icons/map-pin.svg";
import Link from "next/link";
import { motion } from "framer-motion";
import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import { useWindowDimensions } from "../../utils/hooks";

const items = [
  {
    id: 1,
    date: "26 Jun, 10:00 am",
    day: "Sunday",
    mapLink:
      "https://www.google.com/maps/place/Bristo+Square,+Edinburgh/@55.9455543,-3.1889257,17z/data=!3m1!4b1!4m5!3m4!1s0x4887c78490bf60d3:0xcaf9458b6160c3a3!8m2!3d55.9456805!4d-3.1888167",
    location: "Bristo Square, Edinburgh",
  },
  {
    id: 2,
    date: "28 Jun, 11:00 am",
    day: "Saturday",
    mapLink:
      "https://www.google.com/maps/place/Bristo+Square,+Edinburgh/@55.9455543,-3.1889257,17z/data=!3m1!4b1!4m5!3m4!1s0x4887c78490bf60d3:0xcaf9458b6160c3a3!8m2!3d55.9456805!4d-3.1888167",
    location: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 3,
    date: "28 Jun, 9:00 am",
    day: "Saturday",
    mapLink:
      "https://www.google.com/maps/place/Bristo+Square,+Edinburgh/@55.9455543,-3.1889257,17z/data=!3m1!4b1!4m5!3m4!1s0x4887c78490bf60d3:0xcaf9458b6160c3a3!8m2!3d55.9456805!4d-3.1888167",
    location: "Lorem ipsum dolor sit amet.",
  },
  {
    id: 4,
    date: "28 Jun, 9:00 am",
    day: "Saturday",
    mapLink:
      "https://www.google.com/maps/place/Bristo+Square,+Edinburgh/@55.9455543,-3.1889257,17z/data=!3m1!4b1!4m5!3m4!1s0x4887c78490bf60d3:0xcaf9458b6160c3a3!8m2!3d55.9456805!4d-3.1888167",
    location: "Lorem ipsum dolor sit amet.",
  },
];

export default function SliderDrag() {
  const { width } = useWindowDimensions();

  return (
    <section className=" bg-orange  mb-10 md:mb-20 py-5">
      <div className=" py-5 mx-4 lg:mx-auto lg:px-0 max-w-screen-lg text-center">
        <h2 className="text-center font-black tracking-wide uppercase mb-6 md:mb-8">
          Earliest available classes
        </h2>
        <Swiper
          modules={[Navigation]}
          spaceBetween={20}
          slidesPerView={width < 768 || items.length <= 1 ? 1 : 2}
          navigation
          className="!px-5 mb-8"
        >
          {items.map((item) => {
            return (
              <SwiperSlide key={item.id}>
                <article className="bg-lightBlue mx-auto  min-w-[250px] md:min-w-[300px] max-w-sm rounded-lg p-5 mb-5 text-center shadow">
                  <div className="border-2  border-red rounded-lg p-2 mb-5">
                    <h3>{item.date}</h3>
                    <p>{item.day}</p>
                  </div>
                  <a
                    href={item.mapLink}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <div className="border-2 border-red rounded-lg p-2 mb-5 flex justify-center flex-col min-h-[150px]">
                      <p className="mb-2 ">{item.location}</p>
                      <div className="w-7 text-center mx-auto">
                        <Image
                          src={pin as string}
                          alt="location"
                          layout="responsive"
                        />
                      </div>
                    </div>
                  </a>
                  <button className="bg-red w-full p-2 font-black uppercase tracking-wide font-sans rounded-lg">
                    Book
                  </button>
                </article>
              </SwiperSlide>
            );
          })}
        </Swiper>
        <Link href="/" passHref>
          <a className="capitalize underline underline-offset-2 font-semibold">
            See all classes
          </a>
        </Link>
      </div>
    </section>
  );
}
