"use client";
import React, { useEffect, useState, useSyncExternalStore } from "react";
import Image from "next/image";
import { useTheme } from "next-themes";
import { Menu, Moon, MoveUpRight, Sun, X } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { assets } from "@/assets/assets";
import { ovo } from "@/lib/fonts";
import { NAV_LINKS } from "@/lib/constants";

const ICON_VARIANTS = {
  exit: {
    y: 20,
    opacity: 0,
    scale: 0.8,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
  enter: {
    y: -20,
    opacity: 0,
    scale: 1.2,
    transition: { duration: 0.3, ease: "easeInOut" as const },
  },
  visible: {
    y: 0,
    opacity: 1,
    scale: 1,
    transition: { duration: 0.3, ease: "easeOut" as const },
  },
};

const Navbar = () => {
  const { resolvedTheme, setTheme } = useTheme();
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const isMounted = useSyncExternalStore(
    () => () => {},
    () => true,
    () => false
  );

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  if (!isMounted) {
    return (
      <nav className="fixed z-50 flex items-center justify-between w-full px-4 py-4" />
    );
  }

  const isDarkMode = resolvedTheme === "dark";

  return (
    <>
      {/* Background pattern (Light mode only) */}
      {!isDarkMode && (
        <div className="fixed top-0 right-0 w-full -z-10 translate-y-[-80%]">
          <Image
            src={assets.header_bg_color}
            alt=""
            className="w-full"
            priority
          />
        </div>
      )}

      <nav
        className={`w-full fixed px-4 sm:px-6 lg:px-8 xl:px-[8%] py-4 flex items-center justify-between z-50 transition-colors ${
          isScrolled
            ? "bg-white/70 dark:bg-black/50 backdrop-blur-md shadow-sm"
            : ""
        }`}
      >
        {/* Logo */}
        <a href="#home">
          <Image
            src={assets.logo}
            alt="logo"
            className={`w-12 cursor-pointer sm:w-14 ${isDarkMode ? "invert" : ""}`}
            priority
          />
        </a>

        {/* Desktop Menu */}
        <ul className="hidden md:flex items-center gap-4 lg:gap-8 rounded-full px-6 lg:px-10 py-2.5 bg-white/50 dark:bg-neutral-800">
          {NAV_LINKS.map(({ href, label }) => (
            <li key={href}>
              <a href={href} className={`${ovo.className} text-sm sm:text-base`}>
                {label}
              </a>
            </li>
          ))}
        </ul>

        {/* Right Actions */}
        <div className="flex items-center gap-4 sm:gap-4">
          {/* Dark / Light Toggle */}
          <button
            onClick={() => setTheme(isDarkMode ? "light" : "dark")}
            className="cursor-pointer"
            aria-label="Toggle theme"
          >
            <AnimatePresence mode="wait">
              <motion.div
                key={resolvedTheme}
                variants={ICON_VARIANTS}
                initial="enter"
                animate="visible"
                exit="exit"
              >
                {isDarkMode ? <Sun className="w-6" /> : <Moon className="w-6" />}
              </motion.div>
            </AnimatePresence>
          </button>

          {/* Contact Button */}
          <a
            href="#contact"
            className={`${ovo.className} hidden lg:flex items-center gap-2 px-6 py-2 border border-gray-400 rounded-full text-sm`}
          >
            Kontak
            <MoveUpRight className="w-5" />
          </a>

          {/* Mobile Hamburger Button */}
          <button
            className="block cursor-pointer md:hidden"
            onClick={() => setIsMobileMenuOpen(true)}
            aria-label="Open menu"
          >
            <Menu />
          </button>
        </div>
      </nav>

      {/* Mobile Menu Drawer */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[60] flex flex-col w-64 h-screen gap-6 px-8 py-20 bg-rose-50 dark:bg-neutral-800 transition-transform duration-500 ${
          isMobileMenuOpen ? "translate-x-0" : "translate-x-full"
        }`}
      >
        <button
          className="absolute right-6 top-6"
          onClick={() => setIsMobileMenuOpen(false)}
          aria-label="Close menu"
        >
          <X className="w-6" />
        </button>

        {NAV_LINKS.map(({ href, label }) => (
          <a
            key={href}
            href={href}
            onClick={() => setIsMobileMenuOpen(false)}
            className={`${ovo.className} text-lg`}
          >
            {label}
          </a>
        ))}
      </div>
    </>
  );
};

export default Navbar;
