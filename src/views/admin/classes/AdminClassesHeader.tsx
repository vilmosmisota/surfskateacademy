/* eslint-disable @typescript-eslint/no-misused-promises */
import { useState } from "react";
import BackButton from "../../../components/buttons/BackButton";

type FilterClassesProps = {
  cities: string[];
  handleSelectFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function AdminClassesHeader({
  cities,
  handleSelectFilter,
}: FilterClassesProps) {
  const [isLoading, setLoading] = useState(false);
  const [isPublished, setPublished] = useState(false);
  const publishOnClick = async () => {
    setLoading(true);
    const token = process.env.NEXT_PUBLIC_REVALIDATE_TOKEN as string;
    const res = await fetch(`/api/revalidate?secret=${token}`);
    if (res.status === 200) {
      setLoading(false);
      setPublished(true);
    }
  };
  return (
    <section className=" bg-orange min-h-[150px] md:min-h-[100px] relative rounded-t-lg py-2 px-5 flex flex-col-reverse items-center justify-evenly md:justify-evenly md:flex-row">
      <div className="absolute top-2 left-2">
        <BackButton />
      </div>
      <div className="flex items-center w-full max-w-xs justify-between">
        <label htmlFor="filter-class" className="text-sm capitalize">
          Filter by Location:
        </label>
        <select
          name="filter-class"
          id="filter-class"
          onChange={handleSelectFilter}
          className="bg-orange rounded-lg uppercase border-black text-sm focus:border-red focus:ring-red"
        >
          <option value="all">all</option>
          {cities.map((item, key) => {
            if (item === "") return;
            return (
              <option className="text-sm" key={key} value={item.toLowerCase()}>
                {item.toUpperCase()}
              </option>
            );
          })}
        </select>
      </div>
      <div className="relative">
        <button
          onClick={() => publishOnClick()}
          className="uppercase underline underline-offset-2 font-black"
        >
          {!isLoading ? "Publish Changes" : "...loading"}
        </button>

        {isPublished && (
          <div className="bg-dark absolute top-0 left-0 z-20 w-full text-center p-5 rounded-lg bg-opacity-70 backdrop-blur-xl">
            <p className="text-light">Successfully published</p>
            <button
              onClick={() => setPublished(false)}
              className="text-light border rounded-md py-1 px-2"
            >
              ok
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
