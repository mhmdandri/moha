// import * as motion from "motion/react-client";
// import React from "react";
// import { Ovo } from "next/font/google";
// import { assets, serviceData } from "@/assets/assets";
// import Image from "next/image";

// const ovo = Ovo({ subsets: ["latin"], weight: "400" });

// const containerVariants = {
//   hidden: {},
//   visible: {
//     transition: {
//       staggerChildren: 0.2,
//     },
//   },
// };

// const itemVariants = {
//   hidden: { opacity: 0, y: 20 },
//   visible: { opacity: 1, y: 0 },
// };

// const Services = () => {
//   return (
//     <motion.div
//       variants={containerVariants}
//       initial={{ opacity: 0 }}
//       whileInView={{ opacity: 1 }}
//       transition={{ duration: 1 }}
//       id="services"
//       className="w-full px-6 sm:px-10 md:px-[8%] lg:px-[12%] py-10 scroll-mt-20"
//     >
//       <motion.h4
//         variants={itemVariants}
//         initial={{ y: -20, opacity: 0 }}
//         whileInView={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.3 }}
//         className={`${ovo.className} text-center mb-2 text-base sm:text-lg`}
//       >
//         Penawaran Kami
//       </motion.h4>

//       <motion.h2
//         initial={{ y: -20, opacity: 0 }}
//         variants={itemVariants}
//         whileInView={{ y: 0, opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.5 }}
//         className={`${ovo.className} text-center text-3xl sm:text-4xl lg:text-5xl`}
//       >
//         Layanan Digital
//       </motion.h2>

//       <motion.p
//         variants={itemVariants}
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.5, delay: 0.7 }}
//         className={`${ovo.className} text-center text-sm sm:text-base max-w-2xl mx-auto mt-5 mb-12`}
//       >
//         Kami merancang antarmuka yang memadukan emosi dan presisi—baik itu
//         landing page, identitas brand, sistem, maupun pengalaman pengguna yang
//         mulus.
//       </motion.p>

//       <motion.div
//         variants={containerVariants}
//         initial={{ opacity: 0 }}
//         whileInView={{ opacity: 1 }}
//         transition={{ duration: 0.6, delay: 0.9 }}
//         className="grid grid-cols-1 gap-6 my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
//       >
//         {serviceData.map(({ icon, title, description }, index) => (
//           <motion.div
//             variants={itemVariants}
//             whileHover={{ scale: 1.05 }}
//             key={index}
//             className="border border-gray-400 rounded-lg px-6 sm:px-8 py-8 sm:py-12 shadow hover:shadow-[4px_4px_0_#000] cursor-pointer hover:bg-[#fcf4ff] hover:-translate-y-1 duration-500"
//           >
//             <Image src={icon} alt={title} className="w-8 sm:w-10" />
//             <h3 className="my-4 text-base font-semibold text-gray-700 sm:text-lg">
//               {title}
//             </h3>
//             <p className="text-sm leading-5 text-gray-700 sm:text-base">
//               {description}
//             </p>
//           </motion.div>
//         ))}
//       </motion.div>
//     </motion.div>
//   );
// };

// export default Services;

"use client";
import * as motion from "motion/react-client";
import React from "react";
import { Ovo } from "next/font/google";
import { useTheme } from "next-themes";
import { serviceData } from "@/assets/assets";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.2,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0 },
};

const Services = () => {
  const { theme } = useTheme();

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      whileInView="visible"
      id="services"
      className="w-full px-6 sm:px-10 md:px-[8%] lg:px-[12%] py-10 scroll-mt-20 bg-white dark:bg-black"
    >
      <motion.h4
        variants={itemVariants}
        className={`${ovo.className} text-center mb-2 text-base sm:text-lg text-gray-700 dark:text-gray-300`}
      >
        Penawaran Kami
      </motion.h4>

      <motion.h2
        variants={itemVariants}
        className={`${ovo.className} text-center text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-gray-100`}
      >
        Layanan Digital
      </motion.h2>

      <motion.p
        variants={itemVariants}
        className={`${ovo.className} text-center text-sm sm:text-base max-w-2xl mx-auto mt-5 mb-12 text-gray-700 dark:text-gray-300`}
      >
        Kami merancang antarmuka yang memadukan emosi dan presisi—baik itu
        landing page, identitas brand, sistem, maupun pengalaman pengguna yang
        mulus.
      </motion.p>

      <motion.div
        variants={containerVariants}
        className="grid grid-cols-1 gap-6 my-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
      >
        {serviceData.map(({ icon: Icon, title, description }, index) => (
          <motion.div
            key={index}
            variants={itemVariants}
            whileHover={{ scale: 1.05 }}
            className={`
              border border-gray-400 dark:border-gray-600 rounded-lg px-6 sm:px-8 py-8 sm:py-12
              shadow hover:-translate-y-1 duration-500
              hover:bg-[#fcf4ff] dark:hover:bg-white/10
              hover:shadow-[4px_4px_0_#000] dark:hover:shadow-[4px_4px_0_#fff]
              cursor-pointer dark:bg-neutral-800
            `}
          >
            <Icon className="w-8 h-8 sm:w-10 sm:h-10 text-gray-600 dark:text-gray-300" />
            <h3 className="my-4 text-base font-semibold text-gray-700 dark:text-gray-300 sm:text-lg">
              {title}
            </h3>
            <p className="text-sm leading-5 text-gray-700 dark:text-gray-300 sm:text-base">
              {description}
            </p>
          </motion.div>
        ))}
      </motion.div>
    </motion.div>
  );
};

export default Services;
