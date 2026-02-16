import { prisma } from "@/lib/prisma";

const DEFAULTS: Record<string, string> = {
  hero_headline:
    "Authentic Italian pizza, wood-fired in Berlin.",
  hero_tagline:
    "Traditional recipes, fresh ingredients, and the warmth of Italian hospitality.",
  featured_title: "Our Favourites",
  featured_subtitle: "Handmade, wood-fired, and made to order.",
  about_heading: "Authentic Italian, made in Berlin.",
  about_paragraph_1:
    "Every pizza at UFF CHE PIZZA is crafted with imported Italian flour, San Marzano tomatoes, and fresh mozzarella. Our dough is hand-stretched and baked in a wood-fired oven for that true Neapolitan taste.",
  about_paragraph_2:
    "We believe in the Italian tradition of using the finest ingredients and taking the time to do things right. Every pizza is made fresh to order.",
  about_sidebar_title: "Why choose us",
  order_heading: "Ready to order?",
  order_text:
    "Browse our menu, add items to your cart, and order for pickup or delivery.",
  order_button_text: "Start ordering",
  menu_page_title: "Our Menu",
  menu_page_subtitle:
    "Authentic Italian pizzas made fresh to order. Browse our selection, add items to your cart, and place your order for pickup or delivery.",
};

export async function getContent(key: string): Promise<string> {
  const row = await prisma.siteContent.findUnique({
    where: { key },
  });
  if (row) return row.value;
  return DEFAULTS[key] ?? "";
}

export async function getAllContent(): Promise<Record<string, string>> {
  const map: Record<string, string> = { ...DEFAULTS };
  try {
    const rows = await prisma.siteContent.findMany();
    for (const row of rows) {
      map[row.key] = row.value;
    }
  } catch {
    // Table may not exist yet; return defaults so admin page still loads
  }
  return map;
}

export function getContentKeys(): { key: string; label: string }[] {
  return [
    { key: "hero_headline", label: "Hero headline" },
    { key: "hero_tagline", label: "Hero tagline" },
    { key: "featured_title", label: "Featured section title" },
    { key: "featured_subtitle", label: "Featured section subtitle" },
    { key: "about_heading", label: "About heading" },
    { key: "about_paragraph_1", label: "About paragraph 1" },
    { key: "about_paragraph_2", label: "About paragraph 2" },
    { key: "about_sidebar_title", label: "About sidebar title" },
    { key: "order_heading", label: "Order section heading" },
    { key: "order_text", label: "Order section text" },
    { key: "order_button_text", label: "Order button text" },
    { key: "menu_page_title", label: "Menu page title" },
    { key: "menu_page_subtitle", label: "Menu page subtitle" },
  ];
}
