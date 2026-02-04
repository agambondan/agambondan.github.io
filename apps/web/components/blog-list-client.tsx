"use client";

import React from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import {
    Card,
    CardContent,
    CardDescription,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import type { BlogPost } from "@/lib/blog-posts";
import type { AppLocale } from "@/lib/i18n";
import { localeHref } from "@/lib/i18n";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

type BlogListClientProps = {
    posts: BlogPost[];
    locale: AppLocale;
};

type BlogSort = "newest" | "oldest" | "title-asc" | "title-desc";

type BlogFilters = {
    query: string;
    tags: string[];
    sort: BlogSort;
};

const PAGE_SIZE = 6;

const copy = {
    en: {
        searchPlaceholder: "Search by title, description, or tag",
        filterByTags: "Filter by tags",
        selectedTags: "Selected tags",
        clearFilters: "Clear filters",
        readMore: "Read article",
        emptyTitle: "No matching articles",
        emptyDesc: "Try a different keyword or remove some selected tags.",
        showing: "Showing {shown} of {total} articles",
        loadMore: "Load more",
        allLoaded: "All articles loaded",
        sortLabel: "Sort by",
        sortNewest: "Newest",
        sortOldest: "Oldest",
        sortTitleAsc: "Title A-Z",
        sortTitleDesc: "Title Z-A",
    },
    id: {
        searchPlaceholder: "Cari berdasarkan judul, deskripsi, atau tag",
        filterByTags: "Filter berdasarkan tag",
        selectedTags: "Tag terpilih",
        clearFilters: "Reset filter",
        readMore: "Baca artikel",
        emptyTitle: "Artikel tidak ditemukan",
        emptyDesc: "Coba kata kunci lain atau kurangi tag yang dipilih.",
        showing: "Menampilkan {shown} dari {total} artikel",
        loadMore: "Muat lebih banyak",
        allLoaded: "Semua artikel sudah ditampilkan",
        sortLabel: "Urutkan",
        sortNewest: "Terbaru",
        sortOldest: "Terlama",
        sortTitleAsc: "Judul A-Z",
        sortTitleDesc: "Judul Z-A",
    },
} as const;

function uniqueTags(posts: BlogPost[]): string[] {
    return Array.from(new Set(posts.flatMap((post) => post.tags))).sort(
        (a, b) => a.localeCompare(b),
    );
}

function isSort(value: string | null): value is BlogSort {
    return (
        value === "newest" ||
        value === "oldest" ||
        value === "title-asc" ||
        value === "title-desc"
    );
}

export function filterBlogPosts(
    posts: BlogPost[],
    filters: BlogFilters,
): BlogPost[] {
    const normalizedQuery = filters.query.trim().toLowerCase();
    const selectedTags = filters.tags;

    return posts.filter((post) => {
        const queryMatched =
            normalizedQuery.length === 0 ||
            post.title.toLowerCase().includes(normalizedQuery) ||
            post.description.toLowerCase().includes(normalizedQuery) ||
            post.tags.some((tag) =>
                tag.toLowerCase().includes(normalizedQuery),
            );

        const tagsMatched = selectedTags.every((tag) =>
            post.tags.includes(tag),
        );
        return queryMatched && tagsMatched;
    });
}

function sortBlogPosts(posts: BlogPost[], sort: BlogSort): BlogPost[] {
    const cloned = [...posts];
    switch (sort) {
        case "oldest":
            return cloned.sort(
                (a, b) =>
                    new Date(a.publishedAt).getTime() -
                    new Date(b.publishedAt).getTime(),
            );
        case "title-asc":
            return cloned.sort((a, b) => a.title.localeCompare(b.title));
        case "title-desc":
            return cloned.sort((a, b) => b.title.localeCompare(a.title));
        case "newest":
        default:
            return cloned.sort(
                (a, b) =>
                    new Date(b.publishedAt).getTime() -
                    new Date(a.publishedAt).getTime(),
            );
    }
}

export function parseFiltersFromParams(params: URLSearchParams): BlogFilters {
    const query = params.get("q") ?? "";
    const tagsParam = params.get("tags") ?? "";
    const tags = tagsParam
        .split(",")
        .map((tag) => tag.trim())
        .filter(Boolean)
        .sort((a, b) => a.localeCompare(b));

    const sortParam = params.get("sort");
    const sort: BlogSort = isSort(sortParam) ? sortParam : "newest";

    return { query, tags, sort };
}

export function BlogListClient({ posts, locale }: BlogListClientProps) {
    const t = copy[locale];
    const pathname = usePathname();
    const allTags = useMemo(() => uniqueTags(posts), [posts]);

    const [query, setQuery] = useState("");
    const [selectedTags, setSelectedTags] = useState<string[]>([]);
    const [sort, setSort] = useState<BlogSort>("newest");
    const [visibleCount, setVisibleCount] = useState(PAGE_SIZE);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        const parsed = parseFiltersFromParams(
            new URLSearchParams(window.location.search),
        );
        setQuery(parsed.query);
        setSelectedTags(parsed.tags);
        setSort(parsed.sort);
        setVisibleCount(PAGE_SIZE);
    }, [pathname]);

    useEffect(() => {
        if (typeof window === "undefined") {
            return;
        }
        const current = new URLSearchParams(window.location.search);
        const next = new URLSearchParams(window.location.search);

        if (query.trim()) {
            next.set("q", query.trim());
        } else {
            next.delete("q");
        }

        if (selectedTags.length > 0) {
            next.set("tags", selectedTags.join(","));
        } else {
            next.delete("tags");
        }

        if (sort !== "newest") {
            next.set("sort", sort);
        } else {
            next.delete("sort");
        }

        const nextQuery = next.toString();
        const currentQuery = current.toString();
        if (nextQuery === currentQuery) {
            return;
        }

        const targetPath = nextQuery ? `${pathname}?${nextQuery}` : pathname;
        const currentPath = `${window.location.pathname}${window.location.search}`;
        if (currentPath === targetPath) {
            return;
        }
        window.history.replaceState(null, "", targetPath);
    }, [pathname, query, selectedTags, sort]);

    const sortedFilteredPosts = useMemo(() => {
        const filtered = filterBlogPosts(posts, {
            query,
            tags: selectedTags,
            sort,
        });
        return sortBlogPosts(filtered, sort);
    }, [posts, query, selectedTags, sort]);

    useEffect(() => {
        setVisibleCount(PAGE_SIZE);
    }, [query, selectedTags, sort]);

    const visiblePosts = sortedFilteredPosts.slice(0, visibleCount);
    const canLoadMore = visiblePosts.length < sortedFilteredPosts.length;

    function toggleTag(tag: string) {
        setSelectedTags((current) => {
            const exists = current.includes(tag);
            const updated = exists
                ? current.filter((value) => value !== tag)
                : [...current, tag];
            return updated.sort((a, b) => a.localeCompare(b));
        });
    }

    function clearFilters() {
        setQuery("");
        setSelectedTags([]);
        setSort("newest");
    }

    function removeSelectedTag(tag: string) {
        setSelectedTags((current) => current.filter((value) => value !== tag));
    }

    const summaryText = t.showing
        .replace("{shown}", String(visiblePosts.length))
        .replace("{total}", String(sortedFilteredPosts.length));

    return (
        <section className='space-y-5'>
            <div className='blog-filter-card glass-card rounded-xl border border-violet-200/20 p-4'>
                <div className='space-y-4'>
                    <input
                        aria-label='Blog search input'
                        className='blog-search-input w-full rounded-md border px-3 py-2 text-sm'
                        onChange={(event) => setQuery(event.target.value)}
                        placeholder={t.searchPlaceholder}
                        type='search'
                        value={query}
                    />

                    <div className='grid gap-3 md:grid-cols-[1fr_auto] md:items-start'>
                        <div className='space-y-2'>
                            <p className='type-caption blog-body font-medium'>
                                {t.filterByTags}
                            </p>
                            <div className='flex flex-wrap gap-2'>
                                {allTags.map((tag) => {
                                    const active = selectedTags.includes(tag);
                                    return (
                                        <button
                                            aria-pressed={active}
                                            className={
                                                active
                                                    ? "blog-tag-filter blog-tag-filter-active"
                                                    : "blog-tag-filter blog-tag-filter-idle"
                                            }
                                            key={tag}
                                            onClick={() => toggleTag(tag)}
                                            type='button'
                                        >
                                            #{tag}
                                        </button>
                                    );
                                })}
                            </div>
                        </div>

                        <div className='space-y-2 md:min-w-[180px]'>
                            <label
                                className='type-caption blog-body font-medium'
                                htmlFor='blog-sort-select'
                            >
                                {t.sortLabel}
                            </label>
                            <select
                                className='blog-sort-select w-full rounded-md border px-3 py-2 text-sm'
                                id='blog-sort-select'
                                onChange={(event) =>
                                    setSort(event.target.value as BlogSort)
                                }
                                value={sort}
                            >
                                <option value='newest'>{t.sortNewest}</option>
                                <option value='oldest'>{t.sortOldest}</option>
                                <option value='title-asc'>
                                    {t.sortTitleAsc}
                                </option>
                                <option value='title-desc'>
                                    {t.sortTitleDesc}
                                </option>
                            </select>
                        </div>
                    </div>

                    <div className='blog-selected-tags rounded-md border p-3'>
                        <p className='type-caption blog-body font-medium'>
                            {t.selectedTags}
                        </p>
                        <div className='mt-2 flex flex-wrap gap-2'>
                            {selectedTags.length === 0 ? (
                                <span className='type-caption blog-body/80'>
                                    -
                                </span>
                            ) : (
                                selectedTags.map((tag) => (
                                    <button
                                        className='blog-tag-filter blog-tag-filter-active'
                                        key={`selected-${tag}`}
                                        onClick={() => removeSelectedTag(tag)}
                                        type='button'
                                    >
                                        #{tag} ×
                                    </button>
                                ))
                            )}
                        </div>
                    </div>

                    <div className='flex flex-wrap items-center justify-between gap-3'>
                        <p className='type-caption blog-body'>{summaryText}</p>
                        <Button
                            className='blog-clear-button'
                            onClick={clearFilters}
                            size='sm'
                            type='button'
                            variant='outline'
                        >
                            {t.clearFilters}
                        </Button>
                    </div>
                </div>
            </div>

            {sortedFilteredPosts.length === 0 ? (
                <Card className='glass-card border-violet-200/20'>
                    <CardHeader>
                        <CardTitle className='type-h3 blog-link'>
                            {t.emptyTitle}
                        </CardTitle>
                        <CardDescription className='type-body'>
                            {t.emptyDesc}
                        </CardDescription>
                    </CardHeader>
                </Card>
            ) : (
                <>
                    <section className='grid gap-4'>
                        {visiblePosts.map((post) => (
                            <Card
                                className='glass-card border-violet-200/20'
                                key={post.slug}
                            >
                                <div className='blog-card-layout'>
                                    <div className='blog-thumbnail-wrap'>
                                        <Image
                                            alt={`${post.title} thumbnail`}
                                            className='blog-thumbnail'
                                            height={220}
                                            src={
                                                post.thumbnail ||
                                                "/blog-thumbnails/structural.svg"
                                            }
                                            width={392}
                                        />
                                    </div>

                                    <div className='blog-card-content'>
                                        <CardHeader className='space-y-2'>
                                            <CardTitle>
                                                <Link
                                                    className='blog-link type-h3 hover:underline'
                                                    href={localeHref(
                                                        `/blog/${post.slug}`,
                                                        locale,
                                                    )}
                                                >
                                                    {post.title}
                                                </Link>
                                            </CardTitle>
                                            <CardDescription className='type-caption'>
                                                {new Date(
                                                    post.publishedAt,
                                                ).toLocaleDateString(
                                                    locale === "id"
                                                        ? "id-ID"
                                                        : "en-US",
                                                )}
                                            </CardDescription>
                                        </CardHeader>
                                        <CardContent className='space-y-4'>
                                            <p className='blog-body type-body'>
                                                {post.description}
                                            </p>
                                            <div className='flex flex-wrap gap-2'>
                                                {post.tags.map((tag) => (
                                                    <Badge
                                                        className='blog-tag'
                                                        key={tag}
                                                        variant='secondary'
                                                    >
                                                        {tag}
                                                    </Badge>
                                                ))}
                                            </div>
                                            <Link
                                                className='blog-link type-caption inline-flex font-medium'
                                                href={localeHref(
                                                    `/blog/${post.slug}`,
                                                    locale,
                                                )}
                                            >
                                                {t.readMore} →
                                            </Link>
                                        </CardContent>
                                    </div>
                                </div>
                            </Card>
                        ))}
                    </section>

                    <div className='flex justify-center pt-2'>
                        {canLoadMore ? (
                            <Button
                                className='blog-load-more'
                                onClick={() =>
                                    setVisibleCount(
                                        (count) => count + PAGE_SIZE,
                                    )
                                }
                                type='button'
                            >
                                {t.loadMore}
                            </Button>
                        ) : (
                            <p className='type-caption blog-body'>
                                {t.allLoaded}
                            </p>
                        )}
                    </div>
                </>
            )}
        </section>
    );
}
