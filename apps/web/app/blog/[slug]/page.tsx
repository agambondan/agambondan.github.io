import { MarkdownContent } from "@/components/markdown-content";
import { Badge } from "@/components/ui/badge";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog-posts";
import type { Metadata } from "next";
import Image from "next/image";
import { notFound } from "next/navigation";

type Params = {
  params: { slug: string };
};

export function generateStaticParams() {
  return getBlogPosts().map((post) => ({ slug: post.slug }));
}

export function generateMetadata({ params }: Params): Metadata {
  const locale = "en";
  const post = getBlogPostBySlug(params.slug, locale);
  if (!post) {
    return { title: "Post Not Found" };
  }

  return {
    title: post.title,
    description: post.description,
    openGraph: {
      title: post.title,
      description: post.description,
      type: "article",
      publishedTime: post.publishedAt,
      url: `/blog/${post.slug}`
    },
    alternates: {
      canonical: `/blog/${post.slug}`,
      languages: {
        en: `/blog/${post.slug}`,
        id: `/id/blog/${post.slug}`
      }
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.description
    }
  };
}

export default function BlogPostPage({ params }: Params) {
  const locale = "en";
  const post = getBlogPostBySlug(params.slug, locale);

  if (!post) {
    notFound();
  }

  return (
    <main className="mx-auto max-w-4xl space-y-8">
      <header className="space-y-4">
        <h1 className="blog-link type-section-title">{post.title}</h1>
        <p className="type-caption text-muted-foreground">
          {new Date(post.publishedAt).toLocaleDateString("en-US")}
        </p>
        <div className="flex flex-wrap gap-2">
          {post.tags.map((tag) => (
            <Badge className="blog-tag" key={tag} variant="secondary">
              {tag}
            </Badge>
          ))}
        </div>
      </header>

      <figure className="blog-detail-thumbnail overflow-hidden rounded-xl border border-violet-200/20">
        <Image
          alt={`${post.title} thumbnail`}
          className="blog-detail-thumbnail-image"
          height={630}
          priority
          src={post.thumbnail || "/blog-thumbnails/structural.svg"}
          width={1200}
        />
      </figure>

      <article className="markdown-body blog-body markdown-surface rounded-xl border border-violet-200/20 p-6 md:p-8">
        <MarkdownContent content={post.contentMarkdown} locale="en" />
      </article>
    </main>
  );
}
