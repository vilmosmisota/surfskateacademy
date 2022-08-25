import Image from "next/image";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation } from "swiper";

import ReactMarkdown from "react-markdown";
import { useWindowDimensions } from "../../utils/hooks";
import "swiper/css";
import "swiper/css/navigation";
import { IHighlights } from "../../interfaces";

export default function Highlights({
  highlights,
}: {
  highlights: IHighlights[];
}) {
  console.log(highlights);
  const { width } = useWindowDimensions();
  return (
    <section className="py-5 mx-4 lg:mx-auto md:mb-20 lg:px-0 max-w-screen-lg text-center">
      <h2 className="text-center font-black tracking-wide uppercase mb-6 md:mb-8">
        Some of our collaborations
      </h2>
      <Swiper
        modules={[Navigation]}
        spaceBetween={30}
        slidesPerView={width < 768 || highlights.length <= 1 ? 1 : 3}
        centeredSlides={false}
        navigation
        speed={500}
        effect={"flip"}
        className="!px-5 mb-10"
      >
        {highlights.map((item) => {
          return (
            <SwiperSlide key={item.fields.title}>
              <article className="bg-beige w-full mb-5 mx-auto h-fit overflow-hidden max-w-sm rounded-lg  text-center shadow">
                <div className="">
                  <Image
                    src={`https:${item.fields.featuredImage.fields.file.url}`}
                    width={
                      item.fields.featuredImage.fields.file.details.image.width
                    }
                    height={
                      item.fields.featuredImage.fields.file.details.image.height
                    }
                    layout="responsive"
                    alt=""
                  />
                </div>
                <div className="h-1/2    px-2 py-5">
                  <h3 className="mb-3 text-darkBlue uppercase ">
                    {item.fields.title}
                  </h3>
                  <ReactMarkdown className="mb-3 text-sm text-left px-2">
                    {item.fields.text}
                  </ReactMarkdown>
                </div>
              </article>
            </SwiperSlide>
          );
        })}
      </Swiper>
    </section>
  );
}
