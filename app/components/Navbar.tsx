"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { assets } from "@/assets/assets";
import { useTheme } from "next-themes";
import { Ovo } from "next/font/google";
import { Menu, MoveUpRight, X } from "lucide-react";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isScroll, setIsScroll] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);
  useEffect(() => {
    setMounted(true);
    const handleScroll = () => {
      setIsScroll(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!mounted) {
    return (
      <nav className="fixed z-50 flex items-center justify-between w-full px-4 py-4" />
    );
  }

  return (
    <>
      {/* Background pattern */}
      <div className="fixed top-0 right-0 w-full -z-10 translate-y-[-80%]">
        {resolvedTheme === "dark" ? null : (
          <Image
            src={assets.header_bg_color}
            alt=""
            className="w-full"
            priority
          />
        )}
      </div>

      <nav
        className={`w-full fixed px-4 sm:px-6 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-colors ${
          isScroll
            ? "bg-white/70 dark:bg-black/50 backdrop-blur-md shadow-sm"
            : ""
        }`}
      >
        {/* Logo */}
        <a href="#home">
          <Image
            src={assets.logo}
            alt="logo"
            className={`w-12 cursor-pointer sm:w-14 ${
              resolvedTheme === "dark" ? "invert" : ""
            }`}
            priority
          />
        </a>

        {/* Desktop Menu */}
        <ul
          className={`hidden md:flex items-center gap-4 lg:gap-8 rounded-full px-6 lg:px-10 py-2.5 ${
            isScroll
              ? "bg-white/50 dark:bg-neutral-800"
              : "bg-white/50 dark:bg-neutral-800"
          }`}
        >
          <li>
            <a href="#home" className={`${ovo.className} text-sm sm:text-base`}>
              Beranda
            </a>
          </li>
          <li>
            <a
              href="#about"
              className={`${ovo.className} text-sm sm:text-base`}
            >
              Tentang
            </a>
          </li>
          <li>
            <a
              href="#services"
              className={`${ovo.className} text-sm sm:text-base`}
            >
              Layanan
            </a>
          </li>
          <li>
            <a
              href="#project"
              className={`${ovo.className} text-sm sm:text-base`}
            >
              Projects
            </a>
          </li>
          <li>
            <a
              href="#contact"
              className={`${ovo.className} text-sm sm:text-base`}
            >
              Kontak
            </a>
          </li>
        </ul>

        {/* Right Side */}
        <div className="flex items-center gap-4 sm:gap-4">
          {/* Kontak button (desktop only) */}
          {/* * Dark mode toggle */}{" "}
          <button
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
            className="cursor-pointer"
          >
            {" "}
            <Image
              src={
                resolvedTheme === "dark" ? assets.sun_icon : assets.moon_icon
              }
              alt="toggle theme"
              className="w-6"
            />{" "}
          </button>
          <a
            href="#contact"
            className={`${ovo.className} hidden lg:flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-full text-sm`}
          >
            Kontak
            <MoveUpRight className="w-5" />
          </a>
          {/* Hamburger (mobile) */}
          <button
            className="block cursor-pointer md:hidden"
            onClick={() => setIsOpen(true)}
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[60] flex flex-col w-64 h-screen gap-6 px-8 py-20 bg-rose-50 dark:bg-neutral-800 transition-transform duration-500 ${
          isOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        {/* Close button */}
        <button
          className="absolute right-6 top-6"
          onClick={() => setIsOpen(false)}
        >
          <X className="w-6" />
        </button>
        <a
          href="#home"
          onClick={() => setIsOpen(false)}
          className={`${ovo.className} text-lg`}
        >
          Beranda
        </a>
        <a
          href="#about"
          onClick={() => setIsOpen(false)}
          className={`${ovo.className} text-lg`}
        >
          Tentang
        </a>
        <a
          href="#services"
          onClick={() => setIsOpen(false)}
          className={`${ovo.className} text-lg`}
        >
          Layanan
        </a>
        <a
          href="#project"
          onClick={() => setIsOpen(false)}
          className={`${ovo.className} text-lg`}
        >
          Projects
        </a>
        <a
          href="#contact"
          onClick={() => setIsOpen(false)}
          className={`${ovo.className} text-lg`}
        >
          Kontak
        </a>
      </div>
    </>
  );
};

export default Navbar;
