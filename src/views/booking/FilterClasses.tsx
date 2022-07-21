export default function FilterClasses({ cities }: { cities: string[] }) {
  console.log(cities);
  return (
    <section className="h-[120px] md:h-[100px] bg-orange rounded-t-lg py-2 px-5 flex flex-col-reverse items-center justify-evenly md:justify-evenly md:flex-row">
      <div className="flex items-center w-full max-w-xs justify-between">
        <label htmlFor="filter-class" className="text-sm capitalize">
          Filter by Location:
        </label>
        <select
          name="filter-class"
          id="filter-class"
          className="bg-orange rounded-lg border-black text-sm focus:border-red focus:ring-red"
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
          Prices
        </li>
        <li className="text-sm uppercase underline font-sans tracking-wider font-bold">
          FAQ
        </li>
        <li className="text-sm uppercase underline font-sans tracking-wider font-bold">
          T&apos;s and C&apos;s
        </li>
      </ul>
    </section>
  );
}
