import { Metadata } from "next"

import HelpCenterTemplate from "@modules/help-center/templates"

export const metadata: Metadata = {
  title: "Help Center | Himanshu",
  description:
    "Find answers about orders, shipping, returns, payments and managing your Himanshu account.",
}

type Params = {
  searchParams: Promise<{
    q?: string
    section?: string
  }>
  params: Promise<{
    countryCode: string
  }>
}

export default async function HelpCenterPage(props: Params) {
  const searchParams = await props.searchParams
  const q = (searchParams.q ?? "").trim()
  const section = (searchParams.section ?? "").trim()

  return <HelpCenterTemplate q={q} section={section} />
}
