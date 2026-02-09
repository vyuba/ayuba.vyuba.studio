import { NavLinks } from "../data/constant";

export default function Navbar() {
  return (
    <div
      className={`w-full fixed transition-all duration-300 ease-in-out ${true ? "top-0" : "top-[70dvh]"} left-0 flex items-center justify-center z-50 p-3`}
    >
      <nav className="bg-[#F1EFEE] flex items-center w-full md:max-w-[300] font-mono uppercase py-3 px-3.5 text-black/70 gap-3">
        <ul className=" items-center text-xs font-medium w-full justify-between text-black/60 flex">
          {NavLinks.menu.map((item, index) => (
            <li
              key={item.id}
              className={` cursor-pointer flex items-center ${index === 0 ? "text-black" : ""}`}
            >
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
        {/* <button onClick={toggleMenu} className="md:hidden text-black/70">
          {isMenuOpen ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="1.5em"
              height="1.5em"
              viewBox="0 0 24 24"
            >
              <path
                fill="none"
                stroke="currentColor"
                stroke-linecap="round"
                stroke-linejoin="round"
                stroke-width="2"
                d="M18 6L6 18M6 6l12 12"
              />
            </svg>
          )}
        </button> */}
      </nav>
    </div>
  );
}
