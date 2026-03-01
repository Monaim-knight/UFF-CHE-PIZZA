import Link from "next/link";
import Image from "next/image";
import { PizzaCard } from "@/components/PizzaCard";
import { getAllContent } from "@/lib/site-content";
import { getFeaturedItems } from "@/lib/menu";

const HERO_PLACEHOLDER = "/pizza-placeholder.jpg";

const FEATURED_PIZZAS = [
  {
    name: "Margherita Classica",
    description:
      "San Marzano tomatoes, fresh mozzarella, basil & extra virgin olive oil. Wood-fired to perfection.",
    price: "$18",
    imageSrc: "/menu-woodfired-1.svg",
    imageAlt: "Margherita pizza"
  },
  {
    name: "Wood-Fired Half Chicken",
    description:
      "Herb-brined chicken, roasted garlic jus, grilled lemon. A house signature.",
    price: "$28",
    imageSrc: "/menu-woodfired-2.svg",
    imageAlt: "Wood-fired half chicken"
  },
  {
    name: "Spring Pea Agnolotti",
    description:
      "Lemon butter, mascarpone & mint with house-made pasta. Vegetarian.",
    price: "$26",
    imageSrc: "/menu-pasta-1.svg",
    imageAlt: "Spring pea agnolotti"
  },
  {
    name: "Charcoal-Grilled Lamb Chops",
    description:
      "Herb chimichurri, grilled spring onions & crispy fingerlings. Signature.",
    price: "$38",
    imageSrc: "/menu-woodfired-4.svg",
    imageAlt: "Lamb chops"
  },
  {
    name: "Whipped Ricotta & Hearth Bread",
    description:
      "Local ricotta with honey, cracked pepper & grilled sourdough.",
    price: "$14",
    imageSrc: "/menu-snacks-2.svg",
    imageAlt: "Whipped ricotta"
  },
  {
    name: "Dark Chocolate Budino",
    description:
      "Sea salt, espresso caramel & cocoa nibs. A perfect finish.",
    price: "$13",
    imageSrc: "/menu-dessert-2.svg",
    imageAlt: "Chocolate budino"
  }
];

export default async function HomePage() {
  const [c, featuredItems] = await Promise.all([
    getAllContent(),
    getFeaturedItems(6)
  ]);

  return (
    <>
      {/* Hero */}
      <section className="relative overflow-hidden border-b border-slate-800 bg-slate-950">
        <div className="relative aspect-[21/9] w-full min-h-[280px] md:min-h-[360px]">
          <Image
            src={HERO_PLACEHOLDER}
            alt="UFF CHE PIZZA – Authentic Italian pizza in Berlin"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent" />
          <div className="container absolute inset-0 flex flex-col justify-end pb-12 pt-8 md:pb-16">
            <h1 className="max-w-2xl text-4xl font-display font-bold tracking-tight text-white drop-shadow-lg md:text-5xl lg:text-6xl">
              {c.hero_headline || "Authentic Italian pizza, wood-fired in Berlin."}
            </h1>
            <p className="mt-3 max-w-xl text-lg text-white/90 drop-shadow md:text-xl">
              {c.hero_tagline ||
                "Traditional recipes, fresh ingredients, and the warmth of Italian hospitality."}
            </p>
            <div className="mt-6 flex flex-wrap gap-4">
              <Link
                href="/menu"
                className="rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white shadow-lg transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                Order Now
              </Link>
              <Link
                href="/menu"
                className="rounded-full border-2 border-white bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur transition hover:bg-white/20 focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-slate-950"
              >
                View Menu
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Pizza grid */}
      <section className="border-b border-slate-800 bg-slate-100 py-16 md:py-20">
        <div className="container">
          <div className="text-center">
            <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
              {c.featured_title || "Our Favourites"}
            </h2>
            <p className="mt-2 text-slate-600 md:text-lg">
              {c.featured_subtitle || "Handmade, wood-fired, and made to order."}
            </p>
          </div>
          <div className="mt-10 grid gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {(featuredItems.length ? featuredItems : FEATURED_PIZZAS).map(
              (pizza: any) => {
                // When using DB items, map fields to the card props.
                const name = pizza.name;
                const description = pizza.description;
                const price =
                  typeof pizza.priceCents === "number"
                    ? `$${(pizza.priceCents / 100).toFixed(2)}`
                    : pizza.price;
                const imageSrc =
                  typeof pizza.imageUrl === "string" && pizza.imageUrl
                    ? pizza.imageUrl
                    : pizza.imageSrc;
                const imageAlt = pizza.imageAlt || pizza.name;

                return (
                  <PizzaCard
                    key={name}
                    name={name}
                    description={description}
                    price={price}
                    imageSrc={imageSrc}
                    imageAlt={imageAlt}
                  />
                );
              }
            )}
          </div>
          <div className="mt-12 text-center">
            <Link
              href="/menu"
              className="inline-flex rounded-full bg-red-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-100"
            >
              See full menu
            </Link>
          </div>
        </div>
      </section>

      {/* About */}
      <section
        id="about"
        className="border-b border-slate-800 bg-white py-16 md:py-20"
      >
        <div className="container grid gap-12 md:grid-cols-2">
          <div className="space-y-4">
            <h2 className="font-display text-3xl font-semibold text-slate-900 md:text-4xl">
              {c.about_heading || "Authentic Italian, made in Berlin."}
            </h2>
            <p className="text-slate-600">
              {c.about_paragraph_1 ||
                "Every pizza at UFF CHE PIZZA is crafted with imported Italian flour, San Marzano tomatoes, and fresh mozzarella. Our dough is hand-stretched and baked in a wood-fired oven for that true Neapolitan taste."}
            </p>
            <p className="text-slate-600">
              {c.about_paragraph_2 ||
                "We believe in the Italian tradition of using the finest ingredients and taking the time to do things right. Every pizza is made fresh to order."}
            </p>
          </div>
          <div className="rounded-2xl border border-slate-200 bg-slate-50 p-6">
            <h3 className="font-display text-lg font-semibold text-slate-900">
              {c.about_sidebar_title || "Why choose us"}
            </h3>
            <ul className="mt-4 space-y-2 text-sm text-slate-600">
              <li className="flex items-center gap-2">
                <span className="text-red-500">•</span> Wood-fired oven, 900°F
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">•</span> Fresh ingredients, no shortcuts
              </li>
              <li className="flex items-center gap-2">
                <span className="text-red-500">•</span> Takeout & delivery
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Order CTA */}
      <section
        id="order"
        className="border-b border-slate-800 bg-slate-950 py-16 md:py-20"
      >
        <div className="container text-center">
          <h2 className="font-display text-3xl font-semibold text-white md:text-4xl">
            {c.order_heading || "Ready to order?"}
          </h2>
          <p className="mx-auto mt-3 max-w-xl text-slate-300">
            {c.order_text ||
              "Browse our menu, add items to your cart, and order for pickup or delivery."}
          </p>
          <Link
            href="/menu"
            className="mt-8 inline-flex rounded-full bg-red-600 px-8 py-4 text-base font-semibold text-white transition hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-offset-2 focus:ring-offset-slate-950"
          >
            {c.order_button_text || "Start ordering"}
          </Link>
        </div>
      </section>
    </>
  );
}
