# Lark-Docs

![demo png](/public/lark_docs_demo.png)

## Getting Started

Deploy on vercel: [https://lark-docs.sheltonma.top](https://lark-docs.sheltonma.top)

## Installation

```shell
pnpm install
```

run

```shell
pnpm run dev
```

Environment Variables

```.env
// .env.local
DATABASE_URL=
AUTH_SECRET="" # Added by `npx auth`. Read more: https://cli.authjs.dev

AUTH_GITHUB_ID=
AUTH_GITHUB_SECRET=
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Lark docs build with

- **Next.js 15.1.3**
- **Tailwind** and **Shadcn** for ui
- **Auth.js** for auth
- **Neon** for database
- **Drizzle** for database orm
- **Next.js API Routes** for api
- **Tiptap** for Rich Text Editor
- **Zustand** for state management
- **SWR** for data fetching
