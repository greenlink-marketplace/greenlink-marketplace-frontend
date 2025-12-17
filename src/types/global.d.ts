interface PaginationStructure {
  count: number,
  next: string | null,
  previous: string | null,
  results?: any[]
}

declare type SidebarItemType = "explorer" | "saved-items" | "coupons" | "history" | "locals";

declare type ProductPagination = {
  id: number,
  name: string,
  description: string,
  price_cents: number,
  image: string
}

declare type Product = {
  id: number,
  name: string,
  description?: string;
  image?: string | null;
  company?: string,
  price_cents: number;
}

declare type Coupon = {
  id: number;
  is_valid: boolean;
  coupon_code: string;
  discount_value_cents: number;
  generated_at: string;
  product_id: number;
}

declare type Material = {
  id: number;
  name: string;
  description: string;
  quantity_gram: number;
  created_at: string | Date;
}