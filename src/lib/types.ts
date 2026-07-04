export type Category = {
  id: string;
  name: string;
  slug: string;
  image_url: string | null;
  parent_id: string | null;
  show_in_menu: boolean;
};

export type Brand = {
  id: string;
  name: string;
  slug: string;
  logo_url: string | null;
};

export type ProductSpec = {
  spec_name: string;
  spec_value: string;
};

export type VariationOption = {
  id: string;
  value: string;
  price_delta: number;
};

export type VariationGroup = {
  id: string;
  name: string;
  options: VariationOption[];
};

export type Product = {
  id: string;
  name: string;
  slug: string;
  short_description: string | null;
  description: string | null;
  category_id: string | null;
  brand_id: string | null;
  sku: string | null;
  price: number | null;
  show_price: boolean;
  is_best_seller: boolean;
  is_active: boolean;
  stock_status: "disponivel" | "sob_consulta" | "indisponivel";
  main_image_url: string;
  images: string[];
  specs: ProductSpec[];
  variations: VariationGroup[];
};

export type SelectedVariation = {
  grupo: string;
  valor: string;
};

export type CartItem = {
  productId: string;
  productName: string;
  productSlug: string;
  productImage: string;
  quantity: number;
  selectedVariations: SelectedVariation[];
  notes?: string;
};

export type QuoteSubmission = {
  customer_name: string;
  document_number?: string;
  document_type?: "cpf" | "cnpj";
  email?: string;
  phone?: string;
  address_zip?: string;
  address_street: string;
  address_number?: string;
  address_complement?: string;
  address_neighborhood?: string;
  address_city: string;
  address_state: string;
  notes?: string;
  items: CartItem[];
};

export type Quote = QuoteSubmission & {
  id: string;
  status: "novo" | "em_andamento" | "respondido" | "finalizado";
  created_at: string;
};
