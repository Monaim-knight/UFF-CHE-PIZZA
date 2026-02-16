import Link from "next/link";
import { getFullMenu } from "@/lib/menu";
import { getAllContent } from "@/lib/site-content";
import { MenuItemCard } from "@/components/MenuItemCard";

// Dynamic so build does not require DATABASE_URL; data is fetched at runtime.
export const dynamic = "force-dynamic";

export default async function MenuPage() {
  const [categories, content] = await Promise.all([
    getFullMenu(),
    getAllContent(),
  ]);

  const title = content.menu_page_title || "Our Menu";
  const subtitle =
    content.menu_page_subtitle ||
    "Authentic Italian pizzas made fresh to order. Browse our selection, add items to your cart, and place your order for pickup or delivery.";

  return (
    <div className="container py-12 md:py-16">
      <div className="mb-12 space-y-4 text-center">
        <h1>{title}</h1>
        <p className="mx-auto max-w-2xl text-base text-slate-300 md:text-lg">
          {subtitle}
        </p>
      </div>

      <div className="space-y-16 md:space-y-20">
        {categories.map((category) => (
          <section key={category.id} className="scroll-mt-20">
            <div className="mb-6 space-y-2">
              <h2 className="text-3xl font-display font-semibold tracking-tight text-slate-50 md:text-4xl">
                {category.name}
              </h2>
              {category.description && (
                <p className="text-sm text-slate-400 md:text-base">
                  {category.description}
                </p>
              )}
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {category.items.map((item) => (
                <MenuItemCard key={item.id} item={item} />
              ))}
            </div>
          </section>
        ))}
      </div>

      <div className="mt-16 rounded-2xl border border-slate-800 bg-slate-900/60 p-8 text-center shadow-card">
        <h3 className="mb-2 text-xl font-semibold text-slate-50">
          Questions about the menu?
        </h3>
        <p className="mb-4 text-sm text-slate-300">
          Our team is happy to help with dietary restrictions, allergies, or
          recommendations.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <a href="tel:+15551234567" className="btn-outline">
            Call us
          </a>
          <Link href="/menu" className="btn-primary">
            Order Now
          </Link>
        </div>
      </div>
    </div>
  );
}
