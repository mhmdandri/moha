import { Outfit as OutfitFont, Ovo as OvoFont } from "next/font/google";

export const outfit = OutfitFont({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

export const ovo = OvoFont({
  subsets: ["latin"],
  weight: "400",
});
