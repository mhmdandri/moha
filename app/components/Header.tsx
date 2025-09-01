import * as motion from "motion/react-client";
import { assets } from "@/assets/assets";
import { Ovo } from "next/font/google";
import Image from "next/image";
import React from "react";
import { Mail, MoveRight } from "lucide-react";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

const Header = () => {
  return (
    <div
      id="home"
      className="flex flex-col items-center justify-center w-11/12 h-screen max-w-5xl gap-6 px-4 mx-auto text-center sm:px-6 "
    >
      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <Image
          src={assets.logo}
          alt="Company Logo"
          className="w-20 mx-auto sm:w-24 md:w-28 dark:invert"
        />
      </motion.div>

      {/* Heading */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`${ovo.className} text-2xl sm:text-4xl lg:text-5xl xl:text-[56px] leading-snug`}
      >
        Solusi Digital untuk Personal Brand dan Perusahaan
      </motion.h1>

      {/* Subheading */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-2xl mx-auto text-sm text-gray-600 sm:text-base dark:text-white"
      >
        &quot;Bangun sesuatu yang luar biasa, seperti seorang artisan&quot;
      </motion.p>

      {/* CTA Buttons */}
      <div className="flex flex-col items-center gap-4 mt-6 sm:flex-row">
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          href="#services"
          className="flex items-center gap-2 px-6 py-3 text-sm sm:px-8 sm:text-base 
           text-white bg-black border border-white rounded-full 
           hover:bg-black/90 
           dark:border-gray-100 dark:hover:bg-gray-100/50"
        >
          Lihat Layanan
          <MoveRight />
        </motion.a>
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          href="#contact"
          className="flex items-center gap-2 px-6 py-3 text-sm border border-gray-500 rounded-full sm:px-8 sm:text-base hover:bg-gray-100 dark:border-gray-100 dark:hover:bg-gray-100/50"
        >
          Konsultasi Gratis
          <Mail />
        </motion.a>
      </div>
    </div>
  );
};

export default Header;
