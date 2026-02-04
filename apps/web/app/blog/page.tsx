import { BlogListClient } from "@/components/blog-list-client";
import { getBlogPosts } from "@/lib/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Backend Engineering Blog",
    description:
        "Engineering notes about backend architecture, automation, and scalable systems.",
    alternates: {
        canonical: "/blog",
        languages: {
            en: "/blog",
            id: "/id/blog",
        },
    },
    openGraph: {
        title: "Backend Engineering Blog",
        description:
            "Technical notes on backend architecture, automation, and reliability.",
        url: "/blog",
        type: "website",
    },
};

const copy = {
    en: {
        title: "Blog",
        subtitle:
            "Technical notes, lessons learned, and backend engineering insights.",
    },
    id: {
        title: "Blog",
        subtitle:
            "Catatan teknis, lesson learned, dan insight engineering backend.",
    },
} as const;

export default function BlogPage() {
    const locale = "en";
    const t = copy[locale];
    const posts = getBlogPosts(locale);

    return (
        <main className='mx-auto max-w-6xl space-y-8'>
            <header className='space-y-2'>
                <h1 className='type-section-title'>{t.title}</h1>
                <p className='type-body text-muted-foreground'>{t.subtitle}</p>
            </header>

            <BlogListClient locale={locale} posts={posts} />
        </main>
    );
}
