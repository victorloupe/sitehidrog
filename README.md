# SiteHidroG

Site vitrine para loja de material hidráulico e bombas, com carrinho de
cotação (sem pagamento online) e painel administrativo.

Construído com **Next.js 16 + TypeScript + Tailwind CSS**, pronto para usar
**Supabase** como banco de dados.

## O que já está pronto

- **Home** estilo loja: menu de categorias, banner, categorias em grade,
  mais vendidos, marcas e rodapé.
- **Página de produto**: galeria de imagens, especificações técnicas,
  seletor de variações (ex: voltagem), botão "adicionar à cotação" e
  produtos relacionados.
- **Carrinho / Cotação** (`/carrinho`): lista de produtos adicionados +
  formulário com nome (obrigatório), endereço completo com cidade e
  estado (obrigatórios), CPF/CNPJ, telefone, e-mail e observações.
- **Painel administrativo** (`/admin`): dashboard, lista de orçamentos
  recebidos com detalhe e status, e cadastro de produtos, categorias e
  marcas.

## Rodando localmente

```bash
npm install
npm run dev
```

Acesse `http://localhost:3000`.

**Sem configurar nada**, o site já funciona em modo demonstração: as
páginas usam produtos de exemplo (`src/lib/mock-data.ts`) e as cotações
enviadas ficam salvas em `.data/quotes-dev.json`.

### Acessando o painel admin (modo demonstração)

Acesse `/admin`, deixe o e-mail em branco (ou qualquer valor) e use a
senha `admin123` (definida em `ADMIN_LOCAL_PASSWORD`, veja `.env.local.example`).

## Conectando o banco de dados real (Supabase)

1. Crie uma conta e um projeto em [supabase.com](https://supabase.com).
2. No SQL Editor do Supabase, rode o arquivo **`schema.sql`** (cria todas
   as tabelas: categorias, marcas, produtos, especificações, variações e
   orçamentos).
3. Opcionalmente, rode **`seed.sql`** para importar alguns produtos de
   exemplo (ou aguarde os dados reais da loja).
4. Em **Project Settings > API**, copie a "Project URL" e a chave
   "anon public".
5. Copie `.env.local.example` para `.env.local` e preencha:

```
NEXT_PUBLIC_SUPABASE_URL=https://SEUPROJETO.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sua-chave-anon
```

6. Em **Authentication > Users** do Supabase, crie o usuário que vai
   acessar o painel `/admin` (e-mail + senha).
7. Reinicie o servidor (`npm run dev`). A partir daí, o catálogo, as
   cotações e o login do admin passam a usar o Supabase de verdade.

## Próximos passos combinados

- Você vai enviar prints/fotos dos produtos reais para ajustar o
  `schema.sql` e popular o catálogo definitivo (categorias, marcas,
  produtos, especificações e variações).
- Depois de conectado ao Supabase, o cadastro de produtos, categorias e
  marcas pelo painel `/admin` passa a gravar direto no banco.

## Estrutura do projeto

```
src/
  app/                  páginas (App Router)
    admin/              painel administrativo
    api/                rotas de API (cotações, admin)
    produto/[slug]/     página de produto
    categoria/[slug]/   listagem por categoria
    carrinho/           carrinho / cotação
  components/           componentes de UI organizados por área
  context/              carrinho (estado global via localStorage)
  lib/                  tipos, dados de exemplo, acesso ao Supabase
schema.sql              schema completo do banco (Supabase/Postgres)
seed.sql                dados de exemplo para o banco
.env.local.example      variáveis de ambiente necessárias
```

## Publicando o site

Este é um projeto Next.js padrão — pode ser publicado na Vercel (mais
simples), em uma VPS com Node.js, ou em qualquer serviço que rode
Next.js. Configure as mesmas variáveis de ambiente do `.env.local` no
serviço de hospedagem escolhido.
