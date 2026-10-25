import { Project, ProjectFormData } from "@/types/project";
import { createClient, isSupabaseConfigured } from "./supabase/client";

export async function getProjects(): Promise<Project[]> {
  if (!isSupabaseConfigured()) {
    return [];
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .order("order_index", { ascending: true })
      .order("created_at", { ascending: false });

    if (error) {
      console.error("Error fetching projects from Supabase:", error.message);
      return [];
    }

    return (data as Project[]) || [];
  } catch (err: unknown) {
    console.error("Unexpected error in getProjects:", err);
    return [];
  }
}

export async function getProjectById(id: string): Promise<Project | null> {
  if (!isSupabaseConfigured()) {
    return null;
  }

  try {
    const supabase = createClient();
    const { data, error } = await supabase
      .from("projects")
      .select("*")
      .eq("id", id)
      .single();

    if (error || !data) {
      return null;
    }

    return data as Project;
  } catch {
    return null;
  }
}

export async function createProject(formData: ProjectFormData): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase belum terkonfigurasi di file .env.local" };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from("projects").insert([formData]);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menambahkan project ke Supabase";
    return { success: false, error: message };
  }
}

export async function updateProject(
  id: string,
  formData: Partial<ProjectFormData>
): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase belum terkonfigurasi di file .env.local" };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from("projects").update(formData).eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal memperbarui project di Supabase";
    return { success: false, error: message };
  }
}

export async function deleteProject(id: string): Promise<{ success: boolean; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { success: false, error: "Supabase belum terkonfigurasi di file .env.local" };
  }

  try {
    const supabase = createClient();
    const { error } = await supabase.from("projects").delete().eq("id", id);

    if (error) {
      return { success: false, error: error.message };
    }

    return { success: true };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal menghapus project dari Supabase";
    return { success: false, error: message };
  }
}

export async function uploadProjectImage(file: File): Promise<{ url?: string; error?: string }> {
  if (!isSupabaseConfigured()) {
    return { error: "Supabase belum terkonfigurasi. Silakan periksa URL & Key di .env.local" };
  }

  try {
    const supabase = createClient();
    const fileExt = file.name.split(".").pop();
    const fileName = `${Date.now()}-${Math.random().toString(36).substring(2, 9)}.${fileExt}`;
    const filePath = `uploads/${fileName}`;

    const { error: uploadError } = await supabase.storage
      .from("project-images")
      .upload(filePath, file, {
        cacheControl: "3600",
        upsert: false,
      });

    if (uploadError) {
      return { error: uploadError.message };
    }

    const { data } = supabase.storage.from("project-images").getPublicUrl(filePath);
    return { url: data.publicUrl };
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : "Gagal mengupload gambar ke Supabase Storage";
    return { error: message };
  }
}
