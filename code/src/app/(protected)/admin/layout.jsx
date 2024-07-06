import { Inter } from "next/font/google";

import "@/app/styles/globals.css";

const inter = Inter({ subsets: ["latin"] });


export default function RootLayout({ children }) {
  return (
    <div className="h-full flex items-center justify-center">
        {children}
    </div>
  );
}