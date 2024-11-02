import React from "react";
import { NavLink } from "react-router-dom";

const NavbarLink = ({ link }) => {
  return (
    <li>
      <NavLink
        to={link.link}
        className={
          "text-white flex items-center justify-center py-2 rounded-md hover:bg-[#fff]/30 navlink"
        }
      >
        {link.icon}
      </NavLink>
    </li>
  );
};

export default NavbarLink;
