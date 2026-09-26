import type { Product } from "../data/catalog";
import { ProductCard } from "./ProductCard";
import { Button, SectionHeading } from "./primitives";

export function CollectionSection({
  id,
  eyebrow,
  title,
  subtitle,
  products,
  limit,
  featuredFirst = false,
}: {
  id: string;
  eyebrow: string;
  title: string;
  subtitle?: string;
  products: Product[];
  limit?: number;
  featuredFirst?: boolean;
}) {
  const featured = featuredFirst ? products.find((product) => product.featured) : undefined;
  const rest = products.filter((product) => product !== featured);
  const visible = limit ? rest.slice(0, limit) : rest;
  const collectionHref = id === "proctor" ? "/category/proctoring" : `/category/${id}`;

  return (
    <section id={id} className="mx-auto mt-16 max-w-6xl px-4 sm:px-6">
      <SectionHeading
        eyebrow={eyebrow}
        title={title}
        subtitle={subtitle}
        action={
          <Button as="a" href={collectionHref} variant="outline" size="sm">
            View all
          </Button>
        }
      />

      <div className="panel p-5 sm:p-7">
        {featured ? (
          <div className="mb-5">
            <ProductCard product={featured} featured />
          </div>
        ) : null}
        <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {visible.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
        {limit && rest.length > limit ? (
          <div className="mt-6 text-center">
            <Button as="a" href={collectionHref} variant="outline">
              See all {rest.length + (featured ? 1 : 0)} items
            </Button>
          </div>
        ) : null}
      </div>
    </section>
  );
}
