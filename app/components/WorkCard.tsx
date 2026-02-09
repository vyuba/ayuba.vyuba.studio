import { LockFilledIcon } from "@shopify/polaris-icons";
import works from "../data/work";

type Work = (typeof works)[0];
export default function WorkCard({ work }: { work: Work }) {
  return (
    <article className="group/work-card cursor-pointer" key={work.id}>
      <div className="bg-[#F1EFEE] rounded-xl w-full h-[500px] relative cursor-pointer">
        <ul className="absolute right-4 top-4 flex flex-wrap gap-1">
          {work.commingSoon ? (
            <li className=" text-xs font-medium font-mono items-center justify-center flex gap-0.5 text-black/70 h-fit  bg-white rounded-sm px-3 py-1.5 uppercase w-fit">
              <span className="text-black/60 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14px"
                  height="14px"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <ellipse cx="12" cy="12" rx="4" ry="10" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 12h20"
                    />
                  </g>
                </svg>
              </span>
              <p>view Case study</p>
            </li>
          ) : (
            <li className=" text-xs font-medium font-mono items-center justify-center flex gap-0.5 text-black/70 h-fit bg-white rounded-sm px-3 py-1.5 uppercase w-fit">
              <LockFilledIcon width={18} fill="currentColor" />
              <p>comming soon</p>
            </li>
          )}
          {work.liveLink ? (
            <li className=" text-xs font-medium font-mono items-center justify-center flex gap-0.5 text-black/70 h-fit  bg-white rounded-sm px-3 py-1.5 uppercase w-fit">
              <span className="text-black/60 ">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="14px"
                  height="14px"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" stroke="currentColor" strokeWidth="1.5">
                    <circle cx="12" cy="12" r="10" />
                    <ellipse cx="12" cy="12" rx="4" ry="10" />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      d="M2 12h20"
                    />
                  </g>
                </svg>
              </span>
              <p>view Live</p>
            </li>
          ) : (
            ""
          )}
        </ul>
        <ul className="absolute md:opacity-0 opacity-100 backdrop-blur-3xl group-hover/work-card:opacity-100 group/work-card:backdrop-blur-none duration-300 flex transition-all bottom-4 text-black/60 font-mono font-medium left-4 text-xs flex-wrap gap-1 max-w-[300]">
          {work.skills.map((skill: string) => (
            <li
              key={skill}
              className=" bg-white rounded-sm px-3 py-1.5 uppercase"
            >
              {skill}
            </li>
          ))}
          <li className=" bg-white rounded-sm px-3 py-1.5 uppercase">3+</li>
        </ul>
      </div>
      <div className="flex flex-col gap-0.5 mt-2 px-3">
        <p className="text-base font-medium text-black capitalize">
          {work.title}
        </p>
        <p className="text-xs font-medium text-black/60 font-mono uppercase">
          {work.type}
        </p>
      </div>
    </article>
  );
}
