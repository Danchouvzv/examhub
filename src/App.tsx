import { useMemo, useState } from "react";
import { Header } from "./components/Header";
import { Hero } from "./components/Hero";
import { JumpTo } from "./components/JumpTo";
import { CommunityBand } from "./components/CommunityBand";
import { TrustSection } from "./components/TrustSection";
import { ExamSection } from "./components/ExamSection";
import { CollectionSection } from "./components/CollectionSection";
import { CatalogGrid } from "./components/CatalogGrid";
import { ServicesSection } from "./components/ServicesSection";
import { Footer } from "./components/Footer";
import { ChatBubble } from "./components/ChatBubble";
import { families, products, type Category } from "./data/catalog";

const byCategory = (category: Category) =>
  products.filter((product) => product.category === category);

export default function App() {
  const [query, setQuery] = useState("");
  const [category, setCategory] = useState<Category | "all">("all");

  const filtered = useMemo(() => {
    const needle = query.trim().toLowerCase();
    return products.filter((product) => {
      const matchesCategory = category === "all" || product.category === category;
      if (!matchesCategory) return false;
      if (!needle) return true;
      return [product.title, product.blurb, product.kicker, ...product.features]
        .join(" ")
        .toLowerCase()
        .includes(needle);
    });
  }, [query, category]);

  const reset = () => {
    setQuery("");
    setCategory("all");
  };

  return (
    <div className="min-h-screen">
      <a
        href="#catalog"
        className="focus-ring sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[60] focus:rounded-full focus:border-2 focus:border-ink-900 focus:bg-cream-50 focus:px-4 focus:py-2 focus:font-bold"
      >
        Skip to catalog
      </a>

      <Header />

      <main className="pb-6">
        <Hero
          query={query}
          onQuery={setQuery}
          active={category}
          onCategory={setCategory}
        />

        <CommunityBand />
        <JumpTo />
        <TrustSection />

        {families.map((family) => (
          <ExamSection
            key={family.id}
            family={family}
            products={byCategory(family.id as Category)}
          />
        ))}

        <CollectionSection
          id="readiness"
          eyebrow="Exam day"
          title="Readiness checks"
          subtitle="Device, room and account checks so nothing goes wrong on test day — one shared pack rather than a separate one per exam."
          products={byCategory("readiness")}
          featuredFirst
        />

        <CollectionSection
          id="bundles"
          eyebrow="Value pack"
          title="Bundles"
          subtitle="Two or three pathways in a single checkout, priced below the sum of the parts."
          products={byCategory("bundles")}
          featuredFirst
        />

        <CollectionSection
          id="contests"
          eyebrow="Olympiads"
          title="Contests & olympiads"
          subtitle="USACO divisions, math and science olympiads, and rated competitive-programming coaching."
          products={byCategory("contests")}
          limit={9}
        />

        <CollectionSection
          id="tools"
          eyebrow="Extras"
          title="Extra tools"
          subtitle="Small, useful add-ons for study planning, language tests and applications."
          products={byCategory("tools")}
          limit={6}
        />

        <ServicesSection />

        <CatalogGrid products={filtered} query={query} onReset={reset} />
      </main>

      <Footer />
      <ChatBubble />
    </div>
  );
}
