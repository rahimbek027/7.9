import {
  HomeOutlined,
  LogoutOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import React from "react";
import NavbarLink from "../NavbarLink/NavbarLink";
import { Link, useNavigate } from "react-router-dom";
import { useQueryClient } from "@tanstack/react-query";

const Navbar = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate()
  const navlinks = [
    {
      name: "Home",
      link: "/",
      icon: <HomeOutlined className="text-[24px]" />,
    },
    {
      name: "Students",
      link: "/students",
      icon: <UserOutlined className="text-[24px]" />,
    },
  ];

  const handleLogOut = () => {
    localStorage.removeItem("token");
    queryClient.invalidateQueries("login");
    navigate("/login")
  }
  return (
    <nav className="navbar bg-gray-600 h-96 px-[52px] py-[40px]  flex flex-col justify-between">
      <div>
        <ul className="nav-links flex flex-col mt-[70px] space-y-16">
          {navlinks.map((link, index) => (
            <NavbarLink key={index} link={link} />
          ))}
        </ul>
      </div>
      <button className="text-white hover:bg-white hover:text-black py-2 rounded-lg" onClick={handleLogOut}>
        <LogoutOutlined className="text-[24px]" />
      </button>
    </nav>
  );
};

export default Navbar;
