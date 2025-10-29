"use client";

import { useLinkStatus } from "@/context/link-status-context";

export function LoadingIndicator() {
  const { pending } = useLinkStatus();
  return pending ? <span>⏳</span> : null;
}
