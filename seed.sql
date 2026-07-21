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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Ebara 4" 4BPL3-10 1,5 CV 220V', 'bomba-submersa-ebara-4bpl3-10', cat.id, brand.id, '4BPL3-10', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/51091860/1-w6q6hbqeh6.png'
, '<p>Bomba Submersa Ebara 3" 3BPS2-14 0,75 CV </p>

<p>Aplicações:</p>

<p>Captação de água potável em poços tubulares profundos;<br />
Fornecimento de água para uso residencial, industrial e agrícola;<br />
Reservatórios.</p>

<p>Características:</p>

<p>Modelo: 3BPS2-14<br />
Marca:Ebara<br />
Potencia: 0,75 cv<br />
Serie do Motor: M3C <br />
Estágios: 14<br />
Tensão: 127 V 2 FIOS<br />
Fase: Monofásica<br />
Altura Manométrica Máxima: 80 mca<br />
Vazão </p>

<p>80 mts - 1000 L/H</p>

<p>44 mts - 2500 L/H</p>

<p>1,4 mts - 3800 L/H</p>

<p>Recalque: 1"</p>

<p>Diâmetro: 3" (75mm)<br />
 </p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>

<p> </p>

<p> </p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Ebara 4" 4BPL6-08 1,5 CV 220V', 'bomba-submersa-ebara-4bpl6-08', cat.id, brand.id, '4BPL6-08', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/51090240/1-357njneuwi.png'
, '<p>Bomba Submersa Ebara 3" 3BPS2-10 0,50 CV </p>

<p>Aplicações:</p>

<p>Captação de água potável em poços tubulares profundos;<br />
Fornecimento de água para uso residencial, industrial e agrícola;<br />
Reservatórios.</p>

<p>Características:</p>

<p>Modelo: 3BPS2-10<br />
Marca:Ebara<br />
Potencia: 0,50 cv<br />
Serie do Motor: M3C <br />
Estágios: 10<br />
Tensão: 127 V 2 FIOS<br />
Fase: Monofásica<br />
Altura Manométrica Máxima: 57 mca<br />
Vazão </p>

<p>57 mts - 1000 L/H</p>

<p>33 mts - 2500 L/H</p>

<p>1,8 mts - 3800 L/H</p>

<p>Recalque: 1"</p>

<p>Diâmetro: 3" (75mm)<br />
 </p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>

<p> </p>

<p> </p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 6" R11A-07 4,5CV 220/380V TRI S600', 'bomba-submersa-leao-r11a-07-600', cat.id, brand.id, 'R11A-07-600', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/31138374/1-411qbqv2ed.png'
, '<p><strong>Bomba Submersa Leão 6" R11A-09 6CV 220/380 TRIF s600</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 6”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: R11A-09</p>

<p>Serie Motor: 600 (Água)</p>

<p>Potência: 6CV</p>

<p>Tensão: 220/380V TRIF</p>

<p>Amperagem: 19,73A / 11,59A</p>

<p>Profundidade Max: 120 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left: 54pt;">120 Metros - 6000 L/h</p>

<p style="margin-left: 54pt;">103 Metros - 10000 L/h</p>

<p style="margin-left: 54pt;">72 Metros - 14000 L/h</p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Acoplagem por sistema de chaveta;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Rotor de fluxo radial;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Bocal de saída 2” com rosca BSP;</span></p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo de estágio, mancal superior/intermediário e corpo da válvula de retenção de ferro fundido, rotor e eixo em inox.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 3" 180 3R3PB-18 1 CV 220v', 'bomba-submersa-leao-3r3pb-18-180', cat.id, brand.id, '3R3PB-18-180', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/31094486/2-4uxl9tqnvi.png'
, '<p>Bomba Submersa Ebara 3" 3BPS2-07 0,33 CV 220V</p>

<p>Aplicações:</p>

<p>Captação de água potável em poços tubulares profundos;<br />
Fornecimento de água para uso residencial, industrial e agrícola;<br />
Reservatórios.</p>

<p>Características:</p>

<p>Modelo: 3BPS2-07<br />
Marca:Ebara<br />
Potencia: 0,33 cv<br />
Serie do Motor: M3C <br />
Estágios: 07<br />
Tensão: 220 V 2 FIOS<br />
Fase: Monofásica<br />
Altura Manométrica Máxima: 40 mca<br />
Vazão </p>

<p>40 mts - 1000 L/H</p>

<p>24 mts - 2500 L/H</p>

<p>1,3 mts - 3800 L/H</p>

<p>Recalque: 1"</p>

<p>Diâmetro: 3" (75mm)<br />
 </p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>

<p> </p>

<p> </p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 4" 230 4R4PA-08 0,75 CV 220V', 'bomba-submersa-leao-4r4pa-08-230', cat.id, brand.id, '4R4PA-08-230-220', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/31093959/2-7m4cvjykpr.png'
, '<p>Bomba Submersa Leão 4 Polegadas 230 4R3PA-11 1 CV 220V</p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 4”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: 4R3PA-11</p>

<p>Serie motor: 230 (Óleo)</p>

<p>Potência: 1 CV</p>

<p>Tensão: 220V MONO e 220V TRIF</p>

<p>Amperagem: 4.8 A e 2.7</p>

<p>Profundidade Max: 102 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left:54.0pt;">102 Metros - 600 L/h</p>

<p style="margin-left:54.0pt;">85 Metros - 2100 L/h</p>

<p style="margin-left:54.0pt;">38 Metros - 3600 L/h</p>

<p><span style="font-size:14px;">Bocal de saída 1 1/2” com rosca BSP;</span></p>

<p>Especificações de acoplagem conforme a Norma NEMA;</p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo da válvula de retenção, difusor e rotor de tecnopolímero injetado.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 3" 180 3R3PB-09 0,5 CV 220v', 'bomba-submersa-leao-3r3pb-09-180', cat.id, brand.id, '3R3PB-09-180', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26743630/2-9hbvaqnasz.png'
, '<p>Bomba Submersa Ebara 3" 3BPS2-07 0,33 CV 220V</p>

<p>Aplicações:</p>

<p>Captação de água potável em poços tubulares profundos;<br />
Fornecimento de água para uso residencial, industrial e agrícola;<br />
Reservatórios.</p>

<p>Características:</p>

<p>Modelo: 3BPS2-07<br />
Marca:Ebara<br />
Potencia: 0,33 cv<br />
Serie do Motor: M3C <br />
Estágios: 07<br />
Tensão: 220 V 2 FIOS<br />
Fase: Monofásica<br />
Altura Manométrica Máxima: 40 mca<br />
Vazão </p>

<p>40 mts - 1000 L/H</p>

<p>24 mts - 2500 L/H</p>

<p>1,3 mts - 3800 L/H</p>

<p>Recalque: 1"</p>

<p>Diâmetro: 3" (75mm)<br />
 </p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>

<p> </p>

<p> </p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 3" 180 3R3PB-13 3/4cv', 'bomba-submersa-leao-3r3pb-13-180', cat.id, brand.id, '3R3PB-13-180', 900, true, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26741384/2-gnmkpduq3q.png'
, '<p>Bomba Submersa Ebara 3" 3BPS2-07 0,33 CV 220V</p>

<p>Aplicações:</p>

<p>Captação de água potável em poços tubulares profundos;<br />
Fornecimento de água para uso residencial, industrial e agrícola;<br />
Reservatórios.</p>

<p>Características:</p>

<p>Modelo: 3BPS2-07<br />
Marca:Ebara<br />
Potencia: 0,33 cv<br />
Serie do Motor: M3C <br />
Estágios: 07<br />
Tensão: 220 V 2 FIOS<br />
Fase: Monofásica<br />
Altura Manométrica Máxima: 40 mca<br />
Vazão </p>

<p>40 mts - 1000 L/H</p>

<p>24 mts - 2500 L/H</p>

<p>1,3 mts - 3800 L/H</p>

<p>Recalque: 1"</p>

<p>Diâmetro: 3" (75mm)<br />
 </p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>

<p> </p>

<p> </p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba submersa vibratória - Anauger 6"', 'bomba-submersa-vibratoria-anauger-6', cat.id, brand.id, '2Z6R55R89', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26665331/1-ewdx48icjz.png'
, '<p>Bomba Submersa Ebara 3" 3BPS2-07 0,33 CV 220V</p>

<p>Aplicações:</p>

<p>Captação de água potável em poços tubulares profundos;<br />
Fornecimento de água para uso residencial, industrial e agrícola;<br />
Reservatórios.</p>

<p>Características:</p>

<p>Modelo: 3BPS2-07<br />
Marca:Ebara<br />
Potencia: 0,33 cv<br />
Serie do Motor: M3C <br />
Estágios: 07<br />
Tensão: 220 V 2 FIOS<br />
Fase: Monofásica<br />
Altura Manométrica Máxima: 40 mca<br />
Vazão </p>

<p>40 mts - 1000 L/H</p>

<p>24 mts - 2500 L/H</p>

<p>1,3 mts - 3800 L/H</p>

<p>Recalque: 1"</p>

<p>Diâmetro: 3" (75mm)<br />
 </p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>

<p> </p>

<p> </p>'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-submersa-vibratoria-anauger-6')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Diâmetro do poço', '6"', 1)
) as s(spec_name, spec_value, sort_order);

-- Bomba Submersa Leão 4" 230 4R5PA-12 2 CV 220v
with cat as (select id from categories where slug = 'bombas-submersas'), brand as (select id from brands where slug = 'bombas-leao')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 4" 230 4R5PA-12 2 CV 220v', 'bomba-submersa-leao-4r5pa-12-230', cat.id, brand.id, '4R5PA-12-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26544531/3-0n4i0kzk6u.png'
, '<p><strong>Bomba Submersa Leão 4" 230 4R5PA-18 3CV 220v</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 4”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: 4R5PA-18</p>

<p>Serie motor: 230 (Óleo)</p>

<p>Potência: 3CV</p>

<p>Tensão: 220V TRIF</p>

<p>Amperagem:  10,3 A</p>

<p>Profundidade Max: 167 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left:54.0pt;">167 Metros - 1500 L/h</p>

<p style="margin-left:54.0pt;">128 Metros - 4000 L/h</p>

<p style="margin-left:54.0pt;">62 Metros - 6500 L/h</p>

<p><span class="indent0" style="box-sizing: border-box; padding: 0px; margin: 0px 0px 12px; font-size: 16px; direction: ltr; list-style: square; line-height: 1.3em;box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;"><span style="font-size:14px;"> Bocal de saída 1 1/2” com rosca BSP;</span></span></p>

<p><span style="font-size:14px;">Especificações de acoplagem conforme a Norma NEMA;</span></p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo da válvula de retenção, difusor e rotor de tecnopolímero injetado.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 4" 230 4R5PA-09 1,5 CV', 'bomba-submersa-leao-4r5pa-09-230', cat.id, brand.id, '4R5PA-09-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26543982/1-9jaz3hjjia.png'
, '<p><strong>Bomba Submersa Leão 4" 370 4R5PA-09 1,5 CV 220V</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 4”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: 4R5PA-09</p>

<p>Serie motor: 370 (Água)</p>

<p>Potência: 1,5 CV</p>

<p>Tensão: 220V TRIF</p>

<p>Amperagem: 7,3A</p>

<p>Profundidade Max: 89 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left:54.0pt;">89 Metros - 1500 L/h</p>

<p style="margin-left:54.0pt;">68 Metros - 4000 L/h</p>

<p style="margin-left:54.0pt;">35 Metros - 6500 L/h</p>

<p>Especificações de acoplagem conforme a Norma NEMA;</p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo da válvula de retenção, difusor e rotor de tecnopolímero injetado.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 4" 230 4R4PA-10 1,0 CV 220v', 'bomba-submersa-leao-4r4pa-10-230', cat.id, brand.id, '4R4PA-10-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26542654/2-x1vgn5lu89.png'
, '<p>Bomba Submersa Leão 4 Polegadas 230 4R3PA-11 1 CV 220V</p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 4”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: 4R3PA-11</p>

<p>Serie motor: 230 (Óleo)</p>

<p>Potência: 1 CV</p>

<p>Tensão: 220V MONO e 220V TRIF</p>

<p>Amperagem: 4.8 A e 2.7</p>

<p>Profundidade Max: 102 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left:54.0pt;">102 Metros - 600 L/h</p>

<p style="margin-left:54.0pt;">85 Metros - 2100 L/h</p>

<p style="margin-left:54.0pt;">38 Metros - 3600 L/h</p>

<p><span style="font-size:14px;">Bocal de saída 1 1/2” com rosca BSP;</span></p>

<p>Especificações de acoplagem conforme a Norma NEMA;</p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo da válvula de retenção, difusor e rotor de tecnopolímero injetado.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 4" 230 4R3PA-07 0,5 CV 220V', 'bomba-submersa-leao-4r3pa-07-230', cat.id, brand.id, '4R3PA-07-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26516433/2-qz1c8jk38q.png'
, '<p>Bomba Submersa Leão 4 Polegadas 230 4R3PA-11 1 CV 220V</p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 4”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: 4R3PA-11</p>

<p>Serie motor: 230 (Óleo)</p>

<p>Potência: 1 CV</p>

<p>Tensão: 220V MONO e 220V TRIF</p>

<p>Amperagem: 4.8 A e 2.7</p>

<p>Profundidade Max: 102 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left:54.0pt;">102 Metros - 600 L/h</p>

<p style="margin-left:54.0pt;">85 Metros - 2100 L/h</p>

<p style="margin-left:54.0pt;">38 Metros - 3600 L/h</p>

<p><span style="font-size:14px;">Bocal de saída 1 1/2” com rosca BSP;</span></p>

<p>Especificações de acoplagem conforme a Norma NEMA;</p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo da válvula de retenção, difusor e rotor de tecnopolímero injetado.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 4" 230 4R5PA-18 3CV 220v', 'bomba-submersa-leao-4r5pa-18-230', cat.id, brand.id, '4R5PA-18-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/226000907/4r1-4r3r-4r3-4r4-4r5_gallery-r6wfj20b5p.png'
, '<p><strong>Bomba Submersa Leão 4" 230 4R5PA-18 3CV 220v</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 4”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: 4R5PA-18</p>

<p>Serie motor: 230 (Óleo)</p>

<p>Potência: 3CV</p>

<p>Tensão: 220V TRIF</p>

<p>Amperagem:  10,3 A</p>

<p>Profundidade Max: 167 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left:54.0pt;">167 Metros - 1500 L/h</p>

<p style="margin-left:54.0pt;">128 Metros - 4000 L/h</p>

<p style="margin-left:54.0pt;">62 Metros - 6500 L/h</p>

<p><span class="indent0" style="box-sizing: border-box; padding: 0px; margin: 0px 0px 12px; font-size: 16px; direction: ltr; list-style: square; line-height: 1.3em;box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;"><span style="font-size:14px;"> Bocal de saída 1 1/2” com rosca BSP;</span></span></p>

<p><span style="font-size:14px;">Especificações de acoplagem conforme a Norma NEMA;</span></p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo da válvula de retenção, difusor e rotor de tecnopolímero injetado.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 4" 370 4R5PA-12 2CV', 'bomba-submersa-leao-4r5pa-12-370', cat.id, brand.id, '4R5PA-12-370', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225999291/4r1-4r3r-4r3-4r4-4r5_gallery-z9bb9veyjx.png'
, '<p><strong>Bomba Submersa Leão 4" 370 4R5PA-12 2CV 220V</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 4”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: 4R5PA-12</p>

<p>Serie motor: 370 (Água)</p>

<p>Potência: 2 CV</p>

<p>Tensão: 220V TRIF</p>

<p>Amperagem: 8,3A</p>

<p>Profundidade Max: 117 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left:54.0pt;">117 Metros - 1500 L/h</p>

<p style="margin-left:54.0pt;">91 Metros - 4000 L/h</p>

<p style="margin-left:54.0pt;">48 Metros - 6500 L/h</p>

<p>Especificações de acoplagem conforme a Norma NEMA;</p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo da válvula de retenção, difusor e rotor de tecnopolímero injetado.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 4" 370 4R5PA-09 1,5 CV', 'bomba-submersa-leao-4r5pa-09-370', cat.id, brand.id, '4R5PA-09-370', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225997832/4r1-4r3r-4r3-4r4-4r5_gallery-34wlk4i9i1.png'
, '<p><strong>Bomba Submersa Leão 4" 370 4R5PA-12 2CV 220V</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 4”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: 4R5PA-12</p>

<p>Serie motor: 370 (Água)</p>

<p>Potência: 2 CV</p>

<p>Tensão: 220V TRIF</p>

<p>Amperagem: 8,3A</p>

<p>Profundidade Max: 117 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left:54.0pt;">117 Metros - 1500 L/h</p>

<p style="margin-left:54.0pt;">91 Metros - 4000 L/h</p>

<p style="margin-left:54.0pt;">48 Metros - 6500 L/h</p>

<p>Especificações de acoplagem conforme a Norma NEMA;</p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo da válvula de retenção, difusor e rotor de tecnopolímero injetado.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 6" R20A-08 8CV 220/380V TRI S600', 'bomba-submersa-leao-r20a-08-610', cat.id, brand.id, 'R20A-08-610', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225923348/r7-r11-r20-r28-s610-fvh6ci6ygj.jpg'
, '<p><strong>Bomba Submersa Leão 6" R20A-09 9CV 220/380 TRIF S600</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 6”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: R20A-09</p>

<p>Serie Motor: 600 (Água)</p>

<p>Potência: 9CV</p>

<p>Tensão: 220/380V TRIF</p>

<p>Amperagem: 28A / 16,41A</p>

<p>Profundidade Max: 128 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left: 54pt;">128 Metros - 12.000 L/h</p>

<p style="margin-left: 54pt;">104 Metros - 18.000 L/h</p>

<p style="margin-left: 54pt;">66 Metros - 24.000 L/h</p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Acoplagem por sistema de chaveta;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Rotor de fluxo radial;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Bocal de saída 2 1/2” com rosca BSP;</span></p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo de estágio, mancal superior/intermediário e corpo da válvula de retenção de ferro fundido, rotor e eixo em inox.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 6" R20A-09 9CV 220/380V TRI S600', 'bomba-submersa-leao-r20a-09-600', cat.id, brand.id, 'R20A-09-600', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225922607/r7a-r11a-r20a-r28a-motor-600_site_product-ox5vffrb8f.png'
, '<p><strong>Bomba Submersa Leão 6" R20A-08 8CV 220/380 TRIF S600</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 6”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: R20A-08</p>

<p>Serie Motor: 600 (Água)</p>

<p>Potência: 8CV</p>

<p>Tensão: 220/380V TRIF</p>

<p>Amperagem: 23,5A / 13,6A</p>

<p>Profundidade Max: 115 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left: 54pt;">115 Metros - 12.000 L/h</p>

<p style="margin-left: 54pt;">94 Metros - 18.000 L/h</p>

<p style="margin-left: 54pt;">60,5 Metros - 24.000 L/h</p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Acoplagem por sistema de chaveta;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Rotor de fluxo radial;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Bocal de saída 2 1/2” com rosca BSP;</span></p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo de estágio, mancal superior/intermediário e corpo da válvula de retenção de ferro fundido, rotor e eixo em inox.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 6" R20A-7 7CV 220/380V TRI S600', 'bomba-submersa-leao-r20a-07-600', cat.id, brand.id, 'R20A-07-600', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225920101/r7a-r11a-r20a-r28a-motor-600_site_product-pcv5fqpe62.png'
, '<p><strong>Bomba Submersa Leão 6" R20A-09 9CV 220/380 TRIF S600</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 6”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: R20A-09</p>

<p>Serie Motor: 600 (Água)</p>

<p>Potência: 9CV</p>

<p>Tensão: 220/380V TRIF</p>

<p>Amperagem: 28A / 16,41A</p>

<p>Profundidade Max: 128 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left: 54pt;">128 Metros - 12.000 L/h</p>

<p style="margin-left: 54pt;">104 Metros - 18.000 L/h</p>

<p style="margin-left: 54pt;">66 Metros - 24.000 L/h</p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Acoplagem por sistema de chaveta;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Rotor de fluxo radial;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Bocal de saída 2 1/2” com rosca BSP;</span></p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo de estágio, mancal superior/intermediário e corpo da válvula de retenção de ferro fundido, rotor e eixo em inox.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 6" R11A-11 7CV 220/380V TRI S600', 'bomba-submersa-leao-r11a-11-500', cat.id, brand.id, 'R11A-11-500', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225917485/r7-r11-r20-r28-s610-7se7xk7rrv.jpg'
, '<p><strong>Bomba Submersa Leão 6" R11A-09 6CV 220/380 TRIF s600</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 6”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: R11A-09</p>

<p>Serie Motor: 600 (Água)</p>

<p>Potência: 6CV</p>

<p>Tensão: 220/380V TRIF</p>

<p>Amperagem: 19,73A / 11,59A</p>

<p>Profundidade Max: 120 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left: 54pt;">120 Metros - 6000 L/h</p>

<p style="margin-left: 54pt;">103 Metros - 10000 L/h</p>

<p style="margin-left: 54pt;">72 Metros - 14000 L/h</p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Acoplagem por sistema de chaveta;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Rotor de fluxo radial;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Bocal de saída 2” com rosca BSP;</span></p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo de estágio, mancal superior/intermediário e corpo da válvula de retenção de ferro fundido, rotor e eixo em inox.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 6" R11A-14 9CV 220/380V TRI S600', 'bomba-submersa-leao-r11a-14-610', cat.id, brand.id, 'R11A-14-610', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225909785/r7-r11-r20-r28-s610-hpxotwy9ns.jpg'
, '<p><strong>Bomba Submersa Leão 6" R11A-09 6CV 220/380 TRIF s600</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 6”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: R11A-09</p>

<p>Serie Motor: 600 (Água)</p>

<p>Potência: 6CV</p>

<p>Tensão: 220/380V TRIF</p>

<p>Amperagem: 19,73A / 11,59A</p>

<p>Profundidade Max: 120 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left: 54pt;">120 Metros - 6000 L/h</p>

<p style="margin-left: 54pt;">103 Metros - 10000 L/h</p>

<p style="margin-left: 54pt;">72 Metros - 14000 L/h</p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Acoplagem por sistema de chaveta;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Rotor de fluxo radial;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Bocal de saída 2” com rosca BSP;</span></p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo de estágio, mancal superior/intermediário e corpo da válvula de retenção de ferro fundido, rotor e eixo em inox.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 6" R11A-10 6,5CV 220/380V TRI S600', 'bomba-submersa-leao-r11a-10-600', cat.id, brand.id, 'R11A-10-600', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225905124/r7a-r11a-r20a-r28a-motor-600_site_product-55dt7q3ivf.png'
, '<p><strong>Bomba Submersa Leão 6" R11A-09 6CV 220/380 TRIF s600</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 6”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: R11A-09</p>

<p>Serie Motor: 600 (Água)</p>

<p>Potência: 6CV</p>

<p>Tensão: 220/380V TRIF</p>

<p>Amperagem: 19,73A / 11,59A</p>

<p>Profundidade Max: 120 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left: 54pt;">120 Metros - 6000 L/h</p>

<p style="margin-left: 54pt;">103 Metros - 10000 L/h</p>

<p style="margin-left: 54pt;">72 Metros - 14000 L/h</p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Acoplagem por sistema de chaveta;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Rotor de fluxo radial;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Bocal de saída 2” com rosca BSP;</span></p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo de estágio, mancal superior/intermediário e corpo da válvula de retenção de ferro fundido, rotor e eixo em inox.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 6" R11A-09 6CV 220/380V TRI S600', 'bomba-submersa-leao-r11a-09-600', cat.id, brand.id, 'R11A-09-600', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225902555/r7a-r11a-r20a-r28a-motor-600_site_product-tj6dm7kwm3.png'
, '<p><strong>Bomba Submersa Leão 6" R11A-10 6,5CV 220/380 TRIF s600</strong></p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 6”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: R11A-10</p>

<p>Serie Motor: 600 (Água)</p>

<p>Potência: 6,5CV</p>

<p>Tensão: 220/380V TRIF</p>

<p>Amperagem: 20,72A / 12,14A</p>

<p>Profundidade Max: 133 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left: 54pt;">133 Metros - 6000 L/h</p>

<p style="margin-left: 54pt;">113 Metros - 10000 L/h</p>

<p style="margin-left: 54pt;">80 Metros - 14000 L/h</p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Acoplagem por sistema de chaveta;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Rotor de fluxo radial;</span></p>

<p><span class="indent0" style="direction: ltr; list-style: square; line-height: 1.3em; box-sizing: border-box; padding: 0px; margin: 0px 0px 0px -4px; display: block;">Bocal de saída 2” com rosca BSP;</span></p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo de estágio, mancal superior/intermediário e corpo da válvula de retenção de ferro fundido, rotor e eixo em inox.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Leão 4" 230 4R3PA-11 1 CV 220V', 'bomba-submersa-leao-4r3pa-11-230', cat.id, brand.id, '4R3PA-11-230', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225861853/inox-4r1-r3-r3r-r4-r5ia_r3-e-r5ib-sem-fio_gallery-aql1v8xr2j.jpg'
, '<p>Bomba Submersa Leão 4 Polegadas 230 4R3PA-11 1 CV 220V</p>

<p> </p>

<p><strong>--APLICAÇÕES GERAIS</strong></p>

<p>Motores projetados para operar acoplado em bombas para captação de águas subterrâneas em poços com diâmetro interno mínimo de 4”;</p>

<p>Suas principais aplicações são sistemas de abastecimento público, industrial, agrícola, irrigação e mineração;</p>

<p>Pressurização em rede hidráulica;</p>

<p>Reservatórios.</p>

<p><strong>--DETALHES DO PRODUTO</strong></p>

<p>Modelo: 4R3PA-11</p>

<p>Serie motor: 230 (Óleo)</p>

<p>Potência: 1 CV</p>

<p>Tensão: 220V MONO e 220V TRIF</p>

<p>Amperagem: 4.8 A e 2.7</p>

<p>Profundidade Max: 102 Metros</p>

<p>Tabela de Curva - Vazão</p>

<p style="margin-left:54.0pt;">102 Metros - 600 L/h</p>

<p style="margin-left:54.0pt;">85 Metros - 2100 L/h</p>

<p style="margin-left:54.0pt;">38 Metros - 3600 L/h</p>

<p><span style="font-size:14px;">Bocal de saída 1 1/2” com rosca BSP;</span></p>

<p>Especificações de acoplagem conforme a Norma NEMA;</p>

<p>Máximo de 10 partidas por hora com intervalo de 6 minutos a cada partida;</p>

<p>Temperatura máxima de operação: 40°C</p>

<p>Bombeador é composto por: corpo de sucção, corpo da válvula de retenção, difusor e rotor de tecnopolímero injetado.</p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Ebara 3" 3BPS2-14 0,75 CV', 'bomba-submersa-ebara-3bps2-14', cat.id, brand.id, '3BPS2-14', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225859691/1-37k8929o8w.png'
, '<p>Bomba Submersa Ebara 3" 3BPS2-14 0,75 CV </p>

<p>Aplicações:</p>

<p>Captação de água potável em poços tubulares profundos;<br />
Fornecimento de água para uso residencial, industrial e agrícola;<br />
Reservatórios.</p>

<p>Características:</p>

<p>Modelo: 3BPS2-14<br />
Marca:Ebara<br />
Potencia: 0,75 cv<br />
Serie do Motor: M3C <br />
Estágios: 14<br />
Tensão: 127 V 2 FIOS<br />
Fase: Monofásica<br />
Altura Manométrica Máxima: 80 mca<br />
Vazão </p>

<p>80 mts - 1000 L/H</p>

<p>44 mts - 2500 L/H</p>

<p>1,4 mts - 3800 L/H</p>

<p>Recalque: 1"</p>

<p>Diâmetro: 3" (75mm)<br />
 </p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>

<p> </p>

<p> </p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Ebara 3" 3BPS2-10 0,50 CV', 'bomba-submersa-ebara-3bps2-10', cat.id, brand.id, '3BPS2-10', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225857415/1-p00y2ye2jn.png'
, '<p>Bomba Submersa Ebara 3" 3BPS2-14 0,75 CV </p>

<p>Aplicações:</p>

<p>Captação de água potável em poços tubulares profundos;<br />
Fornecimento de água para uso residencial, industrial e agrícola;<br />
Reservatórios.</p>

<p>Características:</p>

<p>Modelo: 3BPS2-14<br />
Marca:Ebara<br />
Potencia: 0,75 cv<br />
Serie do Motor: M3C <br />
Estágios: 14<br />
Tensão: 127 V 2 FIOS<br />
Fase: Monofásica<br />
Altura Manométrica Máxima: 80 mca<br />
Vazão </p>

<p>80 mts - 1000 L/H</p>

<p>44 mts - 2500 L/H</p>

<p>1,4 mts - 3800 L/H</p>

<p>Recalque: 1"</p>

<p>Diâmetro: 3" (75mm)<br />
 </p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>

<p> </p>

<p> </p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Submersa Ebara 3" 3BPS2-07 0,33 CV 220V', 'bomba-submersa-ebara-3bps2-07', cat.id, brand.id, '3BPS2-07', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225152806/1-yfluxqk532.png'
, '<p>Bomba Submersa Ebara 3" 3BPS2-10 0,50 CV </p>

<p>Aplicações:</p>

<p>Captação de água potável em poços tubulares profundos;<br />
Fornecimento de água para uso residencial, industrial e agrícola;<br />
Reservatórios.</p>

<p>Características:</p>

<p>Modelo: 3BPS2-10<br />
Marca:Ebara<br />
Potencia: 0,50 cv<br />
Serie do Motor: M3C <br />
Estágios: 10<br />
Tensão: 127 V 2 FIOS<br />
Fase: Monofásica<br />
Altura Manométrica Máxima: 57 mca<br />
Vazão </p>

<p>57 mts - 1000 L/H</p>

<p>33 mts - 2500 L/H</p>

<p>1,8 mts - 3800 L/H</p>

<p>Recalque: 1"</p>

<p>Diâmetro: 3" (75mm)<br />
 </p>

<p><strong>--OBSERVAÇÕES</strong></p>

<p>O equipamento não deve trabalhar sem água.</p>

<p>As vazões acima descritas correspondem aos respectivos níveis dinâmicos e não ao ponto de instalação da bomba. Portanto, quando se basear pelo ponto de instalação, as vazões serão MAIORES que as descritas, considerando que o poço consiga produzir a quantidade de água extraída.<br />
<br />
Nível dinâmico: Nível de água do poço com a bomba ligada.</p>

<p> </p>

<p> </p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Bomba Drenagem Schneider LUP-05', 'bomba-drenagem-schneider-lup-05', cat.id, brand.id, 'LUP-05', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225013642/2-hj5cd3u6z5.png'
, '<p>Aplicações Gerais</p>

<p>• Aplicações residenciais</p>

<p>• Limpeza de caixas d’água, poços, reservatórios e cisternas</p>

<p>• Drenagem de pequenas piscinas, porões e garagens Detalhes Técnicos</p>

<p>• Bocal com rosca BSP e com adaptador para mangueira</p>

<p>• Corpo da motobomba em polipropileno • Caracol de polipropileno com 20% de fibra de vidro</p>

<p>• Rotor de poliamida com 30% de fibra de vidro</p>

<p>• Selo mecânico constituído de aço inox AISI-304, buna N, grafite e cerâmica</p>

<p>• Motor elétrico IP-68 com protetor térmico, 2 Polos, 60 Hz, Monofásico</p>

<p>• Tensão: 127 V ou 220 V • Comprimento do cabo de ligação: 5 metros</p>

<p>Características:</p>

<p>Modelo:LUP-05<br />
Marca: SCHNEIDER<br />
Potencia: 0,5 cv<br />
Tensão: 127V 220 V <br />
Fase: Monofásica<br />
Altura Manometrica Máxima: 7 mca<br />
Vazão Máxima: 8,2 m/h<br />
Recalque:  1 1/4" ou 1”<br />
Peso: Aprox. 7,7 kg<br />
Rotor de fluxo radial</p>

<p> </p>

<p> </p>

<p>Importante</p>

<p>•  Temperatura máxima do líquido bombeado: 40 °C</p>

<p>• Profundidade de imersão máxima: 7 metros</p>'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'bomba-drenagem-schneider-lup-05')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Aplicação', 'Drenagem de água limpa/levemente suja', 1)
) as s(spec_name, spec_value, sort_order);

-- Cabo Pp Flexível 3x6mm Condumig
with cat as (select id from categories where slug = 'cabos-pp'), brand as (select id from brands where slug = 'condumig')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Cabo Pp Flexível 3x6mm Condumig', 'cabo-pp-flexivel-3x6mm-condumig', cat.id, brand.id, 'CABO3X6', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225245249/1-2fcx6gnk0p.png'
, '<p><strong>Cabo PP Flexível 2x2.5mm Condumig</strong></p>

<p> </p>

<p>Cabo de potência, com condutor flexível - Cobre; HEPR 90 °C  </p>

<p>Tensão Nominal: 0,6/1kV – Classe 4;  </p>

<p>2 vias de 2.5mm</p>

<p>Flexível</p>

<p>Normas Técnicas / Regulamento: NBR 7286:2015.</p>

<p><br />
Excelente para ligação de bombas submersas, máquinas, fazer extensões. Etc...<br />
  </p>

<p>Marca Condumig</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Cabo Pp Flexível 3x4mm Condumig', 'cabo-pp-flexivel-3x4mm-condumig', cat.id, brand.id, 'CABO3X4', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225243370/1-thr4mdivuk.png'
, '<p><strong>Cabo PP Flexível 3x6mm Condumig</strong></p>

<p> </p>

<p>Cabo de potência, com condutor flexível - Cobre; HEPR 90 °C  </p>

<p>Tensão Nominal: 0,6/1kV – Classe 4;  </p>

<p>3 vias de 6mm</p>

<p>Flexível</p>

<p>Normas Técnicas / Regulamento: NBR 7286:2015.</p>

<p><br />
Excelente para ligação de bombas submersas, máquinas, fazer extensões. Etc...<br />
  </p>

<p>Marca Condumig</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Cabo Pp Flexível 3x2.5mm Condumig', 'cabo-pp-flexivel-3x2-5mm-condumig', cat.id, brand.id, 'CABO3X2-5', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225106885/3-v1spwveaji.png'
, '<p><strong>Cabo PP Flexível 2x2.5mm Condumig</strong></p>

<p> </p>

<p>Cabo de potência, com condutor flexível - Cobre; HEPR 90 °C  </p>

<p>Tensão Nominal: 0,6/1kV – Classe 4;  </p>

<p>2 vias de 2.5mm</p>

<p>Flexível</p>

<p>Normas Técnicas / Regulamento: NBR 7286:2015.</p>

<p><br />
Excelente para ligação de bombas submersas, máquinas, fazer extensões. Etc...<br />
  </p>

<p>Marca Condumig</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Cabo Pp Flexível 2x2.5mm Condumig', 'cabo-pp-flexivel-2x2-5mm-condumig', cat.id, brand.id, 'CABO2X2-5', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225104097/3-ctexl3sou8.png'
, '<p><strong>Cabo PP Flexível 2x2.5mm Condumig</strong></p>

<p> </p>

<p>Cabo de potência, com condutor flexível - Cobre; HEPR 90 °C  </p>

<p>Tensão Nominal: 0,6/1kV – Classe 4;  </p>

<p>2 vias de 2.5mm</p>

<p>Flexível</p>

<p>Normas Técnicas / Regulamento: NBR 7286:2015.</p>

<p><br />
Excelente para ligação de bombas submersas, máquinas, fazer extensões. Etc...<br />
  </p>

<p>Marca Condumig</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Luva Galvanizada TUPY', 'luva-galvanizada-tupy', cat.id, brand.id, 'LUVA', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26544772/612cdd50a15a7-k7wcfkztwk.jpg'
, '<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(102, 102, 102); font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong style="margin: 0px; padding: 0px;">--APLICAÇÕES GERAIS</strong></p>

<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(102, 102, 102); font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><span style="color: rgb(85, 85, 85); font-family: Lato, sans-serif;">As conexões NPT-Média Pressão são aplicadas para a condução de líquidos, gases e vapores.</span></p>

<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(102, 102, 102); font-family: Arial, Helvetica, sans-serif; font-size: 12px;"> </p>

<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(102, 102, 102); font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong style="margin: 0px; padding: 0px;">--DETALHES DO PRODUTO</strong></p>

<table border="0" style="box-sizing: border-box; border-collapse: collapse; border-spacing: 0px; background: rgb(158, 158, 158); width: 1012px; border: 1px solid rgb(209, 209, 209); color: rgb(85, 85, 85); font-family: Lato, sans-serif; outline: none !important;">
	<thead style="box-sizing: border-box;">
		<tr style="box-sizing: border-box;">
			<th colspan="2" style="box-sizing: border-box; padding: 5px 8px; text-align: left; font-weight: 400; color: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209);">Diâmetro nominal</th>
			<th colspan="1" style="box-sizing: border-box; padding: 5px 8px; text-align: left; font-weight: 400; color: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209);">Dimensões em mm</th>
			<th rowspan="2" style="box-sizing: border-box; padding: 5px 8px; text-align: left; font-weight: 400; color: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209);">Peso em g</th>
		</tr>
		<tr style="box-sizing: border-box;">
			<th style="box-sizing: border-box; padding: 5px 8px; text-align: left; font-weight: 400; color: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209);">Polegada</th>
			<th style="box-sizing: border-box; padding: 5px 8px; text-align: left; font-weight: 400; color: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209);">mm</th>
			<th style="box-sizing: border-box; padding: 5px 8px; text-align: left; font-weight: 400; color: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209);">W</th>
		</tr>
	</thead>
	<tbody style="box-sizing: border-box;">
		<tr style="box-sizing: border-box;">
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">1/4"</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">8mm</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">26,9</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">49</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">1/2"</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">15mm</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">34</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">91</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">3/4"</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">20mm</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">38,6</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">156</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">1"</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">25mm</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">42,4</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">226</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">1.1/4"</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">32mm</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">49</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">352</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">1.1/2"</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">40mm</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">54,6</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">448</td>
		</tr>
		<tr style="box-sizing: border-box;">
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">2"</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">50mm</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">64,3</td>
			<td style="box-sizing: border-box; padding: 7px 8px; background: rgb(255, 255, 255); border: 1px solid rgb(209, 209, 209); border-collapse: collapse;">737</td>
		</tr>
	</tbody>
</table>

<p> </p>'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'luva-galvanizada-tupy')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Material', 'Ferro galvanizado', 1)
) as s(spec_name, spec_value, sort_order);

-- Abraçadeira Metal Reforçada P/ Mangueira
with cat as (select id from categories where slug = 'conexoes'), brand as (select id from brands where slug = 'fundicao-medeiros')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Abraçadeira Metal Reforçada P/ Mangueira', 'abracadeira-metal-reforcada-p-mangueira', cat.id, brand.id, 'ABRA-FM', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225211398/1-dxh10l1i19.png'
, '<p>Abraçadeira Reforçada para Mangueira Fundição Medeiros </p>

<p><strong>Indicação:</strong></p>

<p>— Mangueiras de material rígido em altas pressões;</p>

<p><strong>Medidas:</strong></p>

<p><strong>1" 29mm x 32mm</strong></p>

<p>— POLEGADAS: Mínima 1 1/8" Máxima 1 1/4"<br />
— MILÍMETROS: Mínima 29mm Máxima 32mm</p>

<p><strong>1 1/4" 32mm x 40mm </strong></p>

<p>— POLEGADAS: Mínima 1 3/8" Máxima 1 1/2"<br />
— MILÍMETROS: Mínima 32mm Máxima 40mm</p>

<p><strong>1 1/2" 39mm x 47mm Fundição Medeiros 2 peças</strong></p>

<p>— POLEGADAS: Mínima 1 1/2" Máxima 1 7/8"<br />
— MILÍMETROS: Mínima 39mm Máxima 47mm</p>

<p><strong>Material:</strong></p>

<p>— Aço zincado;</p>

<p> </p>

<p> </p>'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'abracadeira-metal-reforcada-p-mangueira')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Material', 'Metal reforçado', 1)
) as s(spec_name, spec_value, sort_order);

-- Adaptado P/ Mangueira Macho Escama x Bsp - Ferro Fundido
with cat as (select id from categories where slug = 'conexoes'), brand as (select id from brands where slug = 'fundicao-medeiros')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Adaptado P/ Mangueira Macho Escama x Bsp - Ferro Fundido', 'adaptado-p-mangueira-macho-escama-bsp-ferro-fundido', cat.id, brand.id, 'ADAP-MAG-FM', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225205950/1-9mqj4b3ixb.png'
, '<p>Adaptado P/ Mangueira Macho Escama x Rosca BSP - Ferro Fundido </p>

<p>Medidas:</p>

<p><strong>1" Escama x 1" Rosca BSP:</strong></p>

<p>- Comprimento: 72mm</p>

<p>- Escama: 27mm</p>

<p>- Rosca BSP: 1"</p>

<p><strong>1 1/4" Escama x 1 1/4" Rosca BSP:</strong></p>

<p>- Comprimento: 78mm</p>

<p>- Escama: 36mm</p>

<p>- Rosca BSP: 1 1/4"</p>

<p><strong>1 1/2" Escama x 1 1/4" Rosca BSP:</strong></p>

<p>- Comprimento: 85mm</p>

<p>- Escama: 41mm</p>

<p>- Rosca BSP: 1 1/2"</p>

<p> </p>'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'adaptado-p-mangueira-macho-escama-bsp-ferro-fundido')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Material', 'Ferro fundido', 1)
) as s(spec_name, spec_value, sort_order);

-- Válvula Esfera Monobloco em Latão Niquelado - Mipel
with cat as (select id from categories where slug = 'conexoes'), brand as (select id from brands where slug = 'mipel')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Válvula Esfera Monobloco em Latão Niquelado - Mipel', 'valvula-esfera-monobloco-latao-niquelado-mipel', cat.id, brand.id, 'REG-ESF-MIPEL', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225204544/9101i3e-ng23ukmra8.jpg'
, '<p>REGISTRO ESFERA MIPEL METAL  BSP</p>

<p>Válvula de Esfera Monobloco em Latão Niquelado</p>

<p> </p>

<p>Bitola: 1.1/4" (passagem plena)</p>

<p>Bitola: 1.1/2" (passagem plena) DN 40</p>

<p> </p>

<p>Pressão de Trabalho: PN 30 435 psi</p>

<p>Temperatura de Trabalho: -10° à 90°C</p>

<p>Extremidade: BSP (ISO 228-1/228-2)</p>

<p>Aplicação: Água, Óleo e Ar </p>

<p>Materiais:<br />
Corpo/Tampa: Latão Niquelado;<br />
Esfera/Haste: Latão Niquelado;<br />
Vedações: PTFE.</p>'
from cat, brand
on conflict (slug) do nothing;
with p as (select id from products where slug = 'valvula-esfera-monobloco-latao-niquelado-mipel')
insert into product_specs (product_id, spec_name, spec_value, sort_order)
select p.id, spec_name, spec_value, sort_order from p, (values
  ('Material', 'Latão niquelado', 1)
) as s(spec_name, spec_value, sort_order);

-- Painel de Comando Completo Trifásico 220V
with cat as (select id from categories where slug = 'painel')
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Painel de Comando Completo Trifásico 220V', 'painel-comando-completo-trifasico-220v', cat.id, null, 'PCCT220V', null, false, true, 'https://cdn.awsli.com.br/800x800/631/631138/produto/26929586/1-tqlltj58xd.png'
, '<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(102, 102, 102); font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong style="margin: 0px; padding: 0px;">--APLICAÇÕES GERAIS</strong></p>

<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(102, 102, 102); font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><span style="color: rgb(34, 34, 34); font-family: &quot;Gotham XNarrow SSm A&quot;, &quot;Gotham XNarrow SSm B&quot;, &quot;Arial Narrow&quot;, Arial; font-size: 16px;">Utilizados para partida de motores elétricos submersíveis com tensões monofásicas ou trifásicas.</span></p>

<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(102, 102, 102); font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong style="margin: 0px; padding: 0px;">--DETALHES DO PRODUTO</strong></p>

<p>Modelo : Trifásico Completo<br />
Potência : Até 4 CV <br />
Tensão : 220V</p>

<p><span style="color: rgb(34, 34, 34); font-family: &quot;Gotham XNarrow SSm A&quot;, &quot;Gotham XNarrow SSm B&quot;, &quot;Arial Narrow&quot;, Arial; font-size: 16px;">Armário de aço, disjuntores, contatores, reles de sobrecarga, chave automático-manual, bornes para boia, amperímetro, voltímetro, sinaleiro e rele falta de fase;</span></p>

<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(102, 102, 102); font-family: Arial, Helvetica, sans-serif; font-size: 12px;"><strong style="margin: 0px; padding: 0px;">--OBSERVAÇÕES</strong></p>

<p>É preciso escolher a potência desejada</p>

<p style="margin: 0px 0px 10px; padding: 0px; color: rgb(102, 102, 102); font-family: Arial, Helvetica, sans-serif; font-size: 12px;"> </p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Tampa Para Poço Artesiano 6 Polegadas', 'tampa-poco-artesiano-6-polegadas', cat.id, brand.id, 'TAMPA-6', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225149756/1-q5djty8esp.png'
, '<p>TAMPA PARA POÇO 125mm INTERNO.</p>

<p>Indicada para POÇOS ARTESIANOS,TUBOS GEOMECÀNICO de 4" com furo para EDUTOR de 1" </p>

<p>MATERIAL: Chapa de aço 5 mm <br />
 </p>

<p>FURO: 1" MAX 33 mm</p>

<p>FURO: 1 1/4" MAX 42 mm</p>

<p>FURO: 1 1/2"  MAX 49mm</p>'
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
insert into products (name, slug, category_id, brand_id, sku, price, show_price, is_best_seller, main_image_url, description)
select 'Tampa Para Poço Artesiano 4 Polegadas', 'tampa-poco-artesiano-4-polegadas', cat.id, brand.id, 'TAMPA-4', null, false, false, 'https://cdn.awsli.com.br/800x800/631/631138/produto/225130986/1-p0y0ox9egh.png'
, '<p>TAMPA PARA POÇO 125mm INTERNO.</p>

<p>Indicada para POÇOS ARTESIANOS,TUBOS GEOMECÀNICO de 4" com furo para EDUTOR de 1" </p>

<p>MATERIAL: Chapa de aço 5 mm <br />
 </p>

<p>FURO: 1" MAX 33 mm</p>

<p>FURO: 1 1/4" MAX 42 mm</p>

<p>FURO: 1 1/2"  MAX 49mm</p>'
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
