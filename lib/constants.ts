export interface NavLink {
  href: string;
  label: string;
}

export const NAV_LINKS: NavLink[] = [
  { href: "#home", label: "Beranda" },
  { href: "#about", label: "Tentang" },
  { href: "#services", label: "Layanan" },
  { href: "#project", label: "Projects" },
  { href: "#faq", label: "FAQ" },
  { href: "#contact", label: "Kontak" },
];
