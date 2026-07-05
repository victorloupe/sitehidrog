-- =============================================================
-- SiteHidroG - Schema Supabase (PostgreSQL)
-- Loja vitrine de material hidráulico / bombas com sistema de
-- cotação (carrinho) e painel administrativo.
-- =============================================================
-- Como usar:
-- 1. Crie um projeto em https://supabase.com
-- 2. Vá em SQL Editor > New query
-- 3. Cole todo este arquivo e execute (Run)
-- 4. Depois, crie um usuário admin em Authentication > Users
--    (esse login será usado para acessar /admin)
-- =============================================================

-- Extensão para gerar UUIDs
create extension if not exists "pgcrypto";

-- -------------------------------------------------------------
-- MARCAS
-- -------------------------------------------------------------
create table if not exists brands (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  logo_url text,
  sort_order int default 0,
  created_at timestamptz default now()
);

-- -------------------------------------------------------------
-- CATEGORIAS (suporta subcategorias via parent_id)
-- -------------------------------------------------------------
create table if not exists categories (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  image_url text,
  parent_id uuid references categories(id) on delete set null,
  sort_order int default 0,
  show_in_menu boolean default true,
  created_at timestamptz default now()
);

-- -------------------------------------------------------------
-- PRODUTOS
-- -------------------------------------------------------------
create table if not exists products (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  slug text not null unique,
  short_description text,
  description text,
  category_id uuid references categories(id) on delete set null,
  brand_id uuid references brands(id) on delete set null,
  sku text,
  price numeric(12,2),           -- opcional: exibir "a partir de" ou ocultar no front
  show_price boolean default false,
  is_best_seller boolean default false,
  is_active boolean default true,
  stock_status text default 'disponivel', -- disponivel | sob_consulta | indisponivel
  main_image_url text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

create index if not exists idx_products_category on products(category_id);
create index if not exists idx_products_brand on products(brand_id);
create index if not exists idx_products_best_seller on products(is_best_seller);

-- -------------------------------------------------------------
-- IMAGENS ADICIONAIS DO PRODUTO
-- -------------------------------------------------------------
create table if not exists product_images (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  url text not null,
  sort_order int default 0
);

-- -------------------------------------------------------------
-- ESPECIFICAÇÕES TÉCNICAS (chave/valor, ex: "Vazão" -> "5000 L/h")
-- -------------------------------------------------------------
create table if not exists product_specs (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  spec_name text not null,
  spec_value text not null,
  sort_order int default 0
);

-- -------------------------------------------------------------
-- GRUPOS DE VARIAÇÃO (ex: "Voltagem", "Potência", "Cor")
-- -------------------------------------------------------------
create table if not exists variation_groups (
  id uuid primary key default gen_random_uuid(),
  product_id uuid references products(id) on delete cascade,
  name text not null,
  sort_order int default 0
);

-- -------------------------------------------------------------
-- OPÇÕES DE VARIAÇÃO (ex: "220V", "110V")
-- -------------------------------------------------------------
create table if not exists variation_options (
  id uuid primary key default gen_random_uuid(),
  group_id uuid references variation_groups(id) on delete cascade,
  value text not null,
  price_delta numeric(12,2) default 0,
  sku_suffix text,
  sort_order int default 0
);

-- -------------------------------------------------------------
-- ORÇAMENTOS (cotações enviadas pelo carrinho)
-- -------------------------------------------------------------
create table if not exists quotes (
  id uuid primary key default gen_random_uuid(),
  customer_name text not null,
  document_number text,               -- CPF ou CNPJ (opcional)
  document_type text,                 -- 'cpf' | 'cnpj'
  email text,
  phone text,
  address_zip text,
  address_street text not null,
  address_number text,
  address_complement text,
  address_neighborhood text,
  address_city text not null,
  address_state text not null,
  notes text,
  status text default 'novo',         -- novo | em_andamento | respondido | finalizado
  created_at timestamptz default now()
);

-- -------------------------------------------------------------
-- ITENS DO ORÇAMENTO
-- -------------------------------------------------------------
create table if not exists quote_items (
  id uuid primary key default gen_random_uuid(),
  quote_id uuid references quotes(id) on delete cascade,
  product_id uuid references products(id) on delete set null,
  product_name_snapshot text not null, -- guarda o nome mesmo se o produto for apagado depois
  selected_variations jsonb,           -- ex: [{"grupo":"Voltagem","valor":"220V"}]
  quantity int default 1,
  notes text
);

-- =============================================================
-- ROW LEVEL SECURITY
-- Leitura pública (catálogo), escrita restrita a admin autenticado.
-- Envio de cotação é liberado para qualquer visitante (insert).
-- =============================================================

alter table brands enable row level security;
alter table categories enable row level security;
alter table products enable row level security;
alter table product_images enable row level security;
alter table product_specs enable row level security;
alter table variation_groups enable row level security;
alter table variation_options enable row level security;
alter table quotes enable row level security;
alter table quote_items enable row level security;

-- Leitura pública do catálogo
drop policy if exists "public read brands" on brands;
create policy "public read brands" on brands for select using (true);
drop policy if exists "public read categories" on categories;
create policy "public read categories" on categories for select using (true);
drop policy if exists "public read products" on products;
create policy "public read products" on products for select using (true);
drop policy if exists "public read product_images" on product_images;
create policy "public read product_images" on product_images for select using (true);
drop policy if exists "public read product_specs" on product_specs;
create policy "public read product_specs" on product_specs for select using (true);
drop policy if exists "public read variation_groups" on variation_groups;
create policy "public read variation_groups" on variation_groups for select using (true);
drop policy if exists "public read variation_options" on variation_options;
create policy "public read variation_options" on variation_options for select using (true);

-- Envio de cotação liberado para qualquer visitante (insert),
-- leitura/edição/exclusão restrita ao admin autenticado.
drop policy if exists "public insert quotes" on quotes;
create policy "public insert quotes" on quotes for insert with check (true);
drop policy if exists "admin read quotes" on quotes;
create policy "admin read quotes" on quotes for select using (auth.role() = 'authenticated');
drop policy if exists "admin update quotes" on quotes;
create policy "admin update quotes" on quotes for update using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "admin delete quotes" on quotes;
create policy "admin delete quotes" on quotes for delete using (auth.role() = 'authenticated');

drop policy if exists "public insert quote_items" on quote_items;
create policy "public insert quote_items" on quote_items for insert with check (true);
drop policy if exists "admin read quote_items" on quote_items;
create policy "admin read quote_items" on quote_items for select using (auth.role() = 'authenticated');
drop policy if exists "admin delete quote_items" on quote_items;
create policy "admin delete quote_items" on quote_items for delete using (auth.role() = 'authenticated');

-- Escrita do catálogo somente para usuários autenticados (admin)
drop policy if exists "admin write brands" on brands;
create policy "admin write brands" on brands for all using (auth.role() = 'authenticated') with check (auth.role() = 'authenticated');
drop policy if exists "admin write cate