"use client";
import React, { use, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { ArrowLeft, Loader2 } from "lucide-react";
import { getProjectById, updateProject } from "@/lib/projects";
import { Project, ProjectFormData } from "@/types/project";
import { ProjectForm } from "@/app/admin/components/ProjectForm";

export default function EditProjectPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id: projectId } = use(params);
  const router = useRouter();

  const [project, setProject] = useState<Project | null>(null);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let isMounted = true;
    getProjectById(projectId).then((data) => {
      if (!isMounted) return;
      if (data) {
        setProject(data);
      } else {
        setErrorMsg("Proyek tidak ditemukan di Supabase.");
      }
      setLoading(false);
    });
    return () => {
      isMounted = false;
    };
  }, [projectId]);

  const handleUpdate = async (formData: ProjectFormData) => {
    const res = await updateProject(projectId, formData);
    if (res.success) {
      router.push("/admin");
      router.refresh();
    }
    return res;
  };

  if (loading) {
    return (
      <div className="p-16 text-center text-neutral-500 flex flex-col items-center justify-center gap-2">
        <Loader2 className="w-6 h-6 animate-spin" />
        <p className="text-sm">Memuat data proyek dari Supabase...</p>
      </div>
    );
  }

  if (errorMsg || !project) {
    return (
      <div className="max-w-md mx-auto my-12 p-6 bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl text-center space-y-4">
        <p className="text-sm text-rose-500 font-medium">{errorMsg || "Proyek tidak ditemukan."}</p>
        <Link
          href="/admin"
          className="inline-block px-4 py-2 rounded-xl bg-black dark:bg-white text-white dark:text-black text-xs font-semibold"
        >
          Kembali ke Dashboard
        </Link>
      </div>
    );
  }

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
              Edit Proyek
            </h1>
            <p className="text-xs text-neutral-500">
              Perbarui rincian, gambar, atau tautan proyek ini
            </p>
          </div>
        </div>
      </div>

      <ProjectForm
        initialData={project}
        onSubmit={handleUpdate}
        submitButtonText="Simpan Perubahan"
      />
    </div>
  );
}
