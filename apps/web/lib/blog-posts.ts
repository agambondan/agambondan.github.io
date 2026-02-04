import type { AppLocale } from "@/lib/i18n";

type LocalizedText = {
  en: string;
  id: string;
};

type RawBlogPost = {
  slug: string;
  title: LocalizedText;
  description: LocalizedText;
  publishedAt: string;
  thumbnail: string;
  tags: string[];
  contentMarkdown: LocalizedText;
};

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  thumbnail: string;
  tags: string[];
  contentMarkdown: string;
};

type PatternMeta = {
  slug: string;
  codeName: string;
  nameEn: string;
  nameId: string;
  category: "Creational" | "Structural" | "Behavioral";
  focusEn: string;
  focusId: string;
  useCaseEn: string;
  useCaseId: string;
};

const patternCatalog: PatternMeta[] = [
  {
    slug: "factory-method-go",
    codeName: "FactoryMethod",
    nameEn: "Factory Method",
    nameId: "Factory Method",
    category: "Creational",
    focusEn: "centralize object creation and avoid constructor leakage in service logic",
    focusId: "memusatkan pembuatan objek agar constructor tidak bocor ke alur service",
    useCaseEn: "select notifier implementation by config (email, slack, webhook)",
    useCaseId: "memilih implementasi notifier berdasarkan config (email, slack, webhook)"
  },
  {
    slug: "abstract-factory-go",
    codeName: "AbstractFactory",
    nameEn: "Abstract Factory",
    nameId: "Abstract Factory",
    category: "Creational",
    focusEn: "produce related object families with one coherent creation contract",
    focusId: "membuat keluarga objek terkait lewat satu kontrak pembuatan yang konsisten",
    useCaseEn: "switch between payment provider families (client, signer, validator)",
    useCaseId: "berpindah antar keluarga provider payment (client, signer, validator)"
  },
  {
    slug: "builder-pattern-go",
    codeName: "Builder",
    nameEn: "Builder",
    nameId: "Builder",
    category: "Creational",
    focusEn: "construct complex objects step-by-step with explicit configuration stages",
    focusId: "membangun objek kompleks bertahap dengan tahap konfigurasi yang eksplisit",
    useCaseEn: "compose HTTP client with timeout, retry, circuit breaker, and telemetry",
    useCaseId: "merakit HTTP client dengan timeout, retry, circuit breaker, dan telemetry"
  },
  {
    slug: "prototype-pattern-go",
    codeName: "Prototype",
    nameEn: "Prototype",
    nameId: "Prototype",
    category: "Creational",
    focusEn: "clone baseline objects safely when creation cost or setup is high",
    focusId: "mengkloning objek baseline saat biaya pembuatan atau setup tinggi",
    useCaseEn: "clone campaign rule templates for many tenants",
    useCaseId: "mengkloning template aturan campaign untuk banyak tenant"
  },
  {
    slug: "adapter-pattern-go",
    codeName: "Adapter",
    nameEn: "Adapter",
    nameId: "Adapter",
    category: "Structural",
    focusEn: "translate incompatible third-party interfaces into internal ports",
    focusId: "menerjemahkan interface third-party yang tidak kompatibel ke port internal",
    useCaseEn: "normalize vendor payment response format",
    useCaseId: "menormalkan format response payment vendor"
  },
  {
    slug: "bridge-pattern-go",
    codeName: "Bridge",
    nameEn: "Bridge",
    nameId: "Bridge",
    category: "Structural",
    focusEn: "separate abstraction from implementation so both can evolve independently",
    focusId: "memisahkan abstraksi dari implementasi agar keduanya bisa berkembang independen",
    useCaseEn: "decouple notification workflow from transport channel implementation",
    useCaseId: "memisahkan workflow notifikasi dari implementasi channel transport"
  },
  {
    slug: "composite-pattern-go",
    codeName: "Composite",
    nameEn: "Composite",
    nameId: "Composite",
    category: "Structural",
    focusEn: "treat part-whole hierarchies uniformly through one component contract",
    focusId: "memperlakukan hierarki part-whole secara seragam lewat satu kontrak komponen",
    useCaseEn: "evaluate nested authorization rules",
    useCaseId: "mengevaluasi aturan otorisasi bertingkat"
  },
  {
    slug: "decorator-pattern-go",
    codeName: "Decorator",
    nameEn: "Decorator",
    nameId: "Decorator",
    category: "Structural",
    focusEn: "add behavior dynamically without changing core implementation",
    focusId: "menambah perilaku secara dinamis tanpa mengubah implementasi inti",
    useCaseEn: "wrap repository with caching, metrics, and tracing",
    useCaseId: "membungkus repository dengan caching, metrics, dan tracing"
  },
  {
    slug: "facade-pattern-go",
    codeName: "Facade",
    nameEn: "Facade",
    nameId: "Facade",
    category: "Structural",
    focusEn: "provide a simple entrypoint over a complex subsystem",
    focusId: "menyediakan entrypoint sederhana di atas subsystem yang kompleks",
    useCaseEn: "single onboarding orchestrator for user, billing, and email services",
    useCaseId: "orchestrator onboarding tunggal untuk service user, billing, dan email"
  },
  {
    slug: "flyweight-pattern-go",
    codeName: "Flyweight",
    nameEn: "Flyweight",
    nameId: "Flyweight",
    category: "Structural",
    focusEn: "share immutable state to reduce memory footprint",
    focusId: "membagi state immutable untuk mengurangi penggunaan memori",
    useCaseEn: "reuse compiled rule expressions across requests",
    useCaseId: "menggunakan ulang ekspresi rule yang sudah dikompilasi antar request"
  },
  {
    slug: "proxy-pattern-go",
    codeName: "Proxy",
    nameEn: "Proxy",
    nameId: "Proxy",
    category: "Structural",
    focusEn: "control access to an object with additional policies",
    focusId: "mengontrol akses ke objek dengan kebijakan tambahan",
    useCaseEn: "protect expensive external API with rate limit and auth checks",
    useCaseId: "melindungi API eksternal mahal dengan rate limit dan auth check"
  },
  {
    slug: "strategy-pattern-go",
    codeName: "Strategy",
    nameEn: "Strategy",
    nameId: "Strategy",
    category: "Behavioral",
    focusEn: "switch algorithm behavior at runtime through a stable interface",
    focusId: "menukar perilaku algoritma saat runtime melalui interface stabil",
    useCaseEn: "choose fraud scoring strategy by market",
    useCaseId: "memilih strategi fraud scoring berdasarkan market"
  },
  {
    slug: "observer-pattern-go",
    codeName: "Observer",
    nameEn: "Observer",
    nameId: "Observer",
    category: "Behavioral",
    focusEn: "broadcast state changes to many subscribers with loose coupling",
    focusId: "menyebarkan perubahan state ke banyak subscriber dengan coupling rendah",
    useCaseEn: "order paid event triggers email, analytics, and inventory updates",
    useCaseId: "event order paid memicu email, analytics, dan update inventory"
  },
  {
    slug: "chain-of-responsibility-go",
    codeName: "ChainOfResponsibility",
    nameEn: "Chain of Responsibility",
    nameId: "Chain of Responsibility",
    category: "Behavioral",
    focusEn: "pass request through ordered handlers until one handles it",
    focusId: "melewatkan request melalui handler berurutan sampai ada yang menangani",
    useCaseEn: "API request validation pipeline (auth, schema, quota)",
    useCaseId: "pipeline validasi request API (auth, schema, quota)"
  },
  {
    slug: "command-pattern-go",
    codeName: "Command",
    nameEn: "Command",
    nameId: "Command",
    category: "Behavioral",
    focusEn: "encapsulate actions as objects for queueing and auditing",
    focusId: "membungkus aksi sebagai objek untuk queueing dan auditing",
    useCaseEn: "background job command for invoice generation",
    useCaseId: "command background job untuk pembuatan invoice"
  },
  {
    slug: "interpreter-pattern-go",
    codeName: "Interpreter",
    nameEn: "Interpreter",
    nameId: "Interpreter",
    category: "Behavioral",
    focusEn: "evaluate language grammar for domain-specific expressions",
    focusId: "mengevaluasi grammar bahasa untuk ekspresi domain-spesifik",
    useCaseEn: "evaluate eligibility DSL for promotions",
    useCaseId: "mengevaluasi DSL eligibility untuk promosi"
  },
  {
    slug: "iterator-pattern-go",
    codeName: "Iterator",
    nameEn: "Iterator",
    nameId: "Iterator",
    category: "Behavioral",
    focusEn: "traverse collections uniformly without exposing internal structure",
    focusId: "menjelajah koleksi secara seragam tanpa membocorkan struktur internal",
    useCaseEn: "walk paginated API results as a single stream",
    useCaseId: "menelusuri hasil API ter-pagination sebagai satu stream"
  },
  {
    slug: "mediator-pattern-go",
    codeName: "Mediator",
    nameEn: "Mediator",
    nameId: "Mediator",
    category: "Behavioral",
    focusEn: "centralize communication between multiple components",
    focusId: "memusatkan komunikasi antar banyak komponen",
    useCaseEn: "coordinate checkout workflow between cart, payment, and shipping",
    useCaseId: "mengorkestrasi workflow checkout antara cart, payment, dan shipping"
  },
  {
    slug: "memento-pattern-go",
    codeName: "Memento",
    nameEn: "Memento",
    nameId: "Memento",
    category: "Behavioral",
    focusEn: "capture and restore object state safely",
    focusId: "menangkap dan memulihkan state objek secara aman",
    useCaseEn: "rollback draft workflow changes before final submit",
    useCaseId: "rollback perubahan workflow draft sebelum submit final"
  },
  {
    slug: "state-pattern-go",
    codeName: "State",
    nameEn: "State",
    nameId: "State",
    category: "Behavioral",
    focusEn: "model behavior by state to avoid large conditional blocks",
    focusId: "memodelkan perilaku berbasis state untuk menghindari conditional besar",
    useCaseEn: "order lifecycle transition (created, paid, shipped, completed)",
    useCaseId: "transisi lifecycle order (created, paid, shipped, completed)"
  },
  {
    slug: "template-method-go",
    codeName: "TemplateMethod",
    nameEn: "Template Method",
    nameId: "Template Method",
    category: "Behavioral",
    focusEn: "define algorithm skeleton and customize selected steps",
    focusId: "mendefinisikan kerangka algoritma dan menyesuaikan langkah tertentu",
    useCaseEn: "standardized ETL job pipeline with customizable transforms",
    useCaseId: "pipeline ETL standar dengan transform yang bisa dikustomisasi"
  },
  {
    slug: "visitor-pattern-go",
    codeName: "Visitor",
    nameEn: "Visitor",
    nameId: "Visitor",
    category: "Behavioral",
    focusEn: "add operations to object structures without changing element types",
    focusId: "menambahkan operasi ke struktur objek tanpa mengubah tipe elemennya",
    useCaseEn: "apply reporting/export operations over policy AST nodes",
    useCaseId: "menerapkan operasi reporting/export pada node AST kebijakan"
  }
];

function buildMarkdownEn(meta: PatternMeta): string {
  return `## Overview

${meta.nameEn} is a **${meta.category.toLowerCase()} design pattern** used to ${meta.focusEn}. In real backend services, this pattern helps teams keep modules decoupled while still shipping features quickly.

## Problem It Solves

Without ${meta.nameEn}, teams often mix orchestration, external integration, and domain rules in one place. That leads to high coupling, difficult testing, and expensive refactoring.

## 5W + 1H

### What
${meta.nameEn} is a pattern that structures collaboration between components to solve a recurring design problem.

### Why
To increase maintainability, isolate change, and enforce clear boundaries between policy and implementation detail.

### Who
Backend engineers, platform engineers, and API teams working with integrations and evolving business logic.

### When
Use ${meta.nameEn} when your service complexity is growing and one responsibility starts bleeding into unrelated modules.

### Where
Apply it in service boundaries such as application use cases, integration adapters, workflow orchestration, and domain policies.

### How
Define stable ports first, then implement adapters and wire them through use-case orchestration.

## Go Implementation (Step-by-step)

### 1) Port / interface definitions

\
\
\
\`\`\`go
package ports

import "context"

type ${meta.codeName}Input struct {
	RequestID string
	Payload   map[string]any
}

type ${meta.codeName}Output struct {
	Status string
	Data   map[string]any
}

type ${meta.codeName}Port interface {
	Execute(ctx context.Context, in ${meta.codeName}Input) (${meta.codeName}Output, error)
}
\`\`\`

### 2) Adapter / implementation

\`\`\`go
package adapters

import (
	"context"
	"fmt"
	"myapp/internal/ports"
)

type ${meta.codeName}Adapter struct {
	providerName string
}

func New${meta.codeName}Adapter(providerName string) *${meta.codeName}Adapter {
	return &${meta.codeName}Adapter{providerName: providerName}
}

func (a *${meta.codeName}Adapter) Execute(ctx context.Context, in ports.${meta.codeName}Input) (ports.${meta.codeName}Output, error) {
	if in.RequestID == "" {
		return ports.${meta.codeName}Output{}, fmt.Errorf("request id is required")
	}

	return ports.${meta.codeName}Output{
		Status: "ok",
		Data: map[string]any{
			"pattern": "${meta.nameEn}",
			"provider": a.providerName,
		},
	}, nil
}
\`\`\`

### 3) Use-case / main wiring

\`\`\`go
package main

import (
	"context"
	"fmt"
	"log"
	"myapp/internal/adapters"
	"myapp/internal/ports"
)

func run(ctx context.Context, svc ports.${meta.codeName}Port) error {
	out, err := svc.Execute(ctx, ports.${meta.codeName}Input{
		RequestID: "REQ-1001",
		Payload: map[string]any{"source": "api"},
	})
	if err != nil {
		return err
	}

	fmt.Println("status:", out.Status, "pattern:", out.Data["pattern"])
	return nil
}

func main() {
	ctx := context.Background()
	service := adapters.New${meta.codeName}Adapter("default-provider")
	if err := run(ctx, service); err != nil {
		log.Fatal(err)
	}
}
\`\`\`

## Suggested Project Structure

\`\`\`text
cmd/
  api/
    main.go
internal/
  domain/
    ${meta.slug}/
      model.go
      policy.go
  application/
    ${meta.slug}/
      usecase.go
  ports/
    ${meta.slug}_port.go
  adapters/
    inbound/
      http/
        ${meta.slug}_handler.go
    outbound/
      ${meta.slug}_adapter.go
  infrastructure/
    config/
      loader.go
    persistence/
      repository.go
\`\`\`

## Clean/Hexagonal Placement

- **Domain**: keeps pure business rules and entities related to ${meta.nameEn} usage.
- **Application (Use Case)**: orchestrates request flow and coordinates domain + ports.
- **Ports**: defines stable contracts (\`${meta.codeName}Port\`) that core logic depends on.
- **Adapters**: implements port behavior (HTTP, gRPC, vendor API, queue consumer).
- **Infrastructure**: framework-specific and provider-specific setup.

### Boundary Rules

1. Dependencies point inward: adapters/infrastructure depend on ports/domain, not the reverse.
2. Domain must stay framework-agnostic (no HTTP, DB driver, or vendor SDK import).
3. Application layer should know interfaces, not concrete adapters.
4. Infrastructure may know everything technical, but should not hold business policy.

## Real-World Use Case

In production, ${meta.nameEn} is useful to ${meta.useCaseEn}. You can keep your use case stable while replacing providers or transport implementations with minimal changes.

## Benefits & Tradeoffs

### Benefits
- Better modularity and maintainability.
- Easier testability with mocked ports.
- Safer refactoring because boundaries are explicit.

### Tradeoffs
- More files and abstractions to maintain.
- Initial learning curve for team members unfamiliar with layered architecture.

## Common Pitfalls

1. Putting domain rules in adapters.
2. Leaking vendor-specific payload directly into domain models.
3. Creating too many abstractions without concrete change pressure.
4. Skipping contract tests for port behavior.

## When NOT to use

- Service is still very small and not expected to grow.
- Team needs a quick prototype and architecture overhead would block delivery.
- There is only one stable integration with no foreseeable variation.

## Conclusion

${meta.nameEn} is most effective when paired with Clean/Hexagonal boundaries. The pattern gives structure, while architecture keeps dependencies under control as the codebase evolves.`;
}

function buildMarkdownId(meta: PatternMeta): string {
  return `## Overview

${meta.nameId} adalah **design pattern ${meta.category.toLowerCase()}** yang digunakan untuk ${meta.focusId}. Di backend nyata, pattern ini membantu tim menjaga modul tetap terpisah sambil tetap cepat mengirim fitur.

## Problem It Solves

Tanpa ${meta.nameId}, tim sering mencampur orkestrasi, integrasi eksternal, dan aturan domain dalam satu tempat. Dampaknya adalah coupling tinggi, testing sulit, dan refactor mahal.

## 5W + 1H

### What
${meta.nameId} adalah pola untuk menyusun kolaborasi antarkomponen agar masalah desain yang berulang bisa ditangani konsisten.

### Why
Untuk meningkatkan maintainability, mengisolasi perubahan, dan menjaga batas antara policy bisnis dan detail implementasi.

### Who
Backend engineer, platform engineer, dan tim API yang bekerja dengan integrasi serta business logic yang terus berkembang.

### When
Gunakan ${meta.nameId} saat kompleksitas service meningkat dan satu tanggung jawab mulai bocor ke modul lain.

### Where
Terapkan pada boundary service seperti use case aplikasi, adapter integrasi, orkestrasi workflow, dan domain policy.

### How
Definisikan port yang stabil terlebih dahulu, lalu implementasikan adapter dan lakukan wiring lewat use-case.

## Go Implementation (Step-by-step)

### 1) Definisi port / interface

\`\`\`go
package ports

import "context"

type ${meta.codeName}Input struct {
	RequestID string
	Payload   map[string]any
}

type ${meta.codeName}Output struct {
	Status string
	Data   map[string]any
}

type ${meta.codeName}Port interface {
	Execute(ctx context.Context, in ${meta.codeName}Input) (${meta.codeName}Output, error)
}
\`\`\`

### 2) Adapter / implementasi

\`\`\`go
package adapters

import (
	"context"
	"fmt"
	"myapp/internal/ports"
)

type ${meta.codeName}Adapter struct {
	providerName string
}

func New${meta.codeName}Adapter(providerName string) *${meta.codeName}Adapter {
	return &${meta.codeName}Adapter{providerName: providerName}
}

func (a *${meta.codeName}Adapter) Execute(ctx context.Context, in ports.${meta.codeName}Input) (ports.${meta.codeName}Output, error) {
	if in.RequestID == "" {
		return ports.${meta.codeName}Output{}, fmt.Errorf("request id is required")
	}

	return ports.${meta.codeName}Output{
		Status: "ok",
		Data: map[string]any{
			"pattern": "${meta.nameEn}",
			"provider": a.providerName,
		},
	}, nil
}
\`\`\`

### 3) Use-case / wiring di main

\`\`\`go
package main

import (
	"context"
	"fmt"
	"log"
	"myapp/internal/adapters"
	"myapp/internal/ports"
)

func run(ctx context.Context, svc ports.${meta.codeName}Port) error {
	out, err := svc.Execute(ctx, ports.${meta.codeName}Input{
		RequestID: "REQ-1001",
		Payload: map[string]any{"source": "api"},
	})
	if err != nil {
		return err
	}

	fmt.Println("status:", out.Status, "pattern:", out.Data["pattern"])
	return nil
}

func main() {
	ctx := context.Background()
	service := adapters.New${meta.codeName}Adapter("default-provider")
	if err := run(ctx, service); err != nil {
		log.Fatal(err)
	}
}
\`\`\`

## Suggested Project Structure

\`\`\`text
cmd/
  api/
    main.go
internal/
  domain/
    ${meta.slug}/
      model.go
      policy.go
  application/
    ${meta.slug}/
      usecase.go
  ports/
    ${meta.slug}_port.go
  adapters/
    inbound/
      http/
        ${meta.slug}_handler.go
    outbound/
      ${meta.slug}_adapter.go
  infrastructure/
    config/
      loader.go
    persistence/
      repository.go
\`\`\`

## Clean/Hexagonal Placement

- **Domain**: menyimpan aturan bisnis murni terkait penggunaan ${meta.nameId}.
- **Application (Use Case)**: mengorkestrasi alur request dan koordinasi domain + ports.
- **Ports**: mendefinisikan kontrak stabil (\`${meta.codeName}Port\`) yang dipakai core logic.
- **Adapters**: mengimplementasikan perilaku port (HTTP, gRPC, vendor API, queue consumer).
- **Infrastructure**: setup yang spesifik framework dan provider eksternal.

### Boundary Rules

1. Dependensi mengarah ke dalam: adapters/infrastructure bergantung pada ports/domain, bukan sebaliknya.
2. Domain harus framework-agnostic (tanpa import HTTP, driver DB, atau vendor SDK).
3. Layer application sebaiknya mengetahui interface, bukan adapter konkret.
4. Infrastructure boleh tahu detail teknis, tetapi tidak boleh menyimpan policy bisnis.

## Real-World Use Case

Dalam implementasi produksi, ${meta.nameId} efektif untuk ${meta.useCaseId}. Use case bisa tetap stabil walau provider atau implementasi transport diganti.

## Benefits & Tradeoffs

### Benefits
- Modularitas dan maintainability lebih baik.
- Testing lebih mudah lewat mocked ports.
- Refactor lebih aman karena boundary jelas.

### Tradeoffs
- Menambah jumlah file dan lapisan abstraksi.
- Butuh adaptasi tim jika belum terbiasa dengan arsitektur berlapis.

## Common Pitfalls

1. Menaruh domain rules di layer adapter.
2. Payload vendor bocor langsung ke model domain.
3. Membuat abstraksi berlebihan tanpa kebutuhan perubahan nyata.
4. Tidak ada contract test untuk perilaku port.

## When NOT to use

- Service masih sangat kecil dan tidak diperkirakan berkembang.
- Tim butuh prototipe cepat dan overhead arsitektur menghambat delivery.
- Hanya ada satu integrasi stabil tanpa variasi.

## Conclusion

${meta.nameId} akan paling efektif jika dipasangkan dengan boundary Clean/Hexagonal. Pattern memberi struktur, sementara arsitektur menjaga arah dependensi tetap sehat saat codebase bertumbuh.`;
}

function buildPost(meta: PatternMeta, index: number): RawBlogPost {
  const publishedAt = new Date(Date.UTC(2026, 1, 4 - index));

  return {
    slug: meta.slug,
    title: {
      en: `${meta.nameEn} in Go: ${meta.category} Pattern with Clean/Hexagonal Implementation`,
      id: `${meta.nameId} di Go: Pola ${meta.category} dengan Implementasi Clean/Hexagonal`
    },
    description: {
      en: `Deep dive into ${meta.nameEn} with 5W+1H, folder tree, and real Go implementation in clean/hexagonal style.`,
      id: `Pembahasan mendalam ${meta.nameId} dengan 5W+1H, tree folder, dan implementasi Go bergaya clean/hexagonal.`
    },
    publishedAt: publishedAt.toISOString().slice(0, 10),
    thumbnail: `/blog-thumbnails/${meta.slug}.svg`,
    tags: ["Design Pattern", "Golang", meta.category, "Clean Architecture", "Hexagonal"],
    contentMarkdown: {
      en: buildMarkdownEn(meta),
      id: buildMarkdownId(meta)
    }
  };
}

const blogPosts: RawBlogPost[] = patternCatalog.map(buildPost);

function resolvePost(post: RawBlogPost, locale: AppLocale): BlogPost {
  return {
    slug: post.slug,
    title: post.title[locale],
    description: post.description[locale],
    publishedAt: post.publishedAt,
    thumbnail: post.thumbnail,
    tags: post.tags,
    contentMarkdown: post.contentMarkdown[locale]
  };
}

export function getBlogPosts(locale: AppLocale = "en"): BlogPost[] {
  return blogPosts
    .map((post) => resolvePost(post, locale))
    .sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
}

export function getBlogPostBySlug(slug: string, locale: AppLocale = "en"): BlogPost | undefined {
  const post = blogPosts.find((item) => item.slug === slug);
  return post ? resolvePost(post, locale) : undefined;
}
