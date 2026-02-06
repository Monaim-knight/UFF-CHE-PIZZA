import Image from "next/image";
import Link from "next/link";

export interface PizzaCardProps {
  name: string;
  description: string;
  price: string;
  imageSrc: string;
  imageAlt: string;
}

export function PizzaCard({
  name,
  description,
  price,
  imageSrc,
  imageAlt
}: PizzaCardProps) {
  return (
    <article className="group overflow-hidden rounded-2xl border border-slate-800 bg-white shadow-lg transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-red-500/10 hover:ring-2 hover:ring-red-500/20">
      <Link href="/menu" className="block">
        <div className="relative aspect-square w-full overflow-hidden bg-amber-50">
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            className="object-cover transition-transform duration-300 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          />
        </div>
        <div className="border-t border-slate-100 bg-white p-5">
          <h3 className="font-display text-lg font-semibold text-slate-900 group-hover:text-red-600">
            {name}
          </h3>
          <p className="mt-1 line-clamp-2 text-sm text-slate-600">
            {description}
          </p>
          <p className="mt-3 font-semibold text-red-600">{price}</p>
        </div>
      </Link>
    </article>
  );
}
