"use client";
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { ArrowRight, ExternalLink, Github, Send } from "lucide-react";
import { getProjects } from "@/lib/projects";
import { Project as ProjectType } from "@/types/project";
import { ovo } from "@/lib/fonts";

const Project = () => {
  const [projects, setProjects] = useState<ProjectType[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>("All");

  useEffect(() => {
    let isMounted = true;
    getProjects()
      .then((data) => {
        if (!isMounted) return;
        setProjects(data);
      })
      .finally(() => {
        if (isMounted) setLoading(false);
      });

    return () => {
      isMounted = false;
    };
  }, []);

  const categories = [
    "All",
    ...Array.from(new Set(projects.map((p) => p.category).filter(Boolean))),
  ];

  const filteredProjects =
    selectedCategory === "All"
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  return (
    <motion.div
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      transition={{ duration: 1 }}
      id="project"
      className="w-full px-6 sm:px-10 md:px-[8%] lg:px-[12%] py-10 scroll-mt-20 bg-white dark:bg-inherit overflow-x-hidden"
    >
      <motion.h2
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.3 }}
        className={`${ovo.className} text-center text-3xl sm:text-4xl lg:text-5xl text-gray-900 dark:text-gray-100`}
      >
        Project
      </motion.h2>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.5 }}
        className={`${ovo.className} text-center text-sm sm:text-base max-w-2xl mx-auto mt-4 mb-8 text-gray-700 dark:text-gray-300`}
      >
        Kami menghadirkan solusi inovatif lintas industri. Berikut beberapa
        proyek terbaru kami.
      </motion.p>

      {/* Category Filter Pills */}
      {!loading && categories.length > 2 && (
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-wrap items-center justify-center gap-2 mb-10"
        >
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-4 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all cursor-pointer ${
                selectedCategory === cat
                  ? "bg-black text-white dark:bg-white dark:text-black shadow-md"
                  : "bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700"
              }`}
            >
              {cat === "All" ? "Semua" : cat}
            </button>
          ))}
        </motion.div>
      )}

      {/* Loading Skeletons */}
      {loading ? (
        <div className="grid grid-cols-1 gap-6 mx-auto my-6 sm:grid-cols-2 lg:grid-cols-3">
          {[1, 2, 3].map((n) => (
            <div
              key={n}
              className="rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 overflow-hidden animate-pulse"
            >
              <div className="w-full aspect-[4/3] bg-gray-200 dark:bg-neutral-800" />
              <div className="p-5 space-y-3">
                <div className="h-4 bg-gray-200 dark:bg-neutral-800 rounded w-2/3" />
                <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-full" />
                <div className="h-3 bg-gray-200 dark:bg-neutral-800 rounded w-1/2" />
              </div>
            </div>
          ))}
        </div>
      ) : projects.length === 0 ? (
        <div className="text-center py-16 text-neutral-500">
          <p className="text-base font-medium">
            Belum ada proyek di database Supabase.
          </p>
          <p className="text-xs mt-1 text-neutral-400">
            Tambahkan proyek baru melalui dashboard admin CMS di{" "}
            <code>/admin</code>.
          </p>
        </div>
      ) : (
        /* Grid Project Cards */
        <motion.div
          layout
          className="grid grid-cols-1 gap-6 mx-auto my-6 sm:grid-cols-2 lg:grid-cols-3"
        >
          <AnimatePresence>
            {filteredProjects.map((project, index) => (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ duration: 0.4, delay: index * 0.05 }}
                key={project.id || index}
                className="relative group flex flex-col justify-between overflow-hidden rounded-xl border border-gray-200 dark:border-neutral-800 bg-gray-50 dark:bg-neutral-900 shadow-sm hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
              >
                {/* Image Preview */}
                <div
                  className="w-full aspect-[4/3] bg-center bg-no-repeat bg-cover relative"
                  style={{ backgroundImage: `url(${project.image_url})` }}
                >
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />

                  {/* Category Badge */}
                  <span className="absolute top-3 left-3 px-2.5 py-1 text-[11px] font-medium tracking-wide uppercase rounded-md bg-black/60 text-white backdrop-blur-md">
                    {project.category}
                  </span>

                  {/* Quick Link Icons */}
                  <div className="absolute top-3 right-3 flex items-center gap-2">
                    {project.github_url && (
                      <a
                        href={project.github_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-3.5 h-3.5" />
                      </a>
                    )}
                    {project.link && (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-full bg-black/60 text-white hover:bg-black transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-3.5 h-3.5" />
                      </a>
                    )}
                  </div>
                </div>

                {/* Card Content */}
                <div className="p-5 flex flex-col justify-between flex-1 bg-white dark:bg-neutral-900">
                  <div>
                    <h3 className="text-base sm:text-lg font-semibold text-gray-900 dark:text-gray-100 mb-1">
                      {project.title}
                    </h3>
                    <p className="text-xs sm:text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                      {project.description}
                    </p>
                  </div>

                  {/* Tech Stack Pills & CTA */}
                  <div>
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-1.5 mb-4">
                        {project.tech_stack.map((tech, idx) => (
                          <span
                            key={idx}
                            className="px-2 py-0.5 text-[11px] font-mono rounded bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 border border-gray-200 dark:border-neutral-700"
                          >
                            {tech}
                          </span>
                        ))}
                      </div>
                    )}

                    {project.link ? (
                      <a
                        href={project.link}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-1.5 text-xs font-semibold text-black dark:text-white hover:underline group-hover:translate-x-0.5 transition-transform"
                      >
                        Kunjungi Project
                        <Send className="w-3 h-3" />
                      </a>
                    ) : null}
                  </div>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </motion.div>
      )}

      {/* Back to top */}
      <motion.a
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5, delay: 0.8 }}
        href="#home"
        className="w-max flex items-center justify-center gap-2 text-sm sm:text-base text-gray-700 dark:text-gray-300 border-[0.5px] border-gray-700 dark:border-gray-300 rounded-full py-2.5 sm:py-3 px-8 sm:px-10 mx-auto my-14 hover:bg-[#fcf4ff] dark:hover:bg-neutral-800 duration-300"
      >
        Kembali ke atas
        <ArrowRight className="w-3 sm:w-4 text-gray-700 dark:text-gray-300" />
      </motion.a>
    </motion.div>
  );
};

export default Project;
