import { AnimatePresence, motion } from "framer-motion";
import { SearchX } from "lucide-react";
import type { Product } from "../data/catalog";
import { ProductCard } from "./ProductCard";
import { Button, SectionHeading } from "./primitives";

export function CatalogGrid({
  products,
  query,
  onReset,
}: {
  products: Product[];
  query: string;
  onReset: () => void;
}) {
  return (
    <section id="catalog" className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <SectionHeading
        eyebrow="Catalog"
        title="Browse all products"
        subtitle={
          query
            ? `${products.length} result${products.length === 1 ? "" : "s"} for “${query}”`
            : `${products.length} products across every pathway, filtered by the chips above.`
        }
        action={
          <Button variant="soft" size="sm" onClick={onReset}>
            Reset filters
          </Button>
        }
      />

      <AnimatePresence mode="popLayout">
        {products.length ? (
          <motion.div layout className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {products.map((product) => (
              <motion.div key={product.id} layout>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : (
          <motion.div
            key="empty"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="card flex flex-col items-center gap-3 px-6 py-16 text-center"
          >
            <SearchX className="size-8 text-ink-300" />
            <p className="font-display text-xl">Nothing matched that search</p>
            <p className="max-w-sm text-ink-500">
              Try a shorter query, or reset the filters to see the full catalog.
            </p>
            <Button variant="outline" size="sm" onClick={onReset} className="mt-2">
              Reset filters
            </Button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
