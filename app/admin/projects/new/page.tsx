"use client";
import React from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft } from "lucide-react";
import { createProject } from "@/lib/projects";
import { ProjectFormData } from "@/types/project";
import { ProjectForm } from "@/app/admin/components/ProjectForm";

export default function NewProjectPage() {
  const router = useRouter();

  const handleCreate = async (formData: ProjectFormData) => {
    const res = await createProject(formData);
    if (res.success) {
      router.push("/admin");
      router.refresh();
    }
    return res;
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between pb-4 border-b border-neutral-200 dark:border-neutral-800">
        <div className="flex items-center gap-3">
          <Link
            href="/admin"
            className="p-2 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
          >
            <ArrowLeft className="w-4 h-4" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-bold tracking-tight">
              Tambah Proyek Baru
            </h1>
            <p className="text-xs text-neutral-500">
              Isi formulir di bawah untuk menambahkan showcase baru ke portofolio
            </p>
          </div>
        </div>
      </div>

      <ProjectForm onSubmit={handleCreate} submitButtonText="Publikasikan Project" />
    </div>
  );
}
