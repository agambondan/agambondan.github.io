import { BlogListClient } from "@/components/blog-list-client";
import { getBlogPosts } from "@/lib/blog-posts";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Blog Engineering Backend",
    description:
        "Catatan teknis backend dan system design dalam Bahasa Indonesia.",
    alternates: {
        canonical: "/id/blog",
        languages: {
            en: "/blog",
            id: "/id/blog",
        },
    },
    openGraph: {
        title: "Blog Engineering Backend",
        description:
            "Catatan teknis tentang arsitektur backend, otomasi, dan skalabilitas.",
        url: "/id/blog",
        type: "website",
        locale: "id_ID",
    },
};

export default function IndonesianBlogPage() {
    const locale = "id" as const;
    const posts = getBlogPosts(locale);

    return (
        <main className='mx-auto max-w-6xl space-y-8'>
            <header className='space-y-2'>
                <h1 className='type-section-title'>Blog</h1>
                <p className='type-body text-muted-foreground'>
                    Catatan teknis, lesson learned, dan insight engineering
                    backend.
                </p>
            </header>

            <BlogListClient locale={locale} posts={posts} />
        </main>
    );
}
