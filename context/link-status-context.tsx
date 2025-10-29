"use client";

import { createContext, useContext } from "react";
import type { LinkStatusValue } from "@/lib/link-status-constants";
import { IDLE_LINK_STATUS } from "@/lib/link-status-constants";

/**
 * react context for providing link navigation status to descendant components
 *
 * default value is IDLE_LINK_STATUS to ensure useLinkStatus always returns a valid value even when called outside a link component
 */
export const LinkStatusContext =
  createContext<LinkStatusValue>(IDLE_LINK_STATUS);

export function useLinkStatus(): LinkStatusValue {
  return useContext(LinkStatusContext);
}
