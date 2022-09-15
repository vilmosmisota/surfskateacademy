import Image from "next/future/image";
import { IImage } from "../../interfaces";

type SmallHeaderProps = {
  image: IImage;
  title: string;
};

export default function SmallHeader({ image, title }: SmallHeaderProps) {
  return (
    <header className="mt-4 relative  max-w-screen-lg mx-auto  ">
      <div className="h-[250px] w-full px-4 lg:px-0 brightness-50">
        <Image
          src={`https:${image.fields.file.url}`}
          width={image.fields.file.details.image.width}
          height={image.fields.file.details.image.height}
          alt={""}
          className={" rounded-lg cover-img"}
        />
      </div>
      <div className="absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 text-center">
        <h1 className="text-orange max-w-[300px]">{title}</h1>
      </div>
    </header>
  );
}
