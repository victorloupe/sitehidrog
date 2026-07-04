import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestSellers from "@/components/home/BestSellers";
import BrandStrip from "@/components/home/BrandStrip";
import Reveal from "@/components/ui/Reveal";
import { getBestSellers, getBrands, getCategories } from "@/lib/queries";

export const dynamic = "force-dynamic";

export default async function HomePage() {
  const [categories, bestSellers, brands] = await Promise.all([
    getCategories(),
    getBestSellers(8),
    getBrands(),
  ]);

  return (
    <>
      <Hero />
      <Reveal>
        <CategoryGrid categories={categories} />
      </Reveal>
      <Reveal>
        <BestSellers products={bestSellers} />
      </Reveal>
      <Reveal>
        <BrandStrip brands={brands} />
      </Reveal>
    </>
  );
}
