"use client";
import React from "react";
import { Ovo } from "next/font/google";
import { motion } from "motion/react";
import { useTheme } from "next-themes";
import { ArrowRight } from "lucide-react";

const ovo = Ovo({ subsets: ["latin"], weight: "400" });

const Contact = () => {
  const [result, setResult] = React.useState("");

  const onSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setResult("Sending....");
    const form = event.currentTarget;
    const formData = new FormData(form);

    formData.append("access_key", "ff447cd3-0f53-4a79-ae17-30dc6f496b40");

    try {
      const response = await fetch("https://api.web3forms.com/submit", {
        method: "POST",
        body: formData,
      });

      const data: { success: boolean; message: string } = await response.json();

      if (data.success) {
        setResult("Form Submitted Successfully");
        form.reset();
      } else {
        setResult(data.message);
      }
    } catch (error) {
      setResult("Something went wrong. Please try again.");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="contact"
      className="w-full px px-6 sm:px-10 md:px-[8%] lg:px-[12%] py-10 scroll-mt-20 bg-white bg-[url('/footer-bg-color.png')] bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none dark:bg-black"
    >
      <motion.h4
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`${ovo.className} text-center mb-2 text-base sm:text-lg text-gray-700 dark:text-gray-300`}
      >
        Kontak
      </motion.h4>
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`${ovo.className} text-center text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-gray-100`}
      >
        Hubungi Kami
      </motion.h2>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.7 }}
        className={`${ovo.className} text-center text-sm sm:text-base max-w-2xl mx-auto mt-5 mb-12 text-gray-700 dark:text-gray-300`}
      >
        Kami siap mendengar ide, kebutuhan, atau pertanyaan Anda. Bangun koneksi
        yang bermakna bersama kami.
      </motion.p>
      <motion.form
        initial={{ opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.9 }}
        onSubmit={onSubmit}
        className="max-w-2xl mx-auto"
      >
        <div className="grid grid-cols-1 gap-6 mt-10 mb-8 sm:grid-cols-2">
          <motion.input
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.1 }}
            type="text"
            placeholder="Masukan nama anda"
            required
            name="name"
            className="flex-1 p-3 text-sm sm:text-base outline-none border-[0.5px] border-gray-400 dark:border-gray-600 rounded-md bg-white dark:bg-neutral-800 dark:text-gray-200"
          />
          <motion.input
            initial={{ x: -50, opacity: 0 }}
            whileInView={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 1.2 }}
            type="email"
            placeholder="Masukan email anda"
            required
            name="email"
            className="flex-1 p-3 text-sm sm:text-base outline-none border-[0.5px] border-gray-400 dark:border-gray-600 rounded-md bg-white dark:bg-neutral-800 dark:text-gray-200"
          />
        </div>
        <motion.textarea
          initial={{ y: 100, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.3 }}
          className="w-full p-4 text-sm sm:text-base outline-none border-[0.5px] border-gray-400 dark:border-gray-600 rounded-md bg-white dark:bg-neutral-800 dark:text-gray-200 mb-6"
          placeholder="Masukan pesan anda"
          name="message"
          required
          rows={5}
        ></motion.textarea>
        <motion.button
          whileHover={{ scale: 1.05 }}
          transition={{ duration: 0.3 }}
          className="flex items-center justify-between gap-2 px-6 py-3 mx-auto text-sm text-white rounded-full sm:px-8 sm:text-base w-max bg-black/80 hover:bg-black dark:bg-black dark:text-gray-200 dark:hover:bg-white/10 dark:border dark:border-white cursor-pointer"
          type="submit"
        >
          Kirim
          <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 text-white" />
        </motion.button>
        <p className="mt-4 text-sm text-center text-gray-700 dark:text-gray-300">
          {result}
        </p>
      </motion.form>
    </motion.div>
  );
};

export default Contact;
