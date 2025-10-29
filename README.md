useLinkStatus

- [source](https://nextjs.org/docs/app/api-reference/functions/use-link-status)
- [reference](https://github.com/vercel/next.js/pull/77300)

this implementation includes a custom `<Link>` component along with context that manages `pending` state. it involves usage of React's [`useTransition`](https://react.dev/reference/react/useTransition) and [`useOptimistic`](https://react.dev/reference/react/useOptimistic#use) hooks, where the base requirement is to automatically revert state to its base values.

the `<Link>` component wraps children with `LinkStatusContext.Provider` to make `pending` state available via `useLinkStatus()` hook. nested components can access link status without prop drilling.

implementation handles modified clicks (ctrl/cmd/shift) and prevents default navigation for proper client-side routing. prefetching occurs on mouse enter when enabled.
