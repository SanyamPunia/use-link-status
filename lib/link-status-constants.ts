// idle state when no navigation is occurring
export const IDLE_LINK_STATUS = { pending: false } as const;

// pending state during active transition
export const PENDING_LINK_STATUS = { pending: true } as const;

export type LinkStatus = typeof IDLE_LINK_STATUS | typeof PENDING_LINK_STATUS;

export interface LinkStatusValue {
  pending: boolean;
}
