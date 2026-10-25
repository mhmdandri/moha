import React from "react";
import Image from "next/image";
import * as motion from "motion/react-client";
import { Mail, MoveRight } from "lucide-react";
import { assets } from "@/assets/assets";
import { ovo } from "@/lib/fonts";

const Header = () => {
  return (
    <div
      id="home"
      className="flex flex-col items-center justify-center w-11/12 min-h-screen max-w-5xl gap-6 px-4 py-24 mx-auto text-center sm:px-6"
    >
      {/* Availability Status Badge */}
      {/* <motion.div
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5 }}
        className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-neutral-300 dark:border-neutral-700 bg-white/70 dark:bg-neutral-800/70 backdrop-blur-md shadow-xs text-xs sm:text-sm font-medium"
      >
        <span className="relative flex h-2.5 w-2.5">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
          <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-emerald-500"></span>
        </span>
        <span className="text-gray-800 dark:text-gray-200">
          Tersedia untuk Proyek Baru &amp; Freelance
        </span>
      </motion.div> */}

      {/* Logo */}
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.8, type: "spring", stiffness: 100 }}
      >
        <Image
          src={assets.logo}
          alt="Moha Project Logo"
          className="w-20 mx-auto sm:w-24 md:w-28 dark:invert"
          priority
        />
      </motion.div>

      {/* Primary Heading with SEO Target Keywords */}
      <motion.h1
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className={`${ovo.className} text-2xl sm:text-4xl lg:text-5xl xl:text-[54px] leading-tight text-gray-900 dark:text-gray-100 max-w-4xl`}
      >
        Jasa Pembuatan Website, Web App &amp; Undangan Digital Profesional
      </motion.h1>

      {/* Subheading with Value Proposition */}
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.5 }}
        className="max-w-2xl mx-auto text-sm sm:text-base text-gray-600 dark:text-gray-300 leading-relaxed"
      >
        Membantu personal brand, UMKM, dan perusahaan membangun eksistensi
        digital yang modern, responsif, cepat, dan terindeks di mesin pencari
        Google.
      </motion.p>

      {/* CTA Buttons */}
      <div className="flex flex-col items-center gap-4 mt-4 sm:flex-row">
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          href="#services"
          className="flex items-center gap-2 px-8 py-3 text-sm sm:text-base 
           text-white bg-black border border-white rounded-full 
           hover:bg-black/90 shadow-md
           dark:border-gray-100 dark:hover:bg-gray-100/50 transition-all"
        >
          Lihat Layanan &amp; Paket
          <MoveRight className="w-4 h-4" />
        </motion.a>
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          href="#contact"
          className="flex items-center gap-2 px-6 py-3 text-sm border border-gray-400 dark:border-gray-600 rounded-full sm:px-8 sm:text-base hover:bg-gray-100 dark:hover:bg-neutral-800 transition-all text-gray-800 dark:text-gray-200"
        >
          Konsultasi Kebutuhan Anda
          <Mail className="w-4 h-4" />
        </motion.a>
      </div>
    </div>
  );
};

export default Header;
