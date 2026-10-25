"use client";
import React, { useState } from "react";
import Link from "next/link";
import {
  Image as ImageIcon,
  Loader2,
  Plus,
  Save,
  UploadCloud,
  X,
} from "lucide-react";
import { uploadProjectImage } from "@/lib/projects";
import { PROJECT_CATEGORIES, ProjectFormData } from "@/types/project";

interface ProjectFormProps {
  initialData?: Partial<ProjectFormData>;
  onSubmit: (data: ProjectFormData) => Promise<{ success: boolean; error?: string }>;
  submitButtonText?: string;
  cancelHref?: string;
}

export function ProjectForm({
  initialData,
  onSubmit,
  submitButtonText = "Simpan Proyek",
  cancelHref = "/admin",
}: ProjectFormProps) {
  const [title, setTitle] = useState(initialData?.title || "");
  const [category, setCategory] = useState(initialData?.category || "Fullstack Project");
  const [description, setDescription] = useState(initialData?.description || "");
  const [link, setLink] = useState(initialData?.link || "");
  const [githubUrl, setGithubUrl] = useState(initialData?.github_url || "");
  const [orderIndex, setOrderIndex] = useState(initialData?.order_index ?? 1);
  const [isFeatured, setIsFeatured] = useState(initialData?.is_featured ?? true);

  // Tech Stack Tags
  const [techStack, setTechStack] = useState<string[]>(
    initialData?.tech_stack || ["Next.js", "Tailwind CSS"]
  );
  const [tagInput, setTagInput] = useState("");

  // Image Upload or Direct URL
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imagePreview, setImagePreview] = useState<string>(initialData?.image_url || "");
  const [imageUrl, setImageUrl] = useState<string>(initialData?.image_url || "");
  const [uploadMode, setUploadMode] = useState<"file" | "url">(
    initialData?.image_url ? "url" : "file"
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const handleAddTag = () => {
    const trimmed = tagInput.trim();
    if (trimmed && !techStack.includes(trimmed)) {
      setTechStack([...techStack, trimmed]);
      setTagInput("");
    }
  };

  const handleRemoveTag = (tagToRemove: string) => {
    setTechStack(techStack.filter((t) => t !== tagToRemove));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImagePreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");

    try {
      let finalImageUrl = imageUrl.trim();

      if (uploadMode === "file" && imageFile) {
        const uploadResult = await uploadProjectImage(imageFile);
        if (uploadResult.error) {
          setErrorMsg(uploadResult.error);
          setIsSubmitting(false);
          return;
        }
        if (uploadResult.url) {
          finalImageUrl = uploadResult.url;
        }
      }

      if (!finalImageUrl) {
        setErrorMsg("Harap masukkan atau upload gambar screenshot project");
        setIsSubmitting(false);
        return;
      }

      const res = await onSubmit({
        title,
        category,
        description,
        image_url: finalImageUrl,
        link: link || undefined,
        github_url: githubUrl || undefined,
        tech_stack: techStack,
        is_featured: isFeatured,
        order_index: Number(orderIndex),
      });

      if (!res.success && res.error) {
        setErrorMsg(res.error);
      }
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Terjadi kesalahan saat menyimpan";
      setErrorMsg(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {errorMsg && (
        <div className="p-3 rounded-xl bg-rose-50 dark:bg-rose-950/40 border border-rose-200 dark:border-rose-800/50 text-rose-800 dark:text-rose-300 text-xs">
          {errorMsg}
        </div>
      )}

      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl p-6 space-y-5 shadow-sm">
        {/* Title & Category */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
              Judul Proyek *
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Contoh: CDMS - Monitoring System"
              required
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
              Kategori Proyek
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            >
              {PROJECT_CATEGORIES.filter((c) => c !== "All").map((cat) => (
                <option key={cat} value={cat}>
                  {cat}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Description */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
            Deskripsi Singkat *
          </label>
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Deskripsikan fitur utama atau masalah yang diselesaikan sistem ini..."
            rows={3}
            required
            className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
          />
        </div>

        {/* Image Upload / URL Selector */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400">
              Gambar / Thumbnail Proyek *
            </label>
            <div className="flex gap-2 text-xs">
              <button
                type="button"
                onClick={() => setUploadMode("file")}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                  uploadMode === "file"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-neutral-500 hover:text-black dark:hover:text-white"
                }`}
              >
                Upload File
              </button>
              <button
                type="button"
                onClick={() => setUploadMode("url")}
                className={`px-2.5 py-1 rounded-md font-medium cursor-pointer ${
                  uploadMode === "url"
                    ? "bg-black text-white dark:bg-white dark:text-black"
                    : "text-neutral-500 hover:text-black dark:hover:text-white"
                }`}
              >
                URL Langsung
              </button>
            </div>
          </div>

          {uploadMode === "file" ? (
            <div className="border-2 border-dashed border-neutral-300 dark:border-neutral-700 rounded-xl p-6 text-center hover:border-black dark:hover:border-white transition-colors">
              {imagePreview ? (
                <div className="space-y-3">
                  <div
                    className="w-full max-w-sm h-40 mx-auto rounded-lg bg-cover bg-center border border-neutral-200 dark:border-neutral-800"
                    style={{ backgroundImage: `url(${imagePreview})` }}
                  />
                  <label className="inline-block text-xs font-semibold text-neutral-600 dark:text-neutral-400 hover:underline cursor-pointer">
                    Ganti Gambar
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="hidden"
                    />
                  </label>
                </div>
              ) : (
                <label className="cursor-pointer flex flex-col items-center justify-center gap-2">
                  <UploadCloud className="w-8 h-8 text-neutral-400" />
                  <span className="text-sm font-medium">
                    Pilih file screenshot proyek (PNG / JPG / WebP)
                  </span>
                  <span className="text-xs text-neutral-400">
                    Otomatis diupload ke Supabase Storage
                  </span>
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileChange}
                    className="hidden"
                  />
                </label>
              )}
            </div>
          ) : (
            <div className="relative">
              <ImageIcon className="w-4 h-4 text-neutral-400 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={imageUrl}
                onChange={(e) => {
                  setImageUrl(e.target.value);
                  setImagePreview(e.target.value);
                }}
                placeholder="/project1.png atau https://example.com/screenshot.jpg"
                className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
              />
            </div>
          )}
        </div>

        {/* Tech Stack Pills Input */}
        <div>
          <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
            Teknologi yang Digunakan (Tech Stack)
          </label>
          <div className="flex flex-wrap gap-1.5 mb-2">
            {techStack.map((tech) => (
              <span
                key={tech}
                className="inline-flex items-center gap-1 px-2.5 py-1 rounded-md text-xs font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-800 dark:text-neutral-200 border border-neutral-200 dark:border-neutral-700"
              >
                {tech}
                <button
                  type="button"
                  onClick={() => handleRemoveTag(tech)}
                  className="hover:text-rose-500 cursor-pointer"
                  aria-label={`Hapus ${tech}`}
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
          </div>
          <div className="flex gap-2">
            <input
              type="text"
              value={tagInput}
              onChange={(e) => setTagInput(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  e.preventDefault();
                  handleAddTag();
                }
              }}
              placeholder="Ketik teknologi (cth: Docker, PostgreSQL) lalu tekan Enter"
              className="flex-1 px-3.5 py-2 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-xs sm:text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
            <button
              type="button"
              onClick={handleAddTag}
              className="px-3.5 py-2 rounded-xl bg-neutral-100 dark:bg-neutral-800 hover:bg-neutral-200 dark:hover:bg-neutral-700 text-xs font-medium transition cursor-pointer flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Tambah</span>
            </button>
          </div>
        </div>

        {/* Live Link & GitHub Link */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
              Live Demo Link (Opsional)
            </label>
            <input
              type="url"
              value={link}
              onChange={(e) => setLink(e.target.value)}
              placeholder="https://..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
              GitHub Repository (Opsional)
            </label>
            <input
              type="url"
              value={githubUrl}
              onChange={(e) => setGithubUrl(e.target.value)}
              placeholder="https://github.com/..."
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          </div>
        </div>

        {/* Order & Featured */}
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-2">
          <div>
            <label className="block text-xs font-semibold uppercase tracking-wider text-neutral-600 dark:text-neutral-400 mb-1.5">
              Urutan Tampil (Order Index)
            </label>
            <input
              type="number"
              value={orderIndex}
              onChange={(e) => setOrderIndex(Number(e.target.value))}
              min={0}
              className="w-full px-3.5 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-sm focus:outline-none focus:ring-2 focus:ring-black dark:focus:ring-white transition"
            />
          </div>

          <div className="flex items-center gap-3 pt-6">
            <input
              type="checkbox"
              id="isFeatured"
              checked={isFeatured}
              onChange={(e) => setIsFeatured(e.target.checked)}
              className="w-4 h-4 rounded text-black focus:ring-black"
            />
            <label htmlFor="isFeatured" className="text-sm font-medium cursor-pointer">
              Tampilkan di Beranda (Featured)
            </label>
          </div>
        </div>
      </div>

      {/* Submit Actions */}
      <div className="flex items-center justify-end gap-3">
        <Link
          href={cancelHref}
          className="px-4 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-sm font-medium hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
        >
          Batal
        </Link>

        <button
          type="submit"
          disabled={isSubmitting}
          className="px-6 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black text-sm font-medium hover:opacity-90 transition flex items-center gap-2 cursor-pointer disabled:opacity-50 shadow-sm"
        >
          {isSubmitting ? (
            <>
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Menyimpan...</span>
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              <span>{submitButtonText}</span>
            </>
          )}
        </button>
      </div>
    </form>
  );
}
