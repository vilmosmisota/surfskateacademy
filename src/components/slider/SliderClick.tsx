import sample from "../../assets/img/sample.jpg";
import Image from "next/image";
import { useState } from "react";

const contents = [
  {
    id: 1,
    img: sample,
    title: "At the surfskate academy",
    content:
      "Lorem ipsum dolor sit, amet consectetur adipisicing elit. Accusantium, error? Est, excepturi placeat cum provident ea quibusdam aspernatur. Itaque eius, et soluta vel facilis quidem cumque excepturi iure repellat nam!",
  },
  {
    id: 2,
    img: sample,
    title: "Lorem Ipsum Hello",
    content:
      " placeat cum provident ea quibusdam aspernatur. Itaque eius, et soluta vel facilis quidem cumque excepturi iure repellat nam!",
  },
];

export default function SliderClick() {
  const [index, setIndex] = useState(0);
  return (
    <section className="  mx-auto lg:px-0 max-w-screen-lg mb-10 md:mb-20">
      <article className="flex flex-col-reverse lg:flex-row">
        <div className="w-full -mt-[10%] z-0 lg:mt-14">
          <Image src={contents[index].img} alt="location" layout="responsive" />
        </div>
        <div className="bg-darkBlue rounded-lg px-6 mx-4 py-12 shadow z-10 h-min lg:-ml-6">
          <div className="max-w-lg mx-auto mb-4">
            <h2 className="uppercase font-black max-w-[150px] text-red pb-2 tracking-wide">
              {contents[index].title}
            </h2>
            <p className="text-light">{contents[index].content}</p>
          </div>
          <div className="flex justify-center align-middle">
            {contents.map((el, i) => {
              return (
                <button
                  onClick={() => setIndex(i)}
                  key={el.id}
                  className="w-5 h-5 mx-1 border-2 rounded-full border-red"
                ></button>
              );
            })}
          </div>
        </div>
      </article>
    </section>
  );
}
