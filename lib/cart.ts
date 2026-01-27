export interface CartItem {
  id: number;
  name: string;
  priceCents: number;
  imageUrl: string | null;
  quantity: number;
}

export interface Cart {
  items: CartItem[];
  totalCents: number;
  itemCount: number;
}

export function calculateCartTotal(items: CartItem[]): number {
  return items.reduce((total, item) => total + item.priceCents * item.quantity, 0);
}

export function calculateItemCount(items: CartItem[]): number {
  return items.reduce((count, item) => count + item.quantity, 0);
}
