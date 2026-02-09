import works from "../data/work";
import WorkCard from "./WorkCard";

export default function WorkSection() {
  const filteredWorks = works.filter((work) => work.selectedWorks === true);
  return (
    <section className="flex flex-col gap-1.5 w-full mt-10 ">
      <h3 className="font-mono uppercase text-sm font-medium px-2 text-black">
        [Featured works]
      </h3>
      <div className="grid relative z-10 col-start-1 col-end-13 md:grid-cols-3 grid-gap w-full gap-1.5">
        <div className="flex flex-col gap-3">
          {filteredWorks.slice(0, 1).map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {filteredWorks.slice(1, 2).map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
        <div className="flex flex-col gap-3">
          {filteredWorks.slice(2).map((work) => (
            <WorkCard key={work.id} work={work} />
          ))}
        </div>
      </div>
    </section>
  );
}
