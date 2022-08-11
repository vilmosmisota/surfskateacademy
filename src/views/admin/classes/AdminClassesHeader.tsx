import BackButton from "../../../components/buttons/BackButton";

type FilterClassesProps = {
  cities: string[];
  handleSelectFilter: (e: React.ChangeEvent<HTMLSelectElement>) => void;
};

export default function AdminClassesHeader({
  cities,
  handleSelectFilter,
}: FilterClassesProps) {
  return (
    <section className=" bg-orange relative rounded-t-lg py-2 px-5 flex flex-col-reverse items-center justify-evenly md:justify-evenly md:flex-row">
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
      <div></div>
    </section>
  );
}
