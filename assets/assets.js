import vscode from "./vscode.png";
import firebase from "./firebase.png";
import figma from "./figma.png";
import git from "./git.png";
import mongodb from "./mongodb.png";
import logo from "./logo.png";
import header_bg_color from "./header-bg-color.png";
import {
  BriefcaseBusiness,
  Code,
  Layers,
  Rocket,
  Route,
  Sparkles,
} from "lucide-react";

export const assets = {
  logo,
  header_bg_color,
  vscode,
  firebase,
  mongodb,
  figma,
  git,
};

export const serviceData = [
  {
    icon: Code,
    title: "Jasa Website & Web App Fullstack",
    description:
      "Pembuatan website company profile, portal bisnis, dan sistem informasi custom dengan performa tinggi, aman, dan mudah dikelola.",
    link: "",
  },
  {
    icon: Sparkles,
    title: "Jasa Undangan Pernikahan Digital",
    description:
      "Website undangan digital eksklusif dengan sistem RSVP realtime, Personal QR Code check-in buku tamu, galeri foto, dan musik.",
    link: "",
  },
  {
    icon: Rocket,
    title: "Jasa Landing Page & Personal Brand",
    description:
      "Halaman arahan (landing page) berkonversi tinggi untuk personal brand, produk, atau UMKM agar kredibel dan terindeks di Google.",
    link: "",
  },
  {
    icon: Layers,
    title: "Jasa Desain UI/UX & Redesign Web",
    description:
      "Merancang antarmuka website dan aplikasi yang intuitif, modern, dan mobile-first untuk pengalaman pengguna yang memuaskan.",
    link: "",
  },
];

export const infoList = [
  {
    icon: Code,
    title: "Languages & Frameworks",
    description: "Next.js, React.js, TypeScript, Tailwind CSS, Node.js, PHP, PostgreSQL",
  },
  {
    icon: Route,
    title: "Journey",
    description:
      "Berawal dari rasa ingin tahu sebagai coder, kini kami menciptakan pengalaman digital yang penuh jiwa dan presisi.",
  },
  {
    icon: BriefcaseBusiness,
    title: "Projects",
    description:
      "Membangun antarmuka responsif dan sistem andal dengan kejernihan, performa tinggi, dan ketelitian.",
  },
];

export const toolsData = [
  assets.vscode,
  assets.firebase,
  assets.mongodb,
  assets.figma,
  assets.git,
];
