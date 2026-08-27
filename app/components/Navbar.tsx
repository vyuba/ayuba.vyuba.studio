import { memo } from "react";
import { NavLinks } from "../data/constant";

function NavbarComponent() {
  return (
    <div
      className="w-full fixed transition-all duration-300 ease-in-out top-0 left-0 flex items-start md:items-center md:justify-center z-50 p-3 md:p-5"
    >
      <nav className="bg-[#c6c6c6]/30 flex items-center max-w-fit font-inter-tight capitalize p-0.5 rounded-full text-black/70">
        <ul className="items-center text-base md:text-sm font-medium w-full justify-between text-black/60 flex">
          {NavLinks.menu.map((item, index) => (
            <li
              key={item.id}
              className={`px-2.5 py-0.5 cursor-pointer flex whitespace-nowrap items-center bg-white rounded-full ${index === 0 ? "text-black" : ""}`}
            >
              {item.title}
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}

const Navbar = memo(NavbarComponent);
export default Navbar;
