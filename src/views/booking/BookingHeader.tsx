import Image from "next/image";
import sample from "../../assets/sample/bookin.jpg";

export default function BookingHeader() {
  return (
    <header className="mt-16 relative  max-w-screen-lg mx-auto  ">
      <div className="h-[250px] w-full img-overlay">
        <Image
          src={sample}
          alt={"string"}
          layout={"fill"}
          objectFit={"cover"}
        />
      </div>
      <div className="absolute top-2/4 left-2/4 -translate-y-1/2 -translate-x-1/2 text-center">
        <h1 className="text-red max-w-[300px]">Book a class with us</h1>
      </div>
    </header>
  );
}
