import {
  Lato as FontSans,
  Libre_Baskerville as FontSerif,
} from "next/font/google";

export const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["100", "300", "400", "700", "900"],
});

export const fontSerif = FontSerif({
  subsets: ["latin"],
  variable: "--font-serif",
  weight: ["400", "700"],
});
