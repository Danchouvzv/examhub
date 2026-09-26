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
import { RoutePage } from "./components/RoutePage";
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

  const pathname = window.location.pathname;
  if (pathname !== "/" && pathname !== "/index.html") {
    return <RoutePage pathname={pathname} />;
  }

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
          id="proctor"
          eyebrow="Lockdown browsers"
          title="Proctor tools"
          subtitle="LockDown Browser, Honorlock, Proctorio & 30+ platforms — one shared universal software delivery pack."
          products={byCategory("proctor")}
          limit={7}
          featuredFirst
        />

        <CollectionSection
          id="bundles"
          eyebrow="Value pack"
          title="Pro bundle"
          subtitle="SAT + ACT + lockdown stack in one checkout."
          products={byCategory("bundles")}
          featuredFirst
        />

        <CollectionSection
          id="contests"
          eyebrow="Olympiads"
          title="Contests & olympiads"
          subtitle="USACO and major olympiads"
          products={byCategory("contests")}
          limit={9}
        />

        <CollectionSection
          id="tools"
          eyebrow="Extras"
          title="Extra tools"
          subtitle="Useful extras for study & delivery"
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
