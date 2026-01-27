import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

async function main() {
  console.log("🌱 Seeding database...");

  await prisma.orderItem.deleteMany();
  await prisma.order.deleteMany();
  await prisma.reservation.deleteMany();
  await prisma.menuItem.deleteMany();
  await prisma.menuCategory.deleteMany();
  await prisma.customer.deleteMany();

  const categories = await prisma.menuCategory.createMany({
    data: [
      {
        name: "Snacks & Small Plates",
        slug: "snacks-small-plates",
        description: "Bright, shareable plates to start the night.",
        sortOrder: 1
      },
      {
        name: "From the Wood-Fired Grill",
        slug: "wood-fired",
        description: "Charred, smoky, deeply flavored mains.",
        sortOrder: 2
      },
      {
        name: "Handmade Pastas",
        slug: "pastas",
        description: "Tender, handmade pastas with seasonal sauces.",
        sortOrder: 3
      },
      {
        name: "Vegetables & Sides",
        slug: "vegetables-sides",
        description: "Peak‑season vegetables and shareable sides.",
        sortOrder: 4
      },
      {
        name: "Desserts",
        slug: "desserts",
        description: "To close the evening on a high note.",
        sortOrder: 5
      },
      {
        name: "Zero-Proof & Cocktails",
        slug: "drinks",
        description: "Thoughtful cocktails with or without spirits.",
        sortOrder: 6
      }
    ]
  });

  console.log(`✅ Created ${categories.count} menu categories`);

  const categoryRecords = await prisma.menuCategory.findMany();
  const bySlug = Object.fromEntries(categoryRecords.map((c) => [c.slug, c]));

  await prisma.menuItem.createMany({
    data: [
      {
        name: "Marinated Castelvetrano Olives",
        slug: "marinated-castelvetrano-olives",
        description:
          "Citrus peel, fennel seed, and smoked chili oil over warm olives.",
        priceCents: 900,
        imageUrl: "/menu-snacks-1.svg",
        tags: ["vegan", "gluten-free"],
        sortOrder: 1,
        categoryId: bySlug["snacks-small-plates"].id
      },
      {
        name: "Whipped Ricotta & Hearth Bread",
        slug: "whipped-ricotta-hearth-bread",
        description:
          "Local ricotta with honey, cracked pepper, and grilled sourdough.",
        priceCents: 1400,
        imageUrl: "/menu-snacks-2.svg",
        tags: ["vegetarian"],
        sortOrder: 2,
        categoryId: bySlug["snacks-small-plates"].id
      },
      {
        name: "Charred Shishito Peppers",
        slug: "charred-shishito-peppers",
        description:
          "Smoked sea salt, citrus aioli, and pickled shallots.",
        priceCents: 1300,
        imageUrl: "/menu-snacks-3.svg",
        tags: ["vegetarian", "shareable"],
        sortOrder: 3,
        categoryId: bySlug["snacks-small-plates"].id
      },
      {
        name: "Crispy Potatoes with Lemon Aioli",
        slug: "crispy-potatoes-lemon-aioli",
        description:
          "Twice‑cooked potatoes, preserved lemon, herbs, and smoked paprika.",
        priceCents: 1200,
        imageUrl: "/menu-sides-1.svg",
        tags: ["vegetarian", "gluten-free"],
        sortOrder: 1,
        categoryId: bySlug["vegetables-sides"].id
      },
      {
        name: "Charred Broccolini",
        slug: "charred-broccolini",
        description:
          "Anchovy garlic butter, toasted almonds, and lemon zest.",
        priceCents: 1300,
        imageUrl: "/menu-sides-2.svg",
        tags: ["contains-fish"],
        sortOrder: 2,
        categoryId: bySlug["vegetables-sides"].id
      },
      {
        name: "Market Greens Salad",
        slug: "market-greens-salad",
        description:
          "Shaved vegetables, seeds, and aged sherry vinaigrette.",
        priceCents: 1100,
        imageUrl: "/menu-sides-3.svg",
        tags: ["vegan", "gluten-free"],
        sortOrder: 3,
        categoryId: bySlug["vegetables-sides"].id
      },
      {
        name: "Wood-Fired Half Chicken",
        slug: "wood-fired-half-chicken",
        description:
          "Herb‑brined chicken, roasted garlic jus, and grilled lemon.",
        priceCents: 2800,
        imageUrl: "/menu-woodfired-1.svg",
        tags: ["signature", "gluten-free"],
        sortOrder: 1,
        categoryId: bySlug["wood-fired"].id
      },
      {
        name: "Charred Hanger Steak",
        slug: "charred-hanger-steak",
        description:
          "Salsa verde, crispy shallots, and hand‑cut fries.",
        priceCents: 3600,
        imageUrl: "/menu-woodfired-2.svg",
        tags: ["contains-gluten"],
        sortOrder: 2,
        categoryId: bySlug["wood-fired"].id
      },
      {
        name: "Miso-Glazed King Salmon",
        slug: "miso-glazed-king-salmon",
        description:
          "Gingered greens, sesame, and charred citrus.",
        priceCents: 3400,
        imageUrl: "/menu-woodfired-3.svg",
        tags: ["gluten-free"],
        sortOrder: 3,
        categoryId: bySlug["wood-fired"].id
      },
      {
        name: "Spring Pea Agnolotti",
        slug: "spring-pea-agnolotti",
        description:
          "Lemon butter, mascarpone, and mint with house‑made pasta.",
        priceCents: 2600,
        imageUrl: "/menu-pasta-1.svg",
        tags: ["vegetarian"],
        sortOrder: 1,
        categoryId: bySlug["pastas"].id
      },
      {
        name: "Smoked Mushroom Tagliatelle",
        slug: "smoked-mushroom-tagliatelle",
        description:
          "Charred mushrooms, thyme, and pecorino over fresh egg pasta.",
        priceCents: 2700,
        imageUrl: "/menu-pasta-2.svg",
        tags: ["vegetarian"],
        sortOrder: 2,
        categoryId: bySlug["pastas"].id
      },
      {
        name: "Spicy Tomato Rigatoni",
        slug: "spicy-tomato-rigatoni",
        description:
          "Calabrian chili, garlic breadcrumbs, and basil.",
        priceCents: 2400,
        imageUrl: "/menu-pasta-3.svg",
        tags: ["spicy", "vegan-option"],
        sortOrder: 3,
        categoryId: bySlug["pastas"].id
      },
      {
        name: "Olive Oil Citrus Cake",
        slug: "olive-oil-citrus-cake",
        description:
          "Candied citrus, vanilla cream, and flaky salt.",
        priceCents: 1200,
        imageUrl: "/menu-dessert-1.svg",
        tags: ["vegetarian"],
        sortOrder: 1,
        categoryId: bySlug["desserts"].id
      },
      {
        name: "Dark Chocolate Budino",
        slug: "dark-chocolate-budino",
        description:
          "Sea salt, espresso caramel, and cocoa nibs.",
        priceCents: 1300,
        imageUrl: "/menu-dessert-2.svg",
        tags: ["vegetarian"],
        sortOrder: 2,
        categoryId: bySlug["desserts"].id
      },
      {
        name: "Roasted Strawberry Sundae",
        slug: "roasted-strawberry-sundae",
        description:
          "Vanilla ice cream, macerated berries, and almond crumble.",
        priceCents: 1200,
        imageUrl: "/menu-dessert-3.svg",
        tags: ["vegetarian", "contains-nuts"],
        sortOrder: 3,
        categoryId: bySlug["desserts"].id
      },
      {
        name: "Grapefruit & Tonic",
        slug: "grapefruit-tonic-zero-proof",
        description:
          "Fresh grapefruit, tonic, rosemary, and a touch of sea salt.",
        priceCents: 900,
        imageUrl: "/menu-drink-1.svg",
        tags: ["zero-proof"],
        sortOrder: 1,
        categoryId: bySlug["drinks"].id
      },
      {
        name: "Smoked Cherry Old Fashioned",
        slug: "smoked-cherry-old-fashioned",
        description:
          "Brown butter‑washed bourbon, smoked cherry, and orange bitters.",
        priceCents: 1500,
        imageUrl: "/menu-drink-2.svg",
        tags: ["cocktail", "signature"],
        sortOrder: 2,
        categoryId: bySlug["drinks"].id
      },
      {
        name: "Cucumber Verde",
        slug: "cucumber-verde-zero-proof",
        description:
          "Cucumber, lime, mint, and a hint of jalapeño.",
        priceCents: 950,
        imageUrl: "/menu-drink-3.svg",
        tags: ["zero-proof", "spicy"],
        sortOrder: 3,
        categoryId: bySlug["drinks"].id
      },
      {
        name: "House Sourdough & Cultured Butter",
        slug: "house-sourdough-cultured-butter",
        description:
          "Naturally leavened sourdough, whipped cultured butter, and flaky salt.",
        priceCents: 1000,
        imageUrl: "/menu-snacks-4.svg",
        tags: ["vegetarian"],
        sortOrder: 4,
        categoryId: bySlug["snacks-small-plates"].id
      },
      {
        name: "Roasted Carrots with Harissa Yogurt",
        slug: "roasted-carrots-harissa-yogurt",
        description:
          "Charred carrots, spiced yogurt, and herb salad.",
        priceCents: 1300,
        imageUrl: "/menu-sides-4.svg",
        tags: ["vegetarian", "gluten-free"],
        sortOrder: 4,
        categoryId: bySlug["vegetables-sides"].id
      },
      {
        name: "Charcoal-Grilled Lamb Chops",
        slug: "charcoal-grilled-lamb-chops",
        description:
          "Herb chimichurri, grilled spring onions, and crispy fingerlings.",
        priceCents: 3800,
        imageUrl: "/menu-woodfired-4.svg",
        tags: ["signature"],
        sortOrder: 4,
        categoryId: bySlug["wood-fired"].id
      }
    ]
  });

  console.log("✅ Seeded menu items");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
