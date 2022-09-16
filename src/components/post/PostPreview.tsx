import Image from "next/future/image";
import { IHighlights } from "../../interfaces";
import DelayedLinkBtn from "../buttons/DelayedLinkBtn";

export default function PostPreview({ item }: { item: IHighlights }) {
  return (
    <article
      key={item.fields.title}
      className="bg-beige pb-5 w-full mb-5 mx-auto touch-none h-fit overflow-hidden max-w-sm rounded-lg  text-center shadow"
    >
      <div>
        <Image
          src={`https:${item.fields.previewImage.fields.file.url}`}
          width={item.fields.previewImage.fields.file.details.image.width}
          height={item.fields.previewImage.fields.file.details.image.height}
          sizes="(max-width: 470px) 90vw,
                      (max-width: 765px) 70vw,
              33vw"
          alt=""
          className="cover-img"
        />
      </div>
      <div className="  px-2 py-5  h-[180px]">
        <h3 className="mb-3 text-darkBlue uppercase ">{item.fields.title}</h3>
        <p className="mb-3 text-sm text-left px-2">{item.fields.introText}</p>
      </div>
      <div>
        <DelayedLinkBtn
          href={`/highlights/${item.fields.slug}`}
          theme="primary-btn text-sm"
        >
          see more
        </DelayedLinkBtn>
      </div>
    </article>
  );
}
