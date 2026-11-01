import { Suspense, lazy } from 'react';
import type { ComponentProps, ComponentType } from 'react';

// Loads a screen's code only when it is first shown, instead of putting every notes chapter,
// simulator and question bank into the one big download that every student waits for at log-in.
// Each wrapped screen carries its own loading placeholder, so the rest of the page stays visible
// while it loads and the places that use it need no changes.
export function lazyView<T extends ComponentType<any>>(loader: () => Promise<{ default: T }>) {
  const Inner = lazy(loader);
  return function LazyView(props: ComponentProps<T>) {
    return (
      <Suspense fallback={<div style={{ padding: '48px 16px', textAlign: 'center', fontSize: 14, opacity: 0.7 }}>Loading...</div>}>
        <Inner {...(props as any)} />
      </Suspense>
    );
  };
}
