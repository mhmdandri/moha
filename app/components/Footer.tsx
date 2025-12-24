"use client";
import React from "react";
import { assets } from "@/assets/assets";
import Image from "next/image";
import { Mail, Github, Linkedin, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <div className="px-6 sm:px-10 md:px-[8%] lg:px-[12%] bg-white dark:bg-inherit text-gray-800 dark:text-gray-200">
      {/* Logo & Email */}
      <div className="text-center">
        <Image
          src={assets.logo}
          alt="logo"
          className="w-12 mx-auto sm:w-16 dark:invert"
        />
        <div className="flex flex-wrap items-center justify-center gap-2 mt-3 text-sm sm:text-base">
          <Mail className="w-5 h-5 sm:w-6 sm:h-6" />
          <span>hello@mohaproject.dev</span>
        </div>
      </div>

      {/* Bottom Section */}
      <div className="items-center justify-between py-6 mt-10 text-sm text-center border-t border-gray-400 dark:border-gray-600 sm:flex sm:mt-12 sm:text-base">
        <p className="mb-4 sm:mb-0">
          © 2025 Moha Project. All rights reserved.
        </p>
        <ul className="flex flex-wrap items-center justify-center gap-6 sm:gap-10">
          <li>
            <a
              target="_blank"
              href="https://github.com/mhmdandri"
              className="flex items-center gap-1 hover:underline"
            >
              <Github className="w-4 h-4 sm:w-5 sm:h-5" /> Github
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.linkedin.com/in/muhamad-a-067104138/"
              className="flex items-center gap-1 hover:underline"
            >
              <Linkedin className="w-4 h-4 sm:w-5 sm:h-5" /> LinkedIn
            </a>
          </li>
          <li>
            <a
              target="_blank"
              href="https://www.instagram.com/mhmdandri_/"
              className="flex items-center gap-1 hover:underline"
            >
              <Instagram className="w-4 h-4 sm:w-5 sm:h-5" /> Instagram
            </a>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Footer;
