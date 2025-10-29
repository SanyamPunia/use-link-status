"use client";

import React, {
  useCallback,
  useRef,
  startTransition,
  useOptimistic,
  type MouseEvent,
  type ReactNode,
} from "react";
import { useRouter, usePathname } from "next/navigation";
import { LinkStatusContext } from "@/context/link-status-context";
import {
  IDLE_LINK_STATUS,
  LinkStatus,
  PENDING_LINK_STATUS,
} from "@/lib/link-status-constants";

interface LinkProps {
  href: string;
  prefetch?: boolean;
  replace?: boolean;
  scroll?: boolean;
  children: ReactNode;
  className?: string;
  onClick?: (e: MouseEvent<HTMLAnchorElement>) => void;
}

export function Link({
  href,
  prefetch = true,
  replace = false,
  scroll = true,
  children,
  className,
  onClick,
}: LinkProps) {
  const router = useRouter();
  const pathname = usePathname();
  const linkRef = useRef<HTMLAnchorElement>(null);

  /**
   * useOptimistic manages the link status state
   * immediately updates to PENDING when navigation starts
   * then reverts to IDLE after the async navigation completes
   */
  const [linkStatus, setOptimisticLinkStatus] = useOptimistic(
    IDLE_LINK_STATUS,
    (
      _currentState: LinkStatus,
      optimisticValue: typeof PENDING_LINK_STATUS
    ) => {
      return optimisticValue;
    }
  );

  // check if event should trigger client-side navigation
  const isModifiedEvent = useCallback(
    (event: MouseEvent<HTMLAnchorElement>) => {
      const target = event.currentTarget.getAttribute("target");

      return (
        (target && target !== "_self") ||
        event.metaKey ||
        event.ctrlKey ||
        event.shiftKey ||
        event.altKey ||
        (event.nativeEvent && event.nativeEvent.which === 2)
      );
    },
    []
  );

  // handle link click with transition-based navigation
  const handleClick = useCallback(
    (e: MouseEvent<HTMLAnchorElement>) => {
      // call custom onClick if provided
      if (onClick) {
        onClick(e);
      }

      // don't override modified clicks or default prevented events
      if (
        isModifiedEvent(e) ||
        e.defaultPrevented ||
        e.currentTarget.hasAttribute("download")
      ) {
        return;
      }

      // prevent default browser navigation
      e.preventDefault();

      if (pathname === href) {
        return;
      }

      /**
       * navigation wrapped in startTransition + useOptimistic pattern
       *
       * this basically creates the transition state that:
       * 1. immediately updates UI optimistically (setOptimisticLinkStatus)
       * 2. performs navigation in background (router.push/replace)
       * 3. automatically reverts optimistic state when complete
       */
      startTransition(async () => {
        setOptimisticLinkStatus(PENDING_LINK_STATUS);

        if (replace) {
          router.replace(href, { scroll });
        } else {
          router.push(href, { scroll });
        }

        // no need to set state to idle, reverts to base state automatically
      });
    },
    [
      onClick,
      isModifiedEvent,
      pathname,
      href,
      replace,
      scroll,
      router,
      setOptimisticLinkStatus,
    ]
  );

  // handle prefetching on mouse enter (hover)
  const handleMouseEnter = useCallback(() => {
    if (prefetch && typeof window !== "undefined") {
      router.prefetch(href);
    }
  }, [prefetch, href, router]);

  return (
    <LinkStatusContext.Provider value={linkStatus}>
      <a
        href={href}
        onClick={handleClick}
        onMouseEnter={handleMouseEnter}
        ref={linkRef}
        className={className}
      >
        {children}
      </a>
    </LinkStatusContext.Provider>
  );
}
