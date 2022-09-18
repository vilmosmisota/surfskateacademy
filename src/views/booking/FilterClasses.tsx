import Link from "next/link";

type FilterClassesProps = {
  cities: string[];
  handleSelectFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function FilterClasses({
  cities,
  handleSelectFilter,
}: FilterClassesProps) {
  return (
    <section className="h-[120px] md:h-[100px] bg-orange rounded-t-lg py-2 px-5 flex flex-col-reverse items-center justify-evenly md:justify-evenly md:flex-row">
      <div className="flex border p-2 rounded-lg items-center w-full max-w-xs justify-between">
        <label
          htmlFor="filter-class"
          className="text-sm uppercase tracking-wide font-semibold"
        >
          Filter by Location:
        </label>
        <select
          name="filter-class"
          id="filter-class"
          onChange={handleSelectFilter}
          className="bg-beige rounded-lg border-none text-sm focus:border-red focus:ring-red"
        >
          <option value="all">all</option>
          {cities.map((item, key) => {
            if (item === "") return;
            return (
              <option className="text-sm" key={key} value={item.toLowerCase()}>
                {item}
              </option>
            );
          })}
        </select>
      </div>

      <ul className="flex items-center w-full max-w-xs justify-between md:justify-evenly">
        <li className="text-sm uppercase underline font-sans tracking-wider font-bold">
          <Link href="/booking/details/prices">Prices</Link>
        </li>
        <li className="text-sm uppercase underline font-sans tracking-wider font-bold">
          <Link href="/booking/details/faq">FAQ</Link>
        </li>
        <li className="text-sm uppercase underline font-sans tracking-wider font-bold">
          <Link href="/booking/details/terms-and-conditions">
            T&apos;s and C&apos;s
          </Link>
        </li>
      </ul>
    </section>
  );
}
