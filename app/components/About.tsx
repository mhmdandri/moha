"use client";
import { assets, infoList, toolsData } from "@/assets/assets";
import * as motion from "motion/react-client";
import { Ovo } from "next/font/google";
import Image from "next/image";
import React from "react";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="about"
      className="w-full px-6 sm:px-10 md:px-[8%] lg:px-[12%] py-10 scroll-mt-20 bg-white dark:bg-black"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`${ovo.className} text-center mb-2 text-base sm:text-lg text-gray-700 dark:text-gray-300`}
      >
        Tentang Kami
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`${ovo.className} text-center text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-gray-100`}
      >
        Mewujudkan Inovasi yang Bermakna
      </motion.h2>
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.8 }}
        className="flex flex-col items-center w-full gap-12 my-16 md:flex-row md:gap-16"
      >
        <motion.div
          initial={{ scale: 0.9, opacity: 0 }}
          whileInView={{ scale: 1, opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-xs sm:max-w-sm md:max-w-md rounded-3xl"
        >
          <Image
            src={assets.logo}
            alt="logo"
            className="w-full rounded-3xl dark:invert"
            priority
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="flex-1"
        >
          <p
            className={`${ovo.className} mb-10 max-w-2xl text-sm sm:text-base text-gray-700 dark:text-gray-300`}
          >
            &quot;Setiap baris kode kami adalah bagian dari cerita digital yang
            bermakna&quot;
          </p>

          <motion.ul
            variants={{
              hidden: {},
              visible: {
                transition: {
                  staggerChildren: 0.2,
                },
              },
            }}
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.8, delay: 1 }}
            className="grid max-w-2xl grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3"
          >
            {infoList.map(({ icon: Icon, title, description }, index) => (
              <motion.li
                variants={{
                  hidden: { opacity: 0, y: 20 },
                  visible: { opacity: 1, y: 0 },
                }}
                whileHover={{ scale: 1.05 }}
                key={index}
                className="shadow hover:shadow-[4px_4px_0_#000] dark:bg-neutral-800 dark:hover:shadow-[4px_4px_0_#fff]
                           hover:bg-[#fcf4ff] dark:hover:bg-white/10  
                           hover:-translate-y-1 duration-500 
                           border-[0.5px] border-gray-400 dark:border-gray-600 
                           rounded-xl p-6 cursor-pointer"
              >
                <Icon className="w-6 h-6 mt-3 text-gray-600 dark:text-gray-300 sm:w-7 sm:h-7" />
                <h3 className="my-4 text-sm font-semibold text-gray-900 dark:text-white sm:text-base">
                  {title}
                </h3>
                <p className="text-xs text-gray-600 dark:text-white sm:text-sm">
                  {description}
                </p>
              </motion.li>
            ))}
          </motion.ul>

          <motion.h4
            initial={{ y: 20, opacity: 0 }}
            whileInView={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.5, delay: 1.3 }}
            className={`${ovo.className} my-6 text-gray-700 dark:text-gray-300 text-sm sm:text-base`}
          >
            {/* Tools I use */}
          </motion.h4>

          <motion.ul
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.5 }}
            className="flex flex-wrap items-center gap-3 sm:gap-5"
          >
            {toolsData.map((tool, index) => (
              <motion.li
                whileHover={{ scale: 1.1 }}
                key={index}
                className="flex items-center justify-center w-10 dark:hover:bg-white/10 dark:bg-neutral-800 border border-gray-400 dark:border-gray-600 rounded-lg cursor-pointer sm:w-12 md:w-14 aspect-square hover:-translate-y-1 duration-500"
              >
                <Image src={tool} alt="tool" className="w-4 sm:w-5 md:w-7" />
              </motion.li>
            ))}
          </motion.ul>
        </motion.div>
      </motion.div>
    </motion.div>
  );
};

export default About;
