/**
 * ============================================================
 * himanshu — E-Commerce for Indian Artisans
 * ============================================================
 * @author      Himanshu
 * @github      https://github.com/Newbie-Himanshu
 * @repo        https://github.com/Newbie-Himanshu/himanshu-frontend
 * @copyright   2026 Himanshu — himanshu. All rights reserved.
 * @license     MIT
 * ------------------------------------------------------------
 * @lastModifiedBy  Himanshu
 * @modifiedWith    GitHub Copilot
 * @modifiedOn      2026-03-06
 * @changeNote      Added himanshu Google font imports (Plus Jakarta Sans, Playfair Display, Tiro Devanagari Hindi)
 * ============================================================
 */

import { getBaseURL } from "@lib/util/env"
import { Metadata } from "next"
import { Plus_Jakarta_Sans, Playfair_Display, Tiro_Devanagari_Hindi, DM_Sans } from "next/font/google"
import "../styles/globals.css"
import { ToastProvider } from "@modules/common/contexts/toast-context"
import { ToastContainer } from "@modules/common/components/toast-container"

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  display: "swap",
})

const playfairDisplay = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
})

const tiroDevanagariHindi = Tiro_Devanagari_Hindi({
  subsets: ["devanagari"],
  variable: "--font-hindi",
  weight: "400",
  display: "swap",
})

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm",
  display: "swap",
})

export const metadata: Metadata = {
  metadataBase: new URL(getBaseURL()),
  title: "himanshu — E-Commerce for Indian Artisans",
  description: "An open e-commerce platform built for India's artisans and handcraft sellers.",
  authors: [{ name: "Himanshu", url: "https://github.com/Newbie-Himanshu" }],
}

export default function RootLayout(props: { children: React.ReactNode }) {
  return (
    <html
      lang="en"
      data-mode="light"
      className={`${plusJakartaSans.variable} ${playfairDisplay.variable} ${tiroDevanagariHindi.variable} ${dmSans.variable}`}
    >
      <body>
        <ToastProvider>
          <main className="relative">{props.children}</main>
          <ToastContainer />
        </ToastProvider>
      </body>
    </html>
  )
}
