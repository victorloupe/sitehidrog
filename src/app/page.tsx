import Hero from "@/components/home/Hero";
import CategoryGrid from "@/components/home/CategoryGrid";
import BestSellers from "@/components/home/BestSellers";
import BrandStrip from "@/components/home/BrandStrip";
import HelpAndNewsletter from "@/components/home/HelpAndNewsletter";
import Reveal from "@/components/ui/Reveal";
import { getBestSellers, getBrands, getCategories, getSiteSettings } from "@/lib/queries";

export const revalidate = 60;

export default async function HomePage() {
  const [categories, bestSellers, brands, settings] = await Promise.all([
    getCategories(),
    getBestSellers(8),
    getBrands(),
    getSiteSettings(),
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
      <Reveal>
        <HelpAndNewsletter whatsappNumber={settings.whatsapp_number} />
      </Reveal>
    </>
  );
}
