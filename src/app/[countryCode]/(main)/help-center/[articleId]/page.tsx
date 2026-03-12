import { Metadata } from "next"
import { notFound } from "next/navigation"

import { ARTICLES, getArticleById, getSectionLabel } from "@modules/help-center/data/faq"
import ArticleDetailTemplate from "@modules/help-center/templates/article"

type Params = {
  params: Promise<{
    countryCode: string
    articleId: string
  }>
}

// ── Static params for build-time generation ───────────────────────────────────
export function generateStaticParams() {
  return ARTICLES.map((a) => ({ articleId: a.id }))
}

// ── Dynamic metadata ──────────────────────────────────────────────────────────
export async function generateMetadata(props: Params): Promise<Metadata> {
  const { articleId } = await props.params
  const article = getArticleById(articleId)
  if (!article) return { title: "Not Found | himanshu Help Center" }

  const sectionLabel = getSectionLabel(article.section)
  return {
    title: `${article.title} | ${sectionLabel} | himanshu Help Center`,
    description: article.description,
  }
}

// ── Page component ────────────────────────────────────────────────────────────
export default async function ArticlePage(props: Params) {
  const { articleId } = await props.params

  // 404 early — template also calls notFound() but this gives cleaner Next.js handling
  if (!getArticleById(articleId)) notFound()

  return <ArticleDetailTemplate articleId={articleId} />
}
