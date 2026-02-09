import { NavLinks } from "@/app/data/constant";

export default function Footer() {
  return (
    <footer className="w-full py-5 flex flex-col gap-10">
      <div className="w-full max-w-4xl mx-auto min-h-52 bg-[#F1EFEE] rounded-md p-5 flex flex-wrap gap-10 justify-between">
        <nav className="flex flex-col gap-2">
          <p className="text-black font-mono text-sm uppercase font-medium">
            Menu
          </p>
          <ul className="text-black/70 font-mono text-sm uppercase cursor-pointer gap-1 flex flex-col">
            {NavLinks.menu.map((item) => (
              <li key={item.id} className="flex items-center">
                {item.title}
                {item.beta ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m13 2l.018.001l.016.001l.083.005l.011.002h.011l.038.009l.052.008l.016.006l.011.001l.029.011l.052.014l.019.009l.015.004l.028.014l.04.017l.021.012l.022.01l.023.015l.031.017l.034.024l.018.011l.013.012l.024.017l.038.034l.022.017l.008.01l.014.012l.036.041l.026.027l.006.009c.12.147.196.322.218.513l.001.012l.002.041L14 3v6h5a1 1 0 0 1 .868 1.497l-.06.091l-8 11C11.24 22.371 10 21.968 10 21v-6H5a1 1 0 0 1-.868-1.497l.06-.091l8-11l.01-.013l.018-.024l.033-.038l.018-.022l.009-.008l.013-.014l.04-.036l.028-.026l.008-.006a1 1 0 0 1 .402-.199l.011-.001l.027-.005l.074-.013l.011-.001l.041-.002z"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </nav>
        <nav className="flex flex-col gap-2">
          <p className="text-black font-mono text-sm uppercase font-medium">
            Archive
          </p>
          <ul className="text-black/70 font-mono text-sm uppercase cursor-pointer gap-1 flex flex-col">
            {NavLinks.footer.map((item) => (
              <li key={item.id} className="flex items-center">
                {item.title}
                {item.beta ? (
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="1em"
                    height="1em"
                    viewBox="0 0 24 24"
                  >
                    <path
                      fill="currentColor"
                      d="m13 2l.018.001l.016.001l.083.005l.011.002h.011l.038.009l.052.008l.016.006l.011.001l.029.011l.052.014l.019.009l.015.004l.028.014l.04.017l.021.012l.022.01l.023.015l.031.017l.034.024l.018.011l.013.012l.024.017l.038.034l.022.017l.008.01l.014.012l.036.041l.026.027l.006.009c.12.147.196.322.218.513l.001.012l.002.041L14 3v6h5a1 1 0 0 1 .868 1.497l-.06.091l-8 11C11.24 22.371 10 21.968 10 21v-6H5a1 1 0 0 1-.868-1.497l.06-.091l8-11l.01-.013l.018-.024l.033-.038l.018-.022l.009-.008l.013-.014l.04-.036l.028-.026l.008-.006a1 1 0 0 1 .402-.199l.011-.001l.027-.005l.074-.013l.011-.001l.041-.002z"
                    />
                  </svg>
                ) : (
                  ""
                )}
              </li>
            ))}
          </ul>
        </nav>
        <div className="w-full max-w-sm flex flex-col rounded-sm overflow-hidden">
          <a
            href="https://cal.com/vyuba.studio/15min"
            className="bg-black text-white p-4 cursor-pointer"
          >
            <p className="text-sm font-mono">
              REACH OUT TO ME - LETS WORK TOGETHER
            </p>
            <span className="text-sm text-white/70 ">25 min - Cal.com</span>
          </a>
          <a
            href="mailto:vyuba.studio@gmail.com"
            className="uppercase font-medium bg-white w-full cursor-pointer text-black/60 text-sm font-mono text-center p-2"
          >
            mail me
          </a>
        </div>
      </div>
      <div className="w-full flex items-center justify-between text-black/70 font-mono text-xs uppercase font-medium relative">
        <p>© vyuba, 2025.</p>
        <button className="uppercase hidden md:block bg-[#F1EFEE] py-1.5 px-2 cursor-pointer absolute bottom-0 left-[50%] -translate-x-1/2">
          Back to top
        </button>
        <p>All rights reserved, all I Think so.</p>
      </div>
    </footer>
  );
}
