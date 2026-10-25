export interface Project {
  id: string;
  title: string;
  description: string;
  image_url: string;
  link?: string;
  github_url?: string;
  category: string;
  tech_stack: string[];
  is_featured?: boolean;
  order_index?: number;
  created_at?: string;
}

export type ProjectFormData = Omit<Project, "id" | "created_at">;

export const PROJECT_CATEGORIES = [
  "All",
  "Fullstack Project",
  "Personal Brand",
  "Wedding Invitation",
  "UI/UX Design",
  "Mobile App",
] as const;
