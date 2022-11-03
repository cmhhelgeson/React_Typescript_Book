This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.

Routing

about/ Directory example.com/about
[slug]/ example.com/{slug}
(group)/ example.com/?? directory will be ignored by router system

page.tsx: A file used to define the unique UI of a route. Pages represent the leaf of the route and are needed for the path to be accessible.

layout.tsx: A file used to define UI that is shared across multiple pages. A layout accepts another layout or a page as its child. You can nest layouts to create nested routes.

loading.tsx: An optional file used to create loading UI for a specific part of an app. It automatically wraps a page or child layout in a React Suspense Boundary, showing your loading component immediately on the first load and when navigating between sibling routes.

error.tsx: An optional file used to isolate errors to specific parts of an app, show specific error information, and functionality to attempt to recover from the error. It automatically wraps a page or child layout in a React Error Boundary. Showing your error component whenever an error in a subtree is caught.

template.tsx: An optional file, similar to layouts, but on navigation, a new instance of the component is mounted and the state is not shared. You can use templtaes for cases where you require this behavior, such as enter/exit animations.

head.tsx: An optional file used to define the contents of the head tag for a given route
