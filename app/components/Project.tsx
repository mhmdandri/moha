"use client";
import React from "react";
import { Ovo } from "next/font/google";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { workData } from "@/assets/assets";
import { ArrowRight, Send } from "lucide-react"; // pakai Lucide icons

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

const Project = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="project"
      className="w-full px-6 sm:px-10 md:px-[8%] lg:px-[12%] py-10 scroll-mt-20 bg-white dark:bg-inherit overflow-x-hidden"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`${ovo.className} text-center mb-2 text-base sm:text-lg text-gray-700 dark:text-gray-300`}
      ></motion.h4>

      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`${ovo.className} text-center text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-gray-100`}
      >
        Project
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={`${ovo.className} text-center text-sm sm:text-base max-w-2xl mx-auto mt-5 mb-12 text-gray-700 dark:text-gray-300`}
      >
        Kami menghadirkan solusi inovatif lintas industri. Berikut beberapa
        proyek terbaru kami.
      </motion.p>

      {/* Grid Project Cards */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.9 }}
        className="grid grid-cols-1 gap-6 mx-auto my-10 sm:grid-cols-2 lg:grid-cols-3"
      >
        {workData.map((project, index) => (
          <motion.a
            href={project.link}
            target="_blank"
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            key={index}
            className="relative bg-center bg-no-repeat bg-cover rounded-lg cursor-pointer aspect-square group"
            style={{ backgroundImage: `url(${project.bgImage})` }}
          >
            <div className="absolute flex items-center justify-between w-11/12 px-4 py-3 duration-500 -translate-x-1/2 rounded-md sm:px-5 bg-white/70 dark:bg-neutral-800/70 bottom-4 left-1/2 group-hover:bottom-6">
              <div>
                <h2 className="text-sm font-semibold sm:text-base text-gray-900 dark:text-gray-100">
                  {project.title}
                </h2>
                <p className="text-xs text-gray-700 dark:text-gray-300 sm:text-sm">
                  {project.description}
                </p>
              </div>
              <div className="border rounded-full border-black dark:border-gray-200 w-8 sm:w-9 aspect-square flex items-center justify-center shadow-[2px_2px_0_#000] dark:shadow-[2px_2px_0_#fff] group-hover:bg-lime-300 dark:group-hover:bg-white/10 transition">
                <Send className="w-4 sm:w-5 text-gray-900 dark:text-gray-100" />
              </div>
            </div>
          </motion.a>
        ))}
      </motion.div>

      {/* Back to top */}
      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 1.1 }}
        href="#home"
        className="w-max flex items-center justify-center gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 border-[0.5px] border-gray-700 dark:border-gray-300 rounded-full py-2.5 sm:py-3 px-8 sm:px-10 mx-auto my-16 hover:bg-[#fcf4ff] dark:hover:bg-neutral-700 duration-500"
      >
        Kembali ke atas
        <ArrowRight className="w-3 sm:w-4 text-gray-700 dark:text-gray-300" />
      </motion.a>
    </motion.div>
  );
};

export default Project;
