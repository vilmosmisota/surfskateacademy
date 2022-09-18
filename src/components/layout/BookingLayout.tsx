import BookingBar from "../navbar/BookingBar";

export default function BookingLayout({
  children,
}: JSX.ElementChildrenAttribute) {
  return (
    <main className=" pb-5 mb-10 md:mx-4  lg:mx-auto rounded-lg lg:px-0 max-w-screen-lg mt-4 relative z-[5] bg-beige border-orange">
      <BookingBar />
      <>{children}</>
    </main>
  );
}
