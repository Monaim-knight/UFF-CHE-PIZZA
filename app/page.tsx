import Link from "next/link";
import Image from "next/image";

export default function HomePage() {
  return (
    <>
      <section className="border-b border-slate-800/80 bg-gradient-to-b from-slate-950 to-slate-900/80">
        <div className="container grid gap-10 py-16 md:grid-cols-[minmax(0,1.2fr)_minmax(0,1fr)] md:py-22 lg:py-24">
          <div className="space-y-8">
            <p className="inline-flex items-center rounded-full border border-slate-800 bg-slate-900/60 px-3 py-1 text-xs font-medium uppercase tracking-[0.2em] text-slate-300">
              <span className="mr-2 inline-block h-1.5 w-1.5 rounded-full bg-emerald-400" />
              Open for takeout & delivery
            </p>
            <div className="space-y-4">
              <h1>
                Authentic Italian pizza,{" "}
                <span className="bg-gradient-to-r from-brand-300 via-amber-200 to-rose-300 bg-clip-text text-transparent">
                  wood-fired to perfection
                </span>
                .
              </h1>
              <p className="max-w-xl text-base text-slate-200 md:text-lg">
                UFF CHE PIZZA brings authentic Italian flavors to your neighborhood
                with traditional wood-fired pizzas, fresh ingredients, and the
                warmth of Italian hospitality.
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-4">
              <Link href="/menu" className="btn-primary">
                Order Now
              </Link>
              <Link href="/menu" className="btn-outline">
                View Menu
              </Link>
            </div>

            <dl className="mt-6 grid gap-4 text-sm text-slate-300 sm:grid-cols-3">
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Location
                </dt>
                <dd className="mt-1 text-slate-200">
                  123 Market Street
                  <br />
                  Your City, YC 00000
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Hours
                </dt>
                <dd className="mt-1 text-slate-200">
                  Tue–Thu · 5pm–10pm
                  <br />
                  Fri–Sat · 5pm–11pm
                </dd>
              </div>
              <div>
                <dt className="text-xs uppercase tracking-[0.2em] text-slate-500">
                  Contact
                </dt>
                <dd className="mt-1 text-slate-200">
                  (555) 123‑4567
                  <br />
                  hello@uffchepizza.com
                </dd>
              </div>
            </dl>
          </div>

          <div className="relative">
            <div className="card h-full">
              <div className="card-inner flex h-full flex-col gap-4">
                <div className="relative aspect-[4/3] w-full overflow-hidden rounded-xl border border-slate-800/70">
                  <Image
                    src="/hero-plate.svg"
                    alt="Authentic Italian pizza at UFF CHE PIZZA"
                    fill
                    priority
                    className="object-cover"
                  />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-4">
                  <div className="space-y-2">
                    <h3 className="text-lg font-semibold text-slate-50">
                      Margherita Classica
                    </h3>
                    <p className="text-sm text-slate-300">
                      Our signature pizza with San Marzano tomatoes, fresh
                      mozzarella di bufala, basil, and extra virgin olive oil.
                      Baked in our wood-fired oven for authentic Italian flavor.
                    </p>
                  </div>
                  <div className="flex items-center justify-between text-xs text-slate-300">
                    <div className="flex flex-wrap gap-2">
                      <span className="badge-accent">Signature</span>
                      <span className="badge">Wood-fired · 12&quot;</span>
                    </div>
                    <p className="font-medium text-slate-50">$18</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section
        id="about"
        className="border-b border-slate-800/80 bg-slate-950/80"
      >
        <div className="container grid gap-12 py-16 md:grid-cols-[minmax(0,1.1fr)_minmax(0,1fr)] md:py-20">
          <div className="space-y-4">
            <h2>Authentic Italian, made by our original Italian chef.</h2>
            <p>
              Every pizza at UFF CHE PIZZA is crafted by our master pizzaiolo,
              Chef Marco, who brings over 20 years of experience from Naples, Italy.
              Trained in the traditional art of Neapolitan pizza-making, Chef Marco
              uses time-honored techniques passed down through generations to create
              authentic Italian pizzas that taste like they came straight from the
              streets of Naples.
            </p>
            <p>
              Our pizzas are made with imported Italian 00 flour, San Marzano DOP
              tomatoes, fresh mozzarella di bufala, and extra virgin olive oil. Each
              dough is hand-stretched and baked in our authentic wood-fired oven at
              900°F, creating that signature charred, bubbled crust and perfectly
              melted cheese that defines true Neapolitan pizza.
            </p>
            <p>
              At UFF CHE PIZZA, we believe in the Italian tradition of using only the
              finest ingredients and taking the time to do things right. Every pizza
              is made fresh to order, ensuring you get the authentic taste of Italy
              with every bite.
            </p>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/60 p-6 shadow-card">
            <h3 className="text-lg font-semibold text-slate-50">
              What makes us special
            </h3>
            <ul className="space-y-3 text-sm text-slate-200">
              <li>
                • <strong className="text-slate-50">Original Italian Chef:</strong>{" "}
                Master pizzaiolo with 20+ years of Neapolitan training
              </li>
              <li>
                • <strong className="text-slate-50">Authentic Wood-Fired Oven:</strong>{" "}
                Imported from Italy, fired at 900°F for perfect Neapolitan crust
              </li>
              <li>
                • <strong className="text-slate-50">Imported Ingredients:</strong>{" "}
                Italian 00 flour, San Marzano DOP tomatoes, fresh mozzarella di bufala
              </li>
              <li>
                • <strong className="text-slate-50">Traditional Techniques:</strong>{" "}
                Hand-stretched dough, 48-hour cold fermentation, authentic recipes
              </li>
              <li>
                • <strong className="text-slate-50">Made Fresh to Order:</strong>{" "}
                Every pizza prepared when you order, never pre-made
              </li>
              <li>
                • <strong className="text-slate-50">Family Recipes:</strong>{" "}
                Time-honored recipes passed down through generations
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="order"
        className="border-b border-slate-800/80 bg-slate-950/90"
      >
        <div className="container grid gap-10 py-14 md:grid-cols-2 md:py-18">
          <div className="space-y-4">
            <h2>Ready to order?</h2>
            <p>
              Place your order online for quick pickup or delivery. We prepare
              every pizza fresh to order in our wood-fired oven.
            </p>
            <div className="grid gap-4 text-sm text-slate-200 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <h4 className="mb-1 text-sm font-semibold text-slate-50">
                  Large orders
                </h4>
                <p>
                  For orders of 10+ pizzas or catering, email{" "}
                  <a href="mailto:orders@uffchepizza.com">
                    orders@uffchepizza.com
                  </a>
                  .
                </p>
              </div>
              <div className="rounded-xl border border-slate-800 bg-slate-900/70 p-4">
                <h4 className="mb-1 text-sm font-semibold text-slate-50">
                  Dietary needs
                </h4>
                <p>
                  We offer gluten-free crust and can accommodate most allergies.
                  Just let us know when ordering.
                </p>
              </div>
            </div>
          </div>

          <div className="space-y-4 rounded-2xl border border-slate-800 bg-slate-900/70 p-6 shadow-card">
            <h3 className="text-lg font-semibold text-slate-50">
              Order online now
            </h3>
            <p className="text-sm text-slate-300">
              Browse our menu, add items to your cart, and place your order.
              We&apos;ll have it ready for pickup or delivery.
            </p>
            <ul className="mt-2 list-disc space-y-1 pl-4 text-sm text-slate-200">
              <li>Easy online ordering with secure checkout</li>
              <li>Real-time order tracking</li>
              <li>Pickup or delivery options</li>
            </ul>
            <Link href="/menu" className="mt-4 inline-block btn-primary">
              Start Ordering
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

