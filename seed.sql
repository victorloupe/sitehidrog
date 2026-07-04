-- =============================================================
-- HidroG - Seed com catálogo REAL (extraído do site atual em
-- lojaintegrada.com.br em 2026-07-04). Rode DEPOIS do schema.sql.
-- 38 produtos reais: nome, SKU, categoria, marca e foto (linkada
-- direto do CDN da Loja Integrada). Preços não incluídos: a loja
-- trabalha no modelo "preço sob consulta" para todos os produtos.
-- =============================================================

insert into categories (name, slug, sort_order) values
  ('Bombas Submersas', 'bombas-submersas', 1),
  ('Bomba Drenagem', 'bomba-drenagem', 2),
  ('Cabos PP', 'cabos-pp', 3),
  ('Conexões', 'conexoes', 4),
  ('Painel', 'painel', 5),
  ('Tampas', 'tampas', 6),
  ('Ferramentas', 'ferramentas', 7)
on conflict (slug) do nothing;

insert into brands (name, slug, sort_order) values
  ('Anauger', 'anauger', 1),
  ('Bombas Leão', 'bombas-leao', 2),
  ('Condumig', 'condumig', 3),
  ('Ebara', 'ebara', 4),
  ('Fundição Medeiros', 'fundicao-medeiros', 5),
  ('Hidro G', 'hidro-g', 6),
  ('Mipel', 'mipel', 7),
  ('Schneider', 'schneider', 8),
  ('Tupy', 'tupy', 9)
on conflict (slug) do nothing;


-- Bomba Submersa Ebara 4" 4BPL3-10 1,5 CV 220V
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'ebara')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Ebara 4" 4BPL3-10 1,5 CV 220V', 'bomba-submersa-ebara-4bpl3-10', cat.id, brand.id, '4BPL3-10', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/51091860/1-w6q6hbqeh6.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-ebara-4bpl3-10')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '1,5 CV', 1),
  ('Tensão', '220V 2 FIOS', 2),
  ('Amperagem', '10,6 A', 3),
  ('Profundidade máxima', '113 m', 4),
  ('Diâmetro mínimo do poço', '4"', 5)
) as s(spec_name, spec_value, sort_order);
with p as (select id from products where slug = 'bomba-submersa-ebara-4bpl3-10')
insert into variation_groups (product_id, name, sort_order)
select p.id, 'Energia', 1 from p;
with g as (
  select vg.id from variation_groups vg
  join products p on p.id = vg.product_id
  where p.slug = 'bomba-submersa-ebara-4bpl3-10' and vg.name = 'Energia'
)
insert into variation_options (group_id, value, price_delta, sort_order)
select g.id, value, 0, row_number() over () from g, (values
  ('220 MONO 2 Fios'),
  ('220 TRIF')
) as o(value);

-- Bomba Submersa Ebara 4" 4BPL6-08 1,5 CV 220V
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'ebara')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Ebara 4" 4BPL6-08 1,5 CV 220V', 'bomba-submersa-ebara-4bpl6-08', cat.id, brand.id, '4BPL6-08', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/51090240/1-357njneuwi.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-ebara-4bpl6-08')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '1,5 CV', 1),
  ('Tensão', '220V', 2),
  ('Diâmetro do poço', '4"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 6" R11A-07 4,5CV 220/380V TRI S600
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 6" R11A-07 4,5CV 220/380V TRI S600', 'bomba-submersa-leao-r11a-07-600', cat.id, brand.id, 'R11A-07-600', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/31138374/1-411qbqv2ed.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-r11a-07-600')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '4,5 CV', 1),
  ('Tensão', '220/380V', 2),
  ('Diâmetro do poço', '6"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 3" 180 3R3PB-18 1 CV 220v
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 3" 180 3R3PB-18 1 CV 220v', 'bomba-submersa-leao-3r3pb-18-180', cat.id, brand.id, '3R3PB-18-180', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/31094486/2-4uxl9tqnvi.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-3r3pb-18-180')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '1 CV', 1),
  ('Tensão', '220V', 2),
  ('Diâmetro do poço', '3"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 4" 230 4R4PA-08 0,75 CV 220V
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 4" 230 4R4PA-08 0,75 CV 220V', 'bomba-submersa-leao-4r4pa-08-230', cat.id, brand.id, '4R4PA-08-230-220', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/31093959/2-7m4cvjykpr.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-4r4pa-08-230')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '0,75 CV', 1),
  ('Tensão', '220V', 2),
  ('Diâmetro do poço', '4"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 3" 180 3R3PB-09 0,5 CV 220v
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 3" 180 3R3PB-09 0,5 CV 220v', 'bomba-submersa-leao-3r3pb-09-180', cat.id, brand.id, '3R3PB-09-180', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26743630/2-9hbvaqnasz.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-3r3pb-09-180')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '0,5 CV', 1),
  ('Tensão', '220V', 2),
  ('Diâmetro do poço', '3"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 3" 180 3R3PB-13 3/4cv
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 3" 180 3R3PB-13 3/4cv', 'bomba-submersa-leao-3r3pb-13-180', cat.id, brand.id, '3R3PB-13-180', 900, true, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26741384/2-gnmkpduq3q.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-3r3pb-13-180')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '4 CV', 1),
  ('Diâmetro do poço', '3"', 2)
) as s(spec_name, spec_value, sort_order);

-- Bomba submersa vibratória - Anauger 6"
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'anauger')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba submersa vibratória - Anauger 6"', 'bomba-submersa-vibratoria-anauger-6', cat.id, brand.id, '2Z6R55R89', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26665331/1-ewdx48icjz.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-vibratoria-anauger-6')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Diâmetro do poço', '6"', 1)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 4" 230 4R5PA-12 2 CV 220v
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 4" 230 4R5PA-12 2 CV 220v', 'bomba-submersa-leao-4r5pa-12-230', cat.id, brand.id, '4R5PA-12-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26544531/3-0n4i0kzk6u.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-4r5pa-12-230')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '2 CV', 1),
  ('Tensão', '220V', 2),
  ('Diâmetro do poço', '4"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 4" 230 4R5PA-09 1,5 CV
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 4" 230 4R5PA-09 1,5 CV', 'bomba-submersa-leao-4r5pa-09-230', cat.id, brand.id, '4R5PA-09-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26543982/1-9jaz3hjjia.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-4r5pa-09-230')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '1,5 CV', 1),
  ('Diâmetro do poço', '4"', 2)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 4" 230 4R4PA-10 1,0 CV 220v
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 4" 230 4R4PA-10 1,0 CV 220v', 'bomba-submersa-leao-4r4pa-10-230', cat.id, brand.id, '4R4PA-10-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26542654/2-x1vgn5lu89.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-4r4pa-10-230')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '1,0 CV', 1),
  ('Tensão', '220V', 2),
  ('Diâmetro do poço', '4"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 4" 230 4R3PA-07 0,5 CV 220V
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 4" 230 4R3PA-07 0,5 CV 220V', 'bomba-submersa-leao-4r3pa-07-230', cat.id, brand.id, '4R3PA-07-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26516433/2-qz1c8jk38q.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-4r3pa-07-230')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '0,5 CV', 1),
  ('Tensão', '220V', 2),
  ('Diâmetro do poço', '4"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 4" 230 4R5PA-18 3CV 220v
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 4" 230 4R5PA-18 3CV 220v', 'bomba-submersa-leao-4r5pa-18-230', cat.id, brand.id, '4R5PA-18-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/226000907/4r1-4r3r-4r3-4r4-4r5_gallery-r6wfj20b5p.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-4r5pa-18-230')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '3 CV', 1),
  ('Tensão', '220V', 2),
  ('Diâmetro do poço', '4"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 4" 370 4R5PA-12 2CV
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 4" 370 4R5PA-12 2CV', 'bomba-submersa-leao-4r5pa-12-370', cat.id, brand.id, '4R5PA-12-370', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225999291/4r1-4r3r-4r3-4r4-4r5_gallery-z9bb9veyjx.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-4r5pa-12-370')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '2 CV', 1),
  ('Diâmetro do poço', '4"', 2)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 4" 370 4R5PA-09 1,5 CV
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 4" 370 4R5PA-09 1,5 CV', 'bomba-submersa-leao-4r5pa-09-370', cat.id, brand.id, '4R5PA-09-370', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225997832/4r1-4r3r-4r3-4r4-4r5_gallery-34wlk4i9i1.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-4r5pa-09-370')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '1,5 CV', 1),
  ('Diâmetro do poço', '4"', 2)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 6" R20A-08 8CV 220/380V TRI S600
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 6" R20A-08 8CV 220/380V TRI S600', 'bomba-submersa-leao-r20a-08-610', cat.id, brand.id, 'R20A-08-610', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225923348/r7-r11-r20-r28-s610-fvh6ci6ygj.jpg'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-r20a-08-610')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '8 CV', 1),
  ('Tensão', '220/380V', 2),
  ('Diâmetro do poço', '6"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 6" R20A-09 9CV 220/380V TRI S600
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 6" R20A-09 9CV 220/380V TRI S600', 'bomba-submersa-leao-r20a-09-600', cat.id, brand.id, 'R20A-09-600', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225922607/r7a-r11a-r20a-r28a-motor-600_site_product-ox5vffrb8f.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-r20a-09-600')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '9 CV', 1),
  ('Tensão', '220/380V', 2),
  ('Diâmetro do poço', '6"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 6" R20A-7 7CV 220/380V TRI S600
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 6" R20A-7 7CV 220/380V TRI S600', 'bomba-submersa-leao-r20a-07-600', cat.id, brand.id, 'R20A-07-600', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225920101/r7a-r11a-r20a-r28a-motor-600_site_product-pcv5fqpe62.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-r20a-07-600')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '7 CV', 1),
  ('Tensão', '220/380V', 2),
  ('Diâmetro do poço', '6"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 6" R11A-11 7CV 220/380V TRI S600
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 6" R11A-11 7CV 220/380V TRI S600', 'bomba-submersa-leao-r11a-11-500', cat.id, brand.id, 'R11A-11-500', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225917485/r7-r11-r20-r28-s610-7se7xk7rrv.jpg'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-r11a-11-500')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '7 CV', 1),
  ('Tensão', '220/380V', 2),
  ('Diâmetro do poço', '6"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 6" R11A-14 9CV 220/380V TRI S600
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 6" R11A-14 9CV 220/380V TRI S600', 'bomba-submersa-leao-r11a-14-610', cat.id, brand.id, 'R11A-14-610', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225909785/r7-r11-r20-r28-s610-hpxotwy9ns.jpg'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-r11a-14-610')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '9 CV', 1),
  ('Tensão', '220/380V', 2),
  ('Diâmetro do poço', '6"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 6" R11A-10 6,5CV 220/380V TRI S600
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 6" R11A-10 6,5CV 220/380V TRI S600', 'bomba-submersa-leao-r11a-10-600', cat.id, brand.id, 'R11A-10-600', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225905124/r7a-r11a-r20a-r28a-motor-600_site_product-55dt7q3ivf.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-r11a-10-600')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '6,5 CV', 1),
  ('Tensão', '220/380V', 2),
  ('Diâmetro do poço', '6"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 6" R11A-09 6CV 220/380V TRI S600
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 6" R11A-09 6CV 220/380V TRI S600', 'bomba-submersa-leao-r11a-09-600', cat.id, brand.id, 'R11A-09-600', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225902555/r7a-r11a-r20a-r28a-motor-600_site_product-tj6dm7kwm3.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-r11a-09-600')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '6 CV', 1),
  ('Tensão', '220/380V', 2),
  ('Diâmetro do poço', '6"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 4" 230 4R3PA-11 1 CV 220V
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Leão 4" 230 4R3PA-11 1 CV 220V', 'bomba-submersa-leao-4r3pa-11-230', cat.id, brand.id, '4R3PA-11-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225861853/inox-4r1-r3-r3r-r4-r5ia_r3-e-r5ib-sem-fio_gallery-aql1v8xr2j.jpg'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-leao-4r3pa-11-230')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '1 CV', 1),
  ('Tensão', '220V', 2),
  ('Diâmetro do poço', '4"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Ebara 3" 3BPS2-14 0,75 CV
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'ebara')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Ebara 3" 3BPS2-14 0,75 CV', 'bomba-submersa-ebara-3bps2-14', cat.id, brand.id, '3BPS2-14', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225859691/1-37k8929o8w.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-ebara-3bps2-14')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '0,75 CV', 1),
  ('Diâmetro do poço', '3"', 2)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Ebara 3" 3BPS2-10 0,50 CV
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'ebara')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Ebara 3" 3BPS2-10 0,50 CV', 'bomba-submersa-ebara-3bps2-10', cat.id, brand.id, '3BPS2-10', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225857415/1-p00y2ye2jn.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-ebara-3bps2-10')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '0,50 CV', 1),
  ('Diâmetro do poço', '3"', 2)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Ebara 3" 3BPS2-07 0,33 CV 220V
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'ebara')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Submersa Ebara 3" 3BPS2-07 0,33 CV 220V', 'bomba-submersa-ebara-3bps2-07', cat.id, brand.id, '3BPS2-07', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225152806/1-yfluxqk532.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-ebara-3bps2-07')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Potência', '0,33 CV', 1),
  ('Tensão', '220V', 2),
  ('Diâmetro do poço', '3"', 3)
) as s(spec_name, spec_value, sort_order);

-- Bomba Drenagem Schneider LUP-05
with cat as (select id from categories where slug = 'bomba-drenagem'), brand as (select id from brands where slug = 'schneider')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Bomba Drenagem Schneider LUP-05', 'bomba-drenagem-schneider-lup-05', cat.id, brand.id, 'LUP-05', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225013642/2-hj5cd3u6z5.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-drenagem-schneider-lup-05')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Aplicação', 'Drenagem de água limpa/levemente suja', 1)
) as s(spec_name, spec_value, sort_order);

-- Cabo Pp Flexível 3x6mm Condumig
with cat as (select id from categories where slug = 'cabos-pp'), brand as (select id from brands where slug = 'condumig')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Cabo Pp Flexível 3x6mm Condumig', 'cabo-pp-flexivel-3x6mm-condumig', cat.id, brand.id, 'CABO3X6', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225245249/1-2fcx6gnk0p.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'cabo-pp-flexivel-3x6mm-condumig')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Bitola', '3x6mm²', 1)
) as s(spec_name, spec_value, sort_order);
with p as (select id from products where slug = 'cabo-pp-flexivel-3x6mm-condumig')
insert into variation_groups (product_id, name, sort_order)
select p.id, 'Metros', 1 from p;
with g as (
  select vg.id from variation_groups vg
  join products p on p.id = vg.product_id
  where p.slug = 'cabo-pp-flexivel-3x6mm-condumig' and vg.name = 'Metros'
)
insert into variation_options (group_id, value, price_delta, sort_order)
select g.id, value, 0, row_number() over () from g, (values
  ('10 MTS'),
  ('20 MTS'),
  ('50 MTS'),
  ('60 MTS'),
  ('80 MTS'),
  ('100 MTS')
) as o(value);

-- Cabo Pp Flexível 3x4mm Condumig
with cat as (select id from categories where slug = 'cabos-pp'), brand as (select id from brands where slug = 'condumig')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Cabo Pp Flexível 3x4mm Condumig', 'cabo-pp-flexivel-3x4mm-condumig', cat.id, brand.id, 'CABO3X4', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225243370/1-thr4mdivuk.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'cabo-pp-flexivel-3x4mm-condumig')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Bitola', '3x4mm²', 1)
) as s(spec_name, spec_value, sort_order);
with p as (select id from products where slug = 'cabo-pp-flexivel-3x4mm-condumig')
insert into variation_groups (product_id, name, sort_order)
select p.id, 'Metros', 1 from p;
with g as (
  select vg.id from variation_groups vg
  join products p on p.id = vg.product_id
  where p.slug = 'cabo-pp-flexivel-3x4mm-condumig' and vg.name = 'Metros'
)
insert into variation_options (group_id, value, price_delta, sort_order)
select g.id, value, 0, row_number() over () from g, (values
  ('10 MTS'),
  ('20 MTS'),
  ('50 MTS'),
  ('60 MTS'),
  ('80 MTS'),
  ('100 MTS')
) as o(value);

-- Cabo Pp Flexível 3x2.5mm Condumig
with cat as (select id from categories where slug = 'cabos-pp'), brand as (select id from brands where slug = 'condumig')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Cabo Pp Flexível 3x2.5mm Condumig', 'cabo-pp-flexivel-3x2-5mm-condumig', cat.id, brand.id, 'CABO3X2-5', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225106885/3-v1spwveaji.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'cabo-pp-flexivel-3x2-5mm-condumig')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Bitola', '3x2,5mm²', 1)
) as s(spec_name, spec_value, sort_order);
with p as (select id from products where slug = 'cabo-pp-flexivel-3x2-5mm-condumig')
insert into variation_groups (product_id, name, sort_order)
select p.id, 'Metros', 1 from p;
with g as (
  select vg.id from variation_groups vg
  join products p on p.id = vg.product_id
  where p.slug = 'cabo-pp-flexivel-3x2-5mm-condumig' and vg.name = 'Metros'
)
insert into variation_options (group_id, value, price_delta, sort_order)
select g.id, value, 0, row_number() over () from g, (values
  ('10 MTS'),
  ('20 MTS'),
  ('50 MTS'),
  ('60 MTS'),
  ('80 MTS'),
  ('100 MTS')
) as o(value);

-- Cabo Pp Flexível 2x2.5mm Condumig
with cat as (select id from categories where slug = 'cabos-pp'), brand as (select id from brands where slug = 'condumig')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Cabo Pp Flexível 2x2.5mm Condumig', 'cabo-pp-flexivel-2x2-5mm-condumig', cat.id, brand.id, 'CABO2X2-5', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225104097/3-ctexl3sou8.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'cabo-pp-flexivel-2x2-5mm-condumig')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Bitola', '2x2,5mm²', 1)
) as s(spec_name, spec_value, sort_order);
with p as (select id from products where slug = 'cabo-pp-flexivel-2x2-5mm-condumig')
insert into variation_groups (product_id, name, sort_order)
select p.id, 'Metros', 1 from p;
with g as (
  select vg.id from variation_groups vg
  join products p on p.id = vg.product_id
  where p.slug = 'cabo-pp-flexivel-2x2-5mm-condumig' and vg.name = 'Metros'
)
insert into variation_options (group_id, value, price_delta, sort_order)
select g.id, value, 0, row_number() over () from g, (values
  ('10 MTS'),
  ('20 MTS'),
  ('50 MTS'),
  ('60 MTS'),
  ('80 MTS'),
  ('100 MTS')
) as o(value);

-- Luva Galvanizada TUPY
with cat as (select id from categories where slug = 'conexoes'), brand as (select id from brands where slug = 'tupy')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Luva Galvanizada TUPY', 'luva-galvanizada-tupy', cat.id, brand.id, 'LUVA', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26544772/612cdd50a15a7-k7wcfkztwk.jpg'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'luva-galvanizada-tupy')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Material', 'Ferro galvanizado', 1)
) as s(spec_name, spec_value, sort_order);

-- Abraçadeira Metal Reforçada P/ Mangueira
with cat as (select id from categories where slug = 'conexoes'), brand as (select id from brands where slug = 'fundicao-medeiros')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Abraçadeira Metal Reforçada P/ Mangueira', 'abracadeira-metal-reforcada-p-mangueira', cat.id, brand.id, 'ABRA-FM', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225211398/1-dxh10l1i19.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'abracadeira-metal-reforcada-p-mangueira')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Material', 'Metal reforçado', 1)
) as s(spec_name, spec_value, sort_order);

-- Adaptado P/ Mangueira Macho Escama x Bsp - Ferro Fundido
with cat as (select id from categories where slug = 'conexoes'), brand as (select id from brands where slug = 'fundicao-medeiros')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Adaptado P/ Mangueira Macho Escama x Bsp - Ferro Fundido', 'adaptado-p-mangueira-macho-escama-bsp-ferro-fundido', cat.id, brand.id, 'ADAP-MAG-FM', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225205950/1-9mqj4b3ixb.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'adaptado-p-mangueira-macho-escama-bsp-ferro-fundido')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Material', 'Ferro fundido', 1)
) as s(spec_name, spec_value, sort_order);

-- Válvula Esfera Monobloco em Latão Niquelado - Mipel
with cat as (select id from categories where slug = 'conexoes'), brand as (select id from brands where slug = 'mipel')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Válvula Esfera Monobloco em Latão Niquelado - Mipel', 'valvula-esfera-monobloco-latao-niquelado-mipel', cat.id, brand.id, 'REG-ESF-MIPEL', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225204544/9101i3e-ng23ukmra8.jpg'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'valvula-esfera-monobloco-latao-niquelado-mipel')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Material', 'Latão niquelado', 1)
) as s(spec_name, spec_value, sort_order);

-- Painel de Comando Completo Trifásico 220V
with cat as (select id from categories where slug = 'painel')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Painel de Comando Completo Trifásico 220V', 'painel-comando-completo-trifasico-220v', cat.id, null, 'PCCT220V', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26929586/1-tqlltj58xd.png'
from cat
on conflict (slug) do nothing;
with p as (select id from products where slug = 'painel-comando-completo-trifasico-220v')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Fase', 'Trifásico', 1),
  ('Tensão', '220V', 2)
) as s(spec_name, spec_value, sort_order);

-- Tampa Para Poço Artesiano 6 Polegadas
with cat as (select id from categories where slug = 'tampas'), brand as (select id from brands where slug = 'hidro-g')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Tampa Para Poço Artesiano 6 Polegadas', 'tampa-poco-artesiano-6-polegadas', cat.id, brand.id, 'TAMPA-6', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225149756/1-q5djty8esp.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'tampa-poco-artesiano-6-polegadas')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Material', 'Chapa de aço 5mm', 1),
  ('Aplicação', 'Poços artesianos, tubo geomecânico 6"', 2)
) as s(spec_name, spec_value, sort_order);
with p as (select id from products where slug = 'tampa-poco-artesiano-6-polegadas')
insert into variation_groups (product_id, name, sort_order)
select p.id, 'Diâmetro nominal', 1 from p;
with g as (
  select vg.id from variation_groups vg
  join products p on p.id = vg.product_id
  where p.slug = 'tampa-poco-artesiano-6-polegadas' and vg.name = 'Diâmetro nominal'
)
insert into variation_options (group_id, value, price_delta, sort_order)
select g.id, value, 0, row_number() over () from g, (values
  ('6" X FURO 1 1/4"'),
  ('6" X FURO 1"')
) as o(value);

-- Tampa Para Poço Artesiano 4 Polegadas
with cat as (select id from categories where slug = 'tampas'), brand as (select id from brands where slug = 'hidro-g')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url)
select 'Tampa Para Poço Artesiano 4 Polegadas', 'tampa-poco-artesiano-4-polegadas', cat.id, brand.id, 'TAMPA-4', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225130986/1-p0y0ox9egh.png'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'tampa-poco-artesiano-4-polegadas')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Material', 'Chapa de aço 5mm', 1),
  ('Aplicação', 'Poços artesianos, tubo geomecânico 4"', 2)
) as s(spec_name, spec_value, sort_order);
with p as (select id from products where slug = 'tampa-poco-artesiano-4-polegadas')
insert into variation_groups (product_id, name, sort_order)
select p.id, 'Diâmetro nominal', 1 from p;
with g as (
  select vg.id from variation_groups vg
  join products p on p.id = vg.product_id
  where p.slug = 'tampa-poco-artesiano-4-polegadas' and vg.name = 'Diâmetro nominal'
)
insert into variation_options (group_id, value, price_delta, sort_order)
select g.id, value, 0, row_number() over () from g, (values
  ('4" X FURO 1 1/2"'),
  ('4" X FURO 1 1/4"'),
  ('4" X FURO 1"')
) as o(value);
