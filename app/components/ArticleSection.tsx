export default function ArticleSection() {
  return (
    <section className="flex flex-col gap-1.5 w-full mt-10 ">
      <h3 className="font-mono uppercase font-normal px-3">Artlcles</h3>
      <div className="grid relative z-10 col-start-1 col-end-13 md:grid-cols-2 grid-gap w-full gap-1.5">
        <article className="flex gap-0.5 flex-col md:flex-row w-full">
          <div className="bg-[#F1EFEE] shrink-0 rounded-xl w-full md:w-[220] h-[300px] relative cursor-pointer"></div>
          <div className="flex flex-col gap-2 mt-2 px-3 h-full">
            <p className="text-lg font-medium text-black">
              Why Your E-commerce Store is Leaking Revenue: The Technical
              Essentials You&apos;re Missing
            </p>
            <ul className=" font-mono font-medium text-black/60 text-xs flex flex-wrap gap-1 max-w-[300]">
              <li className=" bg-[#F1EFEE] rounded-sm px-3 py-1.5 uppercase">
                Shopify
              </li>
              <li className=" bg-[#F1EFEE] rounded-sm px-3 py-1.5 uppercase">
                Productivity
              </li>
              <li className=" bg-[#F1EFEE] rounded-sm px-3 py-1.5 uppercase">
                1+
              </li>
            </ul>
            <p className="text-base font-normal text-black/70">
              I sit at the intersection of e-commerce, fashion, and technology.
              My work focuses on building robust digital storefronts that
              don`&apos;t just sell products, but tell a brand&apos;s story.
            </p>
            <div className="flex items-center gap-2">
              <span className="text-black/60 text-sm flex flex-row-reverse w-fit items-center gap-0.5 ">
                <p className="font-medium">31</p>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="1.3em"
                  height="1.3em"
                  viewBox="0 0 24 24"
                >
                  <g fill="none" fillRule="evenodd">
                    <path d="m12.593 23.258l-.011.002l-.071.035l-.02.004l-.014-.004l-.071-.035q-.016-.005-.024.005l-.004.01l-.017.428l.005.02l.01.013l.104.074l.015.004l.012-.004l.104-.074l.012-.016l.004-.017l-.017-.427q-.004-.016-.017-.018m.265-.113l-.013.002l-.185.093l-.01.01l-.003.011l.018.43l.005.012l.008.007l.201.093q.019.005.029-.008l.004-.014l-.034-.614q-.005-.018-.02-.022m-.715.002a.02.02 0 0 0-.027.006l-.006.014l-.034.614q.001.018.017.024l.015-.002l.201-.093l.01-.008l.004-.011l.017-.43l-.003-.012l-.01-.01z" />
                    <path
                      fill="currentColor"
                      d="M9.5 2.5c1.356 0 2.294.852 2.895 2.053c.522 1.045.571 2.3.597 3.447h4.834a3 3 0 0 1 2.99 3.25l-.361 4.331A7 7 0 0 1 13.479 22h-1.512a6.96 6.96 0 0 1-4.642-1.762a1.24 1.24 0 0 0-1.009-.298A5.5 5.5 0 0 1 5.5 20c-1.108 0-2.028-.62-2.624-1.608C2.296 17.432 2 16.107 2 14.5s.297-2.931.876-3.891C3.472 9.62 4.392 9 5.5 9c.281 0 .579.05.877.134c.458-1.2.784-2.437.63-3.735C6.835 3.954 8.016 2.5 9.5 2.5"
                    />
                  </g>
                </svg>
              </span>
              {/* <span className="text-black/60 ">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    width="1em"
                                    height="1em"
                                    viewBox="0 0 24 24"
                                >
                                    <g fill="none" stroke="currentColor" stroke-width="1.5">
                                        <circle cx="12" cy="12" r="10" />
                                        <ellipse cx="12" cy="12" rx="4" ry="10" />
                                        <path
                                            stroke-linecap="round"
                                            stroke-linejoin="round"
                                            d="M2 12h20"
                                        />
                                    </g>
                                </svg>
                            </span> */}
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
