"use client";
import React, { useCallback, useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import {
  AlertCircle,
  ExternalLink,
  FolderPlus,
  Loader2,
  LogOut,
  Pencil,
  Plus,
  RefreshCw,
  Sparkles,
  Trash2,
} from "lucide-react";
import { deleteProject, getProjects } from "@/lib/projects";
import { createClient, isSupabaseConfigured } from "@/lib/supabase/client";
import { Project } from "@/types/project";

export default function AdminDashboardPage() {
  const router = useRouter();
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [deletingId, setDeletingId] = useState<string | null>(null);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const isConfigured = isSupabaseConfigured();

  const loadData = useCallback(async () => {
    setLoading(true);
    try {
      const data = await getProjects();
      setProjects(data);

      if (isConfigured) {
        const supabase = createClient();
        const {
          data: { user },
        } = await supabase.auth.getUser();
        setUserEmail(user?.email ?? null);
      }
    } finally {
      setLoading(false);
    }
  }, [isConfigured]);

  useEffect(() => {
    let isMounted = true;
    getProjects().then((data) => {
      if (!isMounted) return;
      setProjects(data);
      setLoading(false);
    });

    if (isConfigured) {
      const supabase = createClient();
      supabase.auth.getUser().then(({ data: { user } }) => {
        if (!isMounted) return;
        setUserEmail(user?.email ?? null);
      });
    }

    return () => {
      isMounted = false;
    };
  }, [isConfigured]);

  const handleLogout = async () => {
    if (isConfigured) {
      const supabase = createClient();
      await supabase.auth.signOut();
    }
    router.push("/admin/login");
    router.refresh();
  };

  const handleDelete = async (id: string, title: string) => {
    if (!confirm(`Yakin ingin menghapus project "${title}"?`)) return;

    setDeletingId(id);
    const res = await deleteProject(id);
    if (res.success) {
      setProjects((prev) => prev.filter((p) => p.id !== id));
    } else {
      alert(res.error || "Gagal menghapus project");
    }
    setDeletingId(null);
  };

  return (
    <div className="space-y-8">
      {/* Top Banner / User Info */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-6 border-b border-neutral-200 dark:border-neutral-800">
        <div>
          <h1 className="text-2xl sm:text-3xl font-bold tracking-tight">
            Manajemen Portofolio (Supabase CMS)
          </h1>
          <p className="text-sm text-neutral-500 mt-1">
            Seluruh data proyek dikelola langsung melalui database Supabase
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/admin/projects/new"
            className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-black dark:bg-white text-white dark:text-black font-medium text-sm hover:opacity-90 transition shadow-sm cursor-pointer"
          >
            <Plus className="w-4 h-4" />
            <span>Tambah Project</span>
          </Link>

          {isConfigured && (
            <button
              onClick={handleLogout}
              className="inline-flex items-center gap-1.5 px-3 py-2.5 rounded-xl border border-neutral-300 dark:border-neutral-700 text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 text-sm font-medium transition cursor-pointer"
              title="Logout"
            >
              <LogOut className="w-4 h-4" />
              <span className="hidden sm:inline">Logout</span>
            </button>
          )}
        </div>
      </div>

      {/* Connection & Auth Status */}
      {!isConfigured ? (
        <div className="p-4 rounded-2xl bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800/50 flex flex-col sm:flex-row sm:items-center justify-between gap-3 text-xs text-amber-900 dark:text-amber-200">
          <div className="flex items-center gap-3">
            <AlertCircle className="w-5 h-5 shrink-0 text-amber-600 dark:text-amber-400" />
            <div>
              <p className="font-semibold text-sm">Supabase Belum Terhubung</p>
              <p>
                Pastikan <code>NEXT_PUBLIC_SUPABASE_URL</code> dan <code>NEXT_PUBLIC_SUPABASE_ANON_KEY</code> sudah terisi di file <code>.env.local</code>.
              </p>
            </div>
          </div>
          <Link
            href="/admin/login"
            className="px-3 py-1.5 rounded-lg bg-amber-200 dark:bg-amber-800 font-medium hover:opacity-80 transition w-max shrink-0"
          >
            Panduan Login
          </Link>
        </div>
      ) : (
        userEmail && (
          <div className="text-xs text-neutral-500 flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 inline-block" />
            <span>Login sebagai <strong>{userEmail}</strong> &bull; Supabase Live</span>
          </div>
        )
      )}

      {/* Metrics Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs uppercase font-semibold text-neutral-500 tracking-wider">
            Total Proyek di Supabase
          </p>
          <p className="text-3xl font-bold mt-2">{projects.length}</p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs uppercase font-semibold text-neutral-500 tracking-wider">
            Kategori Aktif
          </p>
          <p className="text-3xl font-bold mt-2">
            {new Set(projects.map((p) => p.category)).size}
          </p>
        </div>

        <div className="p-5 rounded-2xl bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800">
          <p className="text-xs uppercase font-semibold text-neutral-500 tracking-wider">
            Status Database
          </p>
          <div className="flex items-center gap-2 mt-2">
            <Sparkles className="w-5 h-5 text-emerald-500" />
            <span className="text-sm font-semibold">
              {isConfigured ? "Supabase Live Database" : "Disconnected"}
            </span>
          </div>
        </div>
      </div>

      {/* Project List Table / Grid */}
      <div className="bg-white dark:bg-neutral-900 border border-neutral-200 dark:border-neutral-800 rounded-2xl overflow-hidden shadow-sm">
        <div className="p-4 sm:p-6 border-b border-neutral-200 dark:border-neutral-800 flex items-center justify-between">
          <h2 className="font-semibold text-lg">Daftar Karya &amp; Proyek</h2>
          <button
            onClick={loadData}
            className="p-2 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
            title="Refresh"
          >
            <RefreshCw className={`w-4 h-4 ${loading ? "animate-spin" : ""}`} />
          </button>
        </div>

        {loading ? (
          <div className="p-12 text-center text-neutral-500 flex flex-col items-center justify-center gap-2">
            <Loader2 className="w-6 h-6 animate-spin" />
            <p className="text-sm">Memuat data proyek dari Supabase...</p>
          </div>
        ) : projects.length === 0 ? (
          <div className="p-12 text-center text-neutral-500">
            <FolderPlus className="w-10 h-10 mx-auto text-neutral-400 mb-3" />
            <p className="font-medium">Belum ada proyek di database Supabase.</p>
            <Link
              href="/admin/projects/new"
              className="inline-block mt-4 text-xs font-semibold text-black dark:text-white underline"
            >
              Tambah proyek pertama Anda sekarang &rarr;
            </Link>
          </div>
        ) : (
          <div className="divide-y divide-neutral-200 dark:divide-neutral-800">
            {projects.map((project) => (
              <div
                key={project.id}
                className="p-4 sm:p-5 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 hover:bg-neutral-50/50 dark:hover:bg-neutral-800/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  {/* Thumbnail */}
                  <div
                    className="w-16 h-12 rounded-lg bg-cover bg-center shrink-0 border border-neutral-200 dark:border-neutral-800"
                    style={{ backgroundImage: `url(${project.image_url})` }}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <h3 className="font-semibold text-sm sm:text-base">
                        {project.title}
                      </h3>
                      <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-neutral-100 dark:bg-neutral-800 text-neutral-600 dark:text-neutral-400">
                        {project.category}
                      </span>
                    </div>
                    <p className="text-xs text-neutral-500 line-clamp-1 mt-0.5">
                      {project.description}
                    </p>
                    {/* Tech Badges */}
                    {project.tech_stack && project.tech_stack.length > 0 && (
                      <div className="flex flex-wrap gap-1 mt-2">
                        {project.tech_stack.map((t, idx) => (
                          <span
                            key={idx}
                            className="px-1.5 py-0.2 rounded text-[10px] font-mono bg-neutral-100 dark:bg-neutral-800 text-neutral-500"
                          >
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex items-center gap-2 self-end sm:self-center shrink-0">
                  {project.link && (
                    <a
                      href={project.link}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-2 rounded-lg text-neutral-500 hover:text-black dark:hover:text-white hover:bg-neutral-100 dark:hover:bg-neutral-800 transition"
                      title="Lihat Link Live"
                    >
                      <ExternalLink className="w-4 h-4" />
                    </a>
                  )}

                  <Link
                    href={`/admin/projects/${project.id}/edit`}
                    className="p-2 rounded-lg text-neutral-500 hover:text-blue-600 hover:bg-blue-50 dark:hover:bg-blue-950/40 transition"
                    title="Edit Proyek"
                  >
                    <Pencil className="w-4 h-4" />
                  </Link>

                  <button
                    onClick={() => handleDelete(project.id, project.title)}
                    disabled={deletingId === project.id}
                    className="p-2 rounded-lg text-neutral-500 hover:text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition cursor-pointer disabled:opacity-50"
                    title="Hapus Proyek"
                  >
                    {deletingId === project.id ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Trash2 className="w-4 h-4" />
                    )}
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
