import Image from "next/image";
import { useState } from "react";
import SliderClickBtn from "./SliderClickBtn";
import { ICarousel } from "../../interfaces";

export default function SliderClick({ carousel }: { carousel: ICarousel[] }) {
  const [position, setPosition] = useState(0);
  const handleClick = (newposition: number) => setPosition(newposition);

  return (
    <section className="  mx-auto lg:px-0 max-w-screen-lg mb-10 md:mb-20">
      <article className="flex flex-col-reverse lg:flex-row">
        <div className="w-full -mt-[10%] z-0 lg:mt-14 lg:-mr-5">
          <Image
            src={`https:${carousel[position].fields.image.fields.file.url}`}
            width={
              carousel[position].fields.image.fields.file.details.image.width
            }
            height={
              carousel[position].fields.image.fields.file.details.image.height
            }
            alt={carousel[position].fields.image.fields.title}
            layout="responsive"
          />
        </div>
        <div className="bg-darkBlue relative min-h-[330px]  lg:min-h-[390px] flex flex-col justify-center rounded-lg px-6 mx-4 md:pt-12 pb-8 shadow z-10 h-min lg:mx-0">
          <div className="max-w-2xl w-full mx-auto ">
            <h2 className="uppercase font-black  text-red pb-2 tracking-wide lg:text-2xl">
              {carousel[position].fields.contentTitle}
            </h2>
            <p className="text-light text-sm md:text-base">
              {carousel[position].fields.description}
            </p>
          </div>
          <div className="absolute bottom-5 left-2/4 -translate-x-2/4 flex justify-center align-middle pt-5">
            {carousel.map((btn, i) => {
              return (
                <SliderClickBtn
                  key={btn.fields.contentTitle}
                  id={i}
                  index={i}
                  position={position}
                  handleClick={handleClick}
                />
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
}
